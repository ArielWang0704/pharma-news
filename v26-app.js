(() => {
  'use strict';
  const UPDATE_DATE = '2026-08-25';
  const WEEK_START = '2026-08-17';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const arr = v => Array.isArray(v) ? v : [];
  const clean = s => String(s || '').replace(/\s+/g,' ').trim();
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = d => String(d || '').replaceAll('-','.');

  const THEMES = [
    {id:'grassroots',name:'基药与基层医疗',keywords:['基药','基本药物','基层','DRG','DIP','同病同付','药随病走'],judgement:'基药的商业价值正在从“进入目录”转向“患者是否下沉、医保是否跟随、基层是否真正配药”。真正影响成熟品牌的，是患者流、支付和终端配备能否同时改变。',viatris:true},
    {id:'vbp',name:'集采与成熟品牌',keywords:['集采','带量采购','国采','成熟药','仿制药','参比制剂'],judgement:'集采已经从一次性降价工具变成长期价格治理机制，影响不仅是价格，还会传导到医院切量、院外承接、供应履约和企业资源配置。',viatris:true},
    {id:'mnc-china',name:'MNC中国运营模式',keywords:['MNC','组织架构','大中华区','Greater China','广阔市场','院外渠道'],judgement:'MNC中国组织正在从单一产品线管理向不同客户场景分层；同时，中国研发、市场洞察和商业判断更直接进入全球资源配置。',viatris:true},
    {id:'glp1',name:'GLP-1与肥胖市场',keywords:['GLP-1','Mounjaro','Zepbound','Wegovy','肥胖','司美格鲁肽','替尔泊肽'],judgement:'GLP-1已经从单品疗效竞争进入portfolio、产能、支付、院外获客和患者分层的综合竞争。',viatris:false},
    {id:'bd',name:'中国创新药出海与BD',keywords:['License-out','license-out','BD','授权','首付款','里程碑','Sandoz','复宏汉霖'],judgement:'中国医药出海不再只有创新药资产授权，生物类似药、制造和全球商业化分工也在进入跨国药企的全球管线与LOE战略。',viatris:false},
    {id:'payment',name:'创新药支付与商保',keywords:['商保','商业健康保险','医保目录','谈判','支付','双通道'],judgement:'创新药支付正在从“是否进医保”扩展到商保、挂网、进院、双通道和直接结算的完整链条。',viatris:false},
    {id:'digital',name:'AI与数字医疗',keywords:['AI','数字医疗','人工智能','医疗AI'],judgement:'AI医疗真正的分水岭不是模型能力，而是能否进入真实工作流、完成系统集成、满足合规并证明持续ROI。',viatris:false},
    {id:'supply',name:'全球供应链与制造',keywords:['供应链','美国制造','关税','制造','API'],judgement:'制造和供应链正在从后台运营问题升级为药企应对关税、政策风险和市场准入的战略变量。',viatris:false}
  ];

  const LEVEL_OVERRIDES = {
    'hengrui-h1-2026-vbp-innovation-mix':'evidence',
    'eli-lilly-glp1-q2-2026-widens-gap-with-novo-202608':'evidence',
    'china-biotech-lab-monkey-shortage-preclinical-bottleneck-202608':'evidence',
    'mnc-china-operating-model-reorganization-202608':'theme-node',
    'glp1-china-2026':'theme-node',
    'grassroots-drg-dip-drug-follows-disease-20260817':'major',
    'nhsa-medical-insurance-15th-five-year-plan-20260819':'major',
    'nr-vbp-round12':'major',
    'essential-medicines-list-2026-official-release-analysis-202607':'major',
    'beijing-shanghai-commercial-health-insurance-innovation-drug-202607':'major',
    'sandoz-henlius-biosimilar-global-license-20260817':'major',
    'viatris-q2-2026-greater-china-growth':'major'
  };

  const EVIDENCE_NOTES = {
    'hengrui-h1-2026-vbp-innovation-mix': {vbp:'支持判断：集采影响正从单个品种价格，进一步传导到企业利润池和资源配置。'},
    'eli-lilly-glp1-q2-2026-widens-gap-with-novo-202608': {glp1:'支持判断：GLP-1竞争已经不仅看疗效，规模化供给和商业执行同样决定份额。'},
    'mnc-china-operating-model-reorganization-202608': {'mnc-china':'支持判断：MNC中国商业组织正在按医院、院外和广阔市场重新划分能力边界。'},
    'grassroots-drg-dip-drug-follows-disease-20260817': {grassroots:'支持判断：患者流、医保支付和基层药品配备开始被放进同一条政策链条。'},
    'nr-vbp-round12': {vbp:'支持判断：集采规则正在从单纯压价转向兼顾临床选择、供应稳定和长期价格治理。'},
    'essential-medicines-list-2026-official-release-analysis-202607': {grassroots:'支持判断：基药扩容只是第一步，真正商业影响还取决于基层配备和患者流。'},
    'beijing-shanghai-commercial-health-insurance-innovation-drug-202607': {payment:'支持判断：创新药支付正在从目录资格延伸到进院、供应和直接结算。'},
    'sandoz-henlius-biosimilar-global-license-20260817': {bd:'支持判断：中国医药出海能力正在从创新资产授权扩展到生物类似药和全球商业化分工。'},
    'global-pharma-us-manufacturing-tariff-supply-chain-202608': {supply:'支持判断：制造与供应链已经成为应对关税和市场政策风险的战略变量。'}
  };

  let EVENTS = [];

  function extractArray(text, varName){
    const idx = text.indexOf(`const ${varName}`);
    if(idx < 0) return [];
    const eq = text.indexOf('=', idx);
    const start = text.indexOf('[', eq);
    if(start < 0) return [];
    let depth=0, quote=null, escNext=false, lineComment=false, blockComment=false;
    for(let i=start;i<text.length;i++){
      const ch=text[i], nx=text[i+1];
      if(lineComment){ if(ch==='\n') lineComment=false; continue; }
      if(blockComment){ if(ch==='*'&&nx==='/'){blockComment=false;i++;} continue; }
      if(quote){ if(escNext){escNext=false;continue;} if(ch==='\\'){escNext=true;continue;} if(ch===quote) quote=null; continue; }
      if(ch==='/'&&nx==='/'){lineComment=true;i++;continue;}
      if(ch==='/'&&nx==='*'){blockComment=true;i++;continue;}
      if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue;}
      if(ch==='[') depth++;
      if(ch===']'){
        depth--;
        if(depth===0){
          try { return Function(`"use strict";return (${text.slice(start,i+1)});`)(); }
          catch(err){ console.error('Failed to parse', varName, err); return []; }
        }
      }
    }
    return [];
  }

  async function loadEvents(){
    const urls = [`archive.html?v=${Date.now()}`, `radar-base-20260825.html?v=${Date.now()}`];
    const responses = await Promise.all(urls.map(u => fetch(u,{cache:'no-store'})));
    for(const r of responses){ if(!r.ok) throw new Error(`数据文件加载失败：${r.status}`); }
    const [archive,base] = await Promise.all(responses.map(r=>r.text()));
    const oldEvents = extractArray(archive,'newsData');
    const newEvents = extractArray(base,'newEvents');
    const map = new Map();
    [...oldEvents,...newEvents].forEach(e=>{ if(e && e.id) map.set(e.id,e); });
    const out=[...map.values()].sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
    if(!out.length) throw new Error('事件数据为空');
    return out;
  }

  function isHigh(e){ return String(e.viatrisImpact||'').includes('高'); }
  function levelOf(e){
    if(LEVEL_OVERRIDES[e.id]) return LEVEL_OVERRIDES[e.id];
    if(isHigh(e)) return 'major';
    if(/政策|支付/.test(e.category||'') || /BD|投融资/.test(e.category||'')) return 'major';
    return 'theme-node';
  }
  function withinWeekly(e){ return String(e.date||'') >= WEEK_START && String(e.date||'') <= UPDATE_DATE; }
  function priority(e){
    let s=0;
    if(isHigh(e)) s+=5;
    if(levelOf(e)==='major') s+=3;
    if(/政策|支付/.test(e.category||'')) s+=2;
    if(/组织|公司|大公司/.test(e.category||'')) s+=2;
    if(/BD|投融资/.test(e.category||'')) s+=1;
    return s;
  }
  function eventText(e){ return `${e.title||''} ${e.summary||''} ${arr(e.tags).join(' ')} ${e.category||''}`; }
  function themeMatches(e,t){ const x=eventText(e).toLowerCase(); return t.keywords.some(k=>x.includes(String(k).toLowerCase())); }
  function themesOf(e){ return THEMES.filter(t=>themeMatches(e,t)); }

  function broadCategory(e){
    const c=String(e.category||'');
    if(/政策|支付|医保|集采/.test(c)) return '政策/支付';
    if(/器械|诊断|IVD/.test(c)) return '医疗器械/诊断';
    if(/BD|投融资|并购|融资/.test(c)) return 'BD/投融资';
    if(/组织|合规|大公司|战略|财报/.test(c)) return '组织/公司';
    if(/渠道|患者|零售|电商/.test(c)) return '渠道/患者';
    if(/数字|AI|人工智能/.test(c)) return '数字医疗/AI';
    return '药品/创新药';
  }

  function sourceLinks(e){
    const sources=arr(e.sources);
    if(!sources.length) return '';
    return `<details class="meta-details"><summary>来源 <span>${sources.length}</span></summary><div class="meta-body">${sources.map(s=>`<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label||s.url)} ↗</a>`).join('')}</div></details>`;
  }
  function timeline(e){
    const updates=arr(e.updates);
    if(updates.length<2) return '';
    return `<details class="meta-details"><summary>事件进展 <span>${updates.length}</span></summary><div class="meta-body">${updates.slice().sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))).map(u=>`<div class="timeline-row"><span class="d">${fmt(u.date)}</span><span>${esc(u.text)}</span></div>`).join('')}</div></details>`;
  }

  function baseDetail(e){
    const latest=arr(e.updates).slice().sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')))[0];
    const paragraphs=[];
    [e.summary, latest?.text, e.detail].map(clean).filter(Boolean).forEach(x=>{if(!paragraphs.includes(x)) paragraphs.push(x)});
    const main=`<section class="reader-section reader-news"><h4>新闻与背景</h4>${paragraphs.slice(0,3).map(x=>`<p>${esc(x)}</p>`).join('')}</section>`;
    const impacts=[];
    if(e.why) impacts.push(`<div class="impact-item"><h5>为什么重要</h5><p>${esc(e.why)}</p></div>`);
    if(e.role) impacts.push(`<div class="impact-item"><h5>对行业 / 岗位意味着什么</h5><p>${esc(e.role)}</p></div>`);
    const impact=impacts.length?`<section class="reader-section"><h4>影响与启发</h4><div class="impact-grid${impacts.length>1?' impact-pair':''}">${impacts.join('')}</div>${isHigh(e)?`<div class="viatris-box"><h5>对Viatris意味着什么</h5><p>${esc(e.role||e.why||'该事件与Viatris核心业务场景直接相关。')}</p></div>`:''}</section>`:'';
    const meta=`<div class="detail-meta">${timeline(e)}${sourceLinks(e)}</div>`;
    return `<div class="reader-detail">${main}${impact}${meta}</div>`;
  }

  function chips(e){
    const ts=themesOf(e).slice(0,2);
    return `<div class="chips">${isHigh(e)?'<span class="chip v">Viatris高相关</span>':''}<span class="chip">${esc(broadCategory(e))}</span>${ts.map(t=>`<span class="chip">${esc(t.name)}</span>`).join('')}</div>`;
  }

  function activateSheet(name){
    $$('.sheet-tab').forEach(x=>x.classList.toggle('active',x.dataset.sheet===name));
    $$('.sheet').forEach(x=>x.classList.toggle('active',x.id===`sheet-${name}`));
  }
  function setupTabs(){ $$('.sheet-tab').forEach(b=>b.addEventListener('click',()=>activateSheet(b.dataset.sheet))); }

  function renderMetrics(){
    const weekly=EVENTS.filter(withinWeekly);
    const focus=weekly.filter(e=>levelOf(e)!=='evidence');
    const highs=weekly.filter(isHigh);
    const wm=$('#weeklyMetrics'), as=$('#archiveStats');
    if(wm) wm.innerHTML=[['本周重点',Math.min(focus.length,5)],['本周相关事件',weekly.length],['Viatris高相关',highs.length]].map(([l,v])=>`<div class="metric"><b>${v}</b><span>${l}</span></div>`).join('');
    if(as) as.innerHTML=[['全部事件',EVENTS.length],['长期主题',THEMES.length],['高相关',EVENTS.filter(isHigh).length]].map(([l,v])=>`<div class="metric"><b>${v}</b><span>${l}</span></div>`).join('');
  }

  function renderWeekly(){
    const box=$('#weeklyFocus'); if(!box) return;
    const weekly=EVENTS.filter(withinWeekly).filter(e=>levelOf(e)!=='evidence').sort((a,b)=>priority(b)-priority(a)||String(b.date||'').localeCompare(String(a.date||''))).slice(0,5);
    box.innerHTML=weekly.map(e=>`<article class="focus-card" data-id="${esc(e.id)}"><div class="focus-top"><h3>${esc(e.title)}</h3><span class="date">${fmt(e.date)}</span></div><p class="focus-summary">${esc(e.summary||'')}</p>${chips(e)}${e.why?`<div class="why-now"><b>为什么值得看：</b>${esc(e.why)}</div>`:''}<button class="open-link" data-weekly-toggle aria-expanded="false">展开解读 ↓</button><div class="weekly-detail" hidden>${baseDetail(e)}</div></article>`).join('') || '<div class="empty show">本周没有足够重要的新增事件。</div>';
    const judgements=[
      '基层支付、基药和集采开始从三条独立政策线变成一条“患者流—医保支付—药品配备”的联动链。',
      'MNC中国运营模式越来越按医院、院外和广阔市场拆分能力，同时中国研发和商业洞察更直接进入全球决策。',
      '中国医药出海的能力边界继续扩展：不仅是创新资产，也包括生物类似药、制造与全球商业化分工。'
    ];
    const validations=[
      '9月1日新版基药实施后，各地基层究竟新增哪些分子、规格和品牌。',
      '基层新增慢病患者量最终流向原研成熟品牌还是集采仿制药。',
      'MNC渠道重构后，预算、P&L、KPI和客户归属是否真的发生迁移，而不只是组织图变化。'
    ];
    if($('#weeklyJudgements')) $('#weeklyJudgements').innerHTML=judgements.map(x=>`<div class="insight-item">${esc(x)}</div>`).join('');
    if($('#weeklyValidation')) $('#weeklyValidation').innerHTML=validations.map(x=>`<div class="insight-item">${esc(x)}</div>`).join('');
    $$('[data-weekly-toggle]').forEach(b=>b.addEventListener('click',()=>{
      const detail=b.closest('.focus-card')?.querySelector('.weekly-detail'); if(!detail) return;
      const open=detail.hidden; detail.hidden=!open; b.textContent=open?'收起解读 ↑':'展开解读 ↓'; b.setAttribute('aria-expanded',String(open));
    }));
  }

  function evidenceNote(e,t){ return EVIDENCE_NOTES[e.id]?.[t.id] || `这条事件用于继续验证“${t.name}”这一长期判断。`; }
  function renderThemes(){
    const box=$('#themeGrid'); if(!box) return;
    box.innerHTML=THEMES.map(t=>{
      const ev=EVENTS.filter(e=>themeMatches(e,t)).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
      const top=ev.slice(0,4);
      return `<article class="theme-card"><div class="theme-title"><h3>${esc(t.name)}</h3>${t.viatris?'<span class="chip v">Viatris相关</span>':''}</div><p class="theme-judgement">${esc(t.judgement)}</p><div class="theme-evidence"><b>最近证据 / 节点</b>${top.map(e=>{const src=arr(e.sources)[0]; const inner=`<span class="evidence-head"><span class="date">${fmt(e.date)}</span><strong>${esc(e.title)}</strong>${src?'<span class="arrow">↗</span>':''}</span><span class="evidence-note">${esc(evidenceNote(e,t))}</span>`; return src?`<a class="evidence-row evidence-link" href="${esc(src.url)}" target="_blank" rel="noopener">${inner}</a>`:`<div class="evidence-row">${inner}</div>`;}).join('')||'<div class="evidence-row">暂无已归档事件</div>'}</div><div class="theme-actions"><span class="theme-count">${ev.length} 条相关事件</span><button class="theme-btn" data-theme-jump="${esc(t.id)}">查看相关事件</button></div></article>`;
    }).join('');
    $$('[data-theme-jump]').forEach(b=>b.addEventListener('click',()=>{activateSheet('events'); if($('#themeFilter')) $('#themeFilter').value=b.dataset.themeJump; renderEvents();}));
  }

  function setupFilters(){
    const theme=$('#themeFilter'), month=$('#monthFilter');
    if(theme) theme.innerHTML='<option value="">全部主题</option>'+THEMES.map(t=>`<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('');
    if(month){ const months=[...new Set(EVENTS.map(e=>String(e.date||'').slice(0,7)).filter(Boolean))].sort().reverse(); month.innerHTML='<option value="">全部月份</option>'+months.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join(''); }
    ['search','broadCategoryFilter','themeFilter','monthFilter','viatrisOnly'].forEach(id=>{const el=$('#'+id); if(el) el.addEventListener(id==='search'?'input':'change',renderEvents);});
  }

  function visible(e){
    const q=clean($('#search')?.value).toLowerCase();
    if(q && !eventText(e).toLowerCase().includes(q)) return false;
    const bc=$('#broadCategoryFilter')?.value; if(bc && broadCategory(e)!==bc) return false;
    const mo=$('#monthFilter')?.value; if(mo && !String(e.date||'').startsWith(mo)) return false;
    if($('#viatrisOnly')?.checked && !isHigh(e)) return false;
    const th=$('#themeFilter')?.value; if(th){ const t=THEMES.find(x=>x.id===th); if(!t || !themeMatches(e,t)) return false; }
    return true;
  }

  function eventCard(e){
    return `<article class="event-card compact-event" data-id="${esc(e.id)}"><div class="event-main"><div class="event-top"><h3>${esc(e.title)}</h3><span class="date">${fmt(e.date)}</span></div><p class="event-summary">${esc(e.summary||'')}</p>${chips(e)}<button class="open-link" data-toggle aria-expanded="false">展开详情 ↓</button></div><div class="event-detail">${baseDetail(e)}</div></article>`;
  }
  function renderEvents(){
    const box=$('#eventList'); if(!box) return;
    const list=EVENTS.filter(visible);
    box.innerHTML=list.map(eventCard).join('');
    $('#emptyState')?.classList.toggle('show',!list.length);
    $$('.event-card [data-toggle]').forEach(b=>b.addEventListener('click',()=>{const card=b.closest('.event-card'); if(!card) return; const open=!card.classList.contains('open'); card.classList.toggle('open',open); b.textContent=open?'收起详情 ↑':'展开详情 ↓'; b.setAttribute('aria-expanded',String(open));}));
    document.dispatchEvent(new CustomEvent('radar:events-rendered'));
  }

  function showLoading(){
    if($('#weeklyFocus')) $('#weeklyFocus').innerHTML='<div class="load-error">正在加载新闻数据…</div>';
    if($('#themeGrid')) $('#themeGrid').innerHTML='<div class="load-error">正在加载长期主题…</div>';
    if($('#eventList')) $('#eventList').innerHTML='<div class="load-error">正在加载事件档案…</div>';
  }
  function showError(err){
    const msg=`数据加载失败：${clean(err?.message||err||'未知错误')}`;
    if($('#weeklyFocus')) $('#weeklyFocus').innerHTML=`<div class="load-error">${esc(msg)}。请刷新重试。</div>`;
    if($('#themeGrid')) $('#themeGrid').innerHTML=`<div class="load-error">${esc(msg)}</div>`;
    if($('#eventList')) $('#eventList').innerHTML=`<div class="load-error">${esc(msg)}</div>`;
  }

  async function init(){
    setupTabs(); showLoading();
    try{
      EVENTS=await loadEvents();
      renderMetrics(); renderWeekly(); renderThemes(); setupFilters(); renderEvents();
      document.dispatchEvent(new CustomEvent('radar:ready'));
    }catch(err){ console.error(err); showError(err); }
  }

  init();
})();
