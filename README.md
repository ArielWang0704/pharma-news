# Pharma News

这是一个用于长期归档和检索中国医药健康市场新闻的静态网页项目。

## 固定网址

GitHub Pages 固定访问地址：

```text
https://arielwang0704.github.io/pharma-news/
```

## 自动更新

本项目使用 GitHub Actions 自动更新新闻。

- 自动运行时间：北京时间每个工作日 10:00
- GitHub Actions cron：`0 2 * * 1-5`
- 更新脚本：`scripts/update_news.py`
- Workflow：`.github/workflows/daily-news-update.yml`

脚本会检索公开来源新闻，调用 OpenAI 生成结构化更新，自动修改 `index.html`，然后由 GitHub Actions commit 并 push 回 `main` 分支。网址保持不变。

## 需要添加的 Secrets

进入 GitHub repository：

`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

建议添加：

- `OPENAI_API_KEY`：必填。用于判断新闻价值、去重、写摘要和更新网页。
- `SERPAPI_API_KEY`：推荐。用于稳定检索 Google News 公开新闻。
- `NEWS_API_KEY`：可选。作为补充新闻检索来源。

不要把任何 API key 写进代码或 `index.html`。

如果没有 `SERPAPI_API_KEY` 或 `NEWS_API_KEY`，脚本会尝试使用公开 fallback 来源；但公开接口可能限流，稳定性不如 SerpAPI。

## 手动运行

1. 打开 GitHub 仓库。
2. 点顶部 `Actions`。
3. 左侧选择 `Daily Pharma News Update`。
4. 点右侧 `Run workflow`。
5. Branch 保持 `main`。
6. 再点绿色 `Run workflow`。

## 查看失败日志

1. 打开 GitHub 仓库。
2. 点顶部 `Actions`。
3. 点失败的 `Daily Pharma News Update` 运行记录。
4. 打开 `update-news`。
5. 查看 `Update pharma news dashboard` 这一步的日志。

每次运行日志会输出：

- 今天新增了几条新闻
- 哪些旧事件有进展
- 哪些新闻被标记为 Viatris 高相关
- 哪些 tab 数量发生变化
- 右侧 box 有哪些更新：今年值得记住、可复用观点、后续重点追踪

## 文件说明

- `index.html`：主网页，包含新闻数据、搜索、分类 tab、月份筛选、Viatris 高相关筛选、展开详情和 timeline。
- `.nojekyll`：告诉 GitHub Pages 按普通静态网页发布，不启用 Jekyll 处理。
- `.github/workflows/daily-news-update.yml`：自动更新任务。
- `scripts/update_news.py`：新闻检索、分析和网页更新脚本。

## GitHub Pages 设置

进入 repository 的 `Settings` → `Pages`：

- Source：`Deploy from a branch`
- Branch：`main`
- Folder：`/ (root)`

保存后等待 1-3 分钟，页面会发布到固定网址。

## 内容更新原则

- 新新闻添加为新的事件卡片。
- 同一新闻后续有进展时，不新建重复卡片，优先补充到原卡片的“事件进展”时间线。
- 每条新闻默认摘要保持简洁，展开后写清楚新闻背景、发生了什么、新闻价值、启发观点和后续观察点。
- 只有 Viatris 高相关事件才显示“Viatris高相关”标记。
- 右侧保留：
  - 今年值得记住
  - 可复用观点
  - 后续重点追踪

## 隐私提醒

如果 repository 是公开的，网页内容理论上可以被任何知道链接的人访问。建议不要在网页里写入个人身份、公司内部信息、未公开信息或敏感判断。
