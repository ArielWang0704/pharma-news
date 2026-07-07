#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import re
import sys
import textwrap
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "index.html"
STATE_PATH = ROOT / ".news-update-state.json"

TABS = [
    "全部",
    "政策/支付",
    "药品/创新药",
    "医疗器械/诊断",
    "BD/投融资",
    "组织/合规",
    "渠道/患者",
    "数字医疗/AI",
]

SEARCH_QUERIES = [
    "中国 医药 医保 集采 创新药 药品 过去24小时",
    "中国 NMPA CDE 新药 批准 临床 监管",
    "中国 IVD 诊断 医疗器械 集采 报销",
    "中国 医药 商业健康险 支付 药店 院外零售",
    "China pharma biotech license out Reuters AstraZeneca Lilly Merck",
    "China healthcare pharma compliance regulation Reuters",
    "China biotech M&A financing medical device diagnostics",
]


def log(message: str) -> None:
    print(message, flush=True)


def http_json(url: str, headers: dict[str, str] | None = None, timeout: int = 30) -> dict[str, Any]:
    req = Request(url, headers=headers or {"User-Agent": "pharma-news-dashboard/1.0"})
    with urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def get_window() -> tuple[datetime, datetime]:
    now = datetime.now(timezone.utc)
    if STATE_PATH.exists():
        try:
            state = json.loads(STATE_PATH.read_text(encoding="utf-8"))
            last = datetime.fromisoformat(state["last_success_at"].replace("Z", "+00:00"))
            return max(last - timedelta(hours=2), now - timedelta(days=3)), now
        except Exception:
            pass
    return now - timedelta(hours=30), now


def fetch_serpapi(query: str, api_key: str, limit: int = 10) -> list[dict[str, str]]:
    params = {
        "engine": "google_news",
        "q": query,
        "hl": "zh-cn",
        "gl": "cn",
        "api_key": api_key,
    }
    data = http_json("https://serpapi.com/search.json?" + urlencode(params))
    items = []
    for row in data.get("news_results", [])[:limit]:
        items.append(
            {
                "source": "SerpAPI Google News",
                "title": row.get("title", ""),
                "url": row.get("link", ""),
                "published": row.get("date", ""),
                "snippet": row.get("snippet", ""),
                "publisher": (row.get("source") or {}).get("name", ""),
            }
        )
    return items


def fetch_newsapi(query: str, api_key: str, from_dt: datetime, limit: int = 10) -> list[dict[str, str]]:
    params = {
        "q": query,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": str(limit),
        "from": from_dt.isoformat(timespec="seconds").replace("+00:00", "Z"),
        "apiKey": api_key,
    }
    data = http_json("https://newsapi.org/v2/everything?" + urlencode(params))
    items = []
    for row in data.get("articles", [])[:limit]:
        items.append(
            {
                "source": "NewsAPI",
                "title": row.get("title", ""),
                "url": row.get("url", ""),
                "published": row.get("publishedAt", ""),
                "snippet": row.get("description", "") or row.get("content", ""),
                "publisher": (row.get("source") or {}).get("name", ""),
            }
        )
    return items


def fetch_gdelt(query: str, start: datetime, end: datetime, limit: int = 10) -> list[dict[str, str]]:
    params = {
        "query": query,
        "mode": "ArtList",
        "format": "json",
        "maxrecords": str(limit),
        "sort": "DateDesc",
        "startdatetime": start.strftime("%Y%m%d%H%M%S"),
        "enddatetime": end.strftime("%Y%m%d%H%M%S"),
    }
    data = http_json("https://api.gdeltproject.org/api/v2/doc/doc?" + urlencode(params))
    items = []
    for row in data.get("articles", [])[:limit]:
        items.append(
            {
                "source": "GDELT",
                "title": row.get("title", ""),
                "url": row.get("url", ""),
                "published": row.get("seendate", ""),
                "snippet": row.get("summary", ""),
                "publisher": row.get("domain", ""),
            }
        )
    return items


def collect_candidates() -> list[dict[str, str]]:
    start, end = get_window()
    serpapi_key = os.getenv("SERPAPI_API_KEY", "").strip()
    newsapi_key = os.getenv("NEWS_API_KEY", "").strip()

    candidates: list[dict[str, str]] = []
    for query in SEARCH_QUERIES:
        for fetcher_name in ["serpapi", "newsapi", "gdelt"]:
            try:
                if fetcher_name == "serpapi" and serpapi_key:
                    candidates.extend(fetch_serpapi(query, serpapi_key))
                elif fetcher_name == "newsapi" and newsapi_key:
                    candidates.extend(fetch_newsapi(query, newsapi_key, start))
                elif fetcher_name == "gdelt":
                    candidates.extend(fetch_gdelt(query, start, end))
            except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as exc:
                log(f"Skipped {fetcher_name} query because it failed: {query} ({exc})")
            time.sleep(0.25)

    seen: set[str] = set()
    unique: list[dict[str, str]] = []
    for item in candidates:
        url = item.get("url", "").strip()
        title = item.get("title", "").strip()
        key = (url or title).lower()
        if not title or not url or key in seen:
            continue
        seen.add(key)
        unique.append(item)
    return unique[:60]


def extract_const(text: str, name: str) -> tuple[str, int, int]:
    marker = f"const {name} = "
    marker_at = text.index(marker)
    start = marker_at + len(marker)
    while start < len(text) and text[start].isspace():
        start += 1
    opener = text[start]
    closer = {"[": "]", "{": "}"}[opener]
    depth = 0
    in_string = False
    escape = False
    quote = ""
    for idx in range(start, len(text)):
        ch = text[idx]
        if in_string:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == quote:
                in_string = False
            continue
        if ch in ("'", '"', "`"):
            in_string = True
            quote = ch
            continue
        if ch == opener:
            depth += 1
        elif ch == closer:
            depth -= 1
            if depth == 0:
                return text[start : idx + 1], start, idx + 1
    raise ValueError(f"Could not parse const {name}")


def js_literal_to_json(value: str) -> Any:
    converted = re.sub(r"([\{,])\s*([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1 "\2":', value)
    converted = re.sub(r",\s*([\]}])", r"\1", converted)
    return json.loads(converted)


def replace_const(text: str, name: str, value: Any) -> str:
    _, start, end = extract_const(text, name)
    rendered = json.dumps(value, ensure_ascii=False, indent=6)
    return text[:start] + rendered + text[end:]


def read_site_data() -> dict[str, Any]:
    text = INDEX_PATH.read_text(encoding="utf-8")
    news_data = js_literal_to_json(extract_const(text, "newsData")[0])
    event_details = js_literal_to_json(extract_const(text, "eventDetails")[0])
    weekly_takeaways = js_literal_to_json(extract_const(text, "weeklyTakeaways")[0])
    discussion_points = js_literal_to_json(extract_const(text, "discussionPoints")[0])
    return {
        "text": text,
        "newsData": news_data,
        "eventDetails": event_details,
        "weeklyTakeaways": weekly_takeaways,
        "discussionPoints": discussion_points,
    }


def tab_counts(news_data: list[dict[str, Any]]) -> dict[str, int]:
    counts = {tab: 0 for tab in TABS}
    counts["全部"] = len(news_data)
    for item in news_data:
        category = item.get("category")
        if category in counts:
            counts[category] += 1
    return counts


def top_watch(news_data: list[dict[str, Any]], limit: int = 8) -> list[str]:
    ordered = sorted(news_data, key=lambda item: item.get("date", ""), reverse=True)
    rows = []
    for item in ordered:
        for watch in item.get("watch", [])[:2]:
            rows.append(f"{item.get('date', '')} {watch}")
            if len(rows) >= limit:
                return rows
    return rows


def slugify(value: str) -> str:
    text = value.lower()
    text = re.sub(r"https?://", "", text)
    text = re.sub(r"[^a-z0-9\u4e00-\u9fff]+", "-", text)
    text = text.strip("-")
    return text[:60] or f"news-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"


def call_openai(site: dict[str, Any], candidates: list[dict[str, str]]) -> dict[str, Any]:
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is missing")

    model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
    current_events = [
        {
            "id": item.get("id"),
            "date": item.get("date"),
            "category": item.get("category"),
            "title": item.get("title"),
            "updates": item.get("updates", [])[-3:],
        }
        for item in site["newsData"]
    ]
    prompt = {
        "role": "user",
        "content": textwrap.dedent(
            f"""
            You update a Chinese pharma news dashboard. Use only the candidate source list below.
            Do not invent facts, numbers, or links. Skip weak, duplicated, irrelevant, inaccessible, or paywalled-only items.

            Coverage: China pharma and healthcare market first; include global events only if they affect China,
            MNC China strategy, or pharma career/industry capability learning. Topics include drugs, innovative drugs,
            mature brands/generics, medical devices, IVD/diagnostics, life-science tools, digital health/AI, healthcare
            services, commercial insurance/payment, NHSA/NMPA/CDE policy, VBP, channels, retail, BD/license-out,
            financing/M&A, org and leadership changes, compliance, and regulatory events.

            Existing dashboard events:
            {json.dumps(current_events, ensure_ascii=False)}

            Candidate sources:
            {json.dumps(candidates, ensure_ascii=False)}

            Return strict JSON:
            {{
              "new_items": [
                {{
                  "id": "short-kebab-id",
                  "category": "one of {TABS[1:]}",
                  "date": "YYYY-MM-DD",
                  "title": "Chinese title",
                  "tags": ["short tags"],
                  "viatrisImpact": "高 or 低",
                  "summary": "2-3 Chinese sentences",
                  "why": "news value: what happened, background, why it matters",
                  "role": "启发与观点: industry/capability thinking, not personal advice",
                  "watch": ["follow-up point 1", "follow-up point 2"],
                  "updates": [{{"date": "YYYY-MM-DD", "text": "timeline update"}}],
                  "sources": [{{"label": "source label", "url": "https://..."}}],
                  "detail": "detailed but concise Chinese explanation including what happened, background, importance, insight, and what to watch"
                }}
              ],
              "updated_items": [
                {{
                  "id": "existing event id",
                  "updates": [{{"date": "YYYY-MM-DD", "text": "new timeline update"}}],
                  "watch": ["optional replacement follow-up points"],
                  "sources": [{{"label": "source label", "url": "https://..."}}],
                  "detail": "optional updated detail"
                }}
              ],
              "weeklyTakeaways": ["3-4 concise Chinese annual takeaways"],
              "discussionPoints": ["3 concise reusable Chinese viewpoints"],
              "notes": ["short notes about skipped items or uncertainty"]
            }}

            Rules:
            - If a candidate is a follow-up to an existing event, update that event instead of creating a duplicate.
            - Mark viatrisImpact as "高" only for news directly relevant to Viatris mature brands, generics, China access,
              VBP/payment exposure, major compliance risk, or a directly overlapping therapeutic/business area.
              Otherwise use "低"; do not use medium.
            - Keep summaries factual and compact; avoid speculation beyond clearly labeled inference.
            """
        ).strip(),
    }
    body = {
        "model": model,
        "temperature": 0.2,
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "system",
                "content": "You are a careful Chinese pharmaceutical industry analyst. Output only valid JSON.",
            },
            prompt,
        ],
    }
    req = Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "pharma-news-dashboard/1.0",
        },
        method="POST",
    )
    with urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    content = data["choices"][0]["message"]["content"]
    return json.loads(content)


def normalize_item(item: dict[str, Any], existing_ids: set[str]) -> tuple[dict[str, Any], str]:
    news_id = str(item.get("id") or slugify(item.get("title", "")))
    if news_id in existing_ids:
        base = news_id
        suffix = 2
        while news_id in existing_ids:
            news_id = f"{base}-{suffix}"
            suffix += 1
    existing_ids.add(news_id)

    category = item.get("category") if item.get("category") in TABS else "药品/创新药"
    date = item.get("date") or datetime.now(timezone.utc).date().isoformat()
    impact = "高" if str(item.get("viatrisImpact", "")).strip() == "高" else "低"
    updates = item.get("updates") or [{"date": date, "text": item.get("summary", "")}]

    normalized = {
        "id": news_id,
        "category": category,
        "date": date,
        "title": item.get("title", "").strip(),
        "tags": item.get("tags") or [],
        "viatrisImpact": impact,
        "summary": item.get("summary", "").strip(),
        "why": item.get("why", "").strip(),
        "role": item.get("role", "").strip(),
        "watch": item.get("watch") or [],
        "updates": updates,
        "sources": item.get("sources") or [],
    }
    return normalized, str(item.get("detail") or normalized["summary"])


def merge_unique(existing: list[dict[str, Any]], incoming: list[dict[str, Any]], key: str) -> list[dict[str, Any]]:
    seen = {str(item.get(key, "")).strip() for item in existing}
    merged = list(existing)
    for item in incoming:
        value = str(item.get(key, "")).strip()
        if value and value not in seen:
            merged.append(item)
            seen.add(value)
    return merged


def apply_update(site: dict[str, Any], result: dict[str, Any]) -> dict[str, Any]:
    news_data = site["newsData"]
    event_details = site["eventDetails"]
    existing_ids = {item["id"] for item in news_data}
    before_counts = tab_counts(news_data)
    before_watch = top_watch(news_data)
    before_takeaways = list(site["weeklyTakeaways"])
    before_discussion = list(site["discussionPoints"])

    new_titles: list[str] = []
    updated_ids: list[str] = []
    high_titles: list[str] = []

    by_id = {item["id"]: item for item in news_data}

    for incoming in result.get("new_items", []):
        item, detail = normalize_item(incoming, existing_ids)
        if not item["title"] or not item["sources"]:
            continue
        news_data.append(item)
        event_details[item["id"]] = detail
        new_titles.append(item["title"])
        if item["viatrisImpact"] == "高":
            high_titles.append(item["title"])

    for incoming in result.get("updated_items", []):
        news_id = incoming.get("id")
        if news_id not in by_id:
            continue
        item = by_id[news_id]
        old_updates = item.get("updates", [])
        item["updates"] = merge_unique(old_updates, incoming.get("updates") or [], "text")
        if incoming.get("watch"):
            item["watch"] = incoming["watch"]
        if incoming.get("sources"):
            item["sources"] = merge_unique(item.get("sources", []), incoming["sources"], "url")
        if incoming.get("detail"):
            event_details[news_id] = incoming["detail"]
        if len(item["updates"]) != len(old_updates):
            updated_ids.append(news_id)
        if item.get("viatrisImpact") == "高":
            high_titles.append(item.get("title", news_id))

    news_data.sort(key=lambda row: row.get("date", ""), reverse=True)

    if result.get("weeklyTakeaways"):
        site["weeklyTakeaways"] = result["weeklyTakeaways"][:4]
    if result.get("discussionPoints"):
        site["discussionPoints"] = result["discussionPoints"][:3]

    after_counts = tab_counts(news_data)
    after_watch = top_watch(news_data)
    tab_changes = {
        tab: {"before": before_counts.get(tab, 0), "after": after_counts.get(tab, 0)}
        for tab in TABS
        if before_counts.get(tab, 0) != after_counts.get(tab, 0)
    }

    site["report"] = {
        "new_titles": new_titles,
        "updated_ids": updated_ids,
        "high_titles": sorted(set(high_titles)),
        "tab_changes": tab_changes,
        "weeklyTakeaways_before": before_takeaways,
        "weeklyTakeaways_after": site["weeklyTakeaways"],
        "discussionPoints_before": before_discussion,
        "discussionPoints_after": site["discussionPoints"],
        "watch_before": before_watch,
        "watch_after": after_watch,
        "notes": result.get("notes", []),
    }
    return site


def write_site(site: dict[str, Any]) -> bool:
    original = site["text"]
    text = replace_const(original, "newsData", site["newsData"])
    text = replace_const(text, "eventDetails", site["eventDetails"])
    text = replace_const(text, "weeklyTakeaways", site["weeklyTakeaways"])
    text = replace_const(text, "discussionPoints", site["discussionPoints"])
    if text == original:
        return False
    INDEX_PATH.write_text(text, encoding="utf-8", newline="\n")
    STATE_PATH.write_text(
        json.dumps(
            {
                "last_success_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
                "last_run_new_count": len(site["report"]["new_titles"]),
                "last_run_updated_count": len(site["report"]["updated_ids"]),
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    return True


def print_report(report: dict[str, Any]) -> None:
    log("\nDaily Pharma News Update Report")
    log(f"1. 新增新闻：{len(report['new_titles'])} 条")
    for title in report["new_titles"]:
        log(f"   - {title}")
    log(f"2. 旧事件进展：{len(report['updated_ids'])} 条")
    for news_id in report["updated_ids"]:
        log(f"   - {news_id}")
    log(f"3. Viatris高相关：{len(report['high_titles'])} 条")
    for title in report["high_titles"]:
        log(f"   - {title}")
    log("4. tab数量变化：")
    if report["tab_changes"]:
        for tab, values in report["tab_changes"].items():
            log(f"   - {tab}: {values['before']} -> {values['after']}")
    else:
        log("   - 无")
    log("5. 右侧box更新：")
    log(f"   - 今年值得记住：{'已更新' if report['weeklyTakeaways_before'] != report['weeklyTakeaways_after'] else '无变化'}")
    log(f"   - 可复用观点：{'已更新' if report['discussionPoints_before'] != report['discussionPoints_after'] else '无变化'}")
    log(f"   - 后续重点追踪：{'已更新' if report['watch_before'] != report['watch_after'] else '无变化'}")
    if report.get("notes"):
        log("Notes:")
        for note in report["notes"]:
            log(f"   - {note}")


def main() -> int:
    if not INDEX_PATH.exists():
        log("index.html was not found at the repository root.")
        return 1

    site = read_site_data()
    if not os.getenv("OPENAI_API_KEY", "").strip():
        log("OPENAI_API_KEY is missing. Add it in Settings -> Secrets and variables -> Actions.")
        log("No changes were made.")
        return 0

    candidates = collect_candidates()
    log(f"Collected {len(candidates)} candidate source articles.")

    if not candidates:
        log("No candidate source articles were found. No changes were made.")
        return 0

    try:
        result = call_openai(site, candidates)
    except Exception as exc:
        log(f"OpenAI update failed: {exc}")
        return 1

    site = apply_update(site, result)
    changed = write_site(site)
    print_report(site["report"])
    if changed:
        log("index.html was updated.")
    else:
        log("OpenAI returned no effective website changes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
