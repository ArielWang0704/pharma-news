(() => {
  const UPDATE_DATE = '2026-08-25';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean = s => String(s || '').replace(/\s+/g,' ').trim();
  const arr = v => Array.isArray(v) ? v : [];
  const fmt = d => String(d || '').replaceAll('-','.');

  const THEMES = [
    {id:'grassroots',name:'基药与基层医疗',keywords:['基药','基本药物','基层','DRG','DIP','同病同付','药随病走'],judgement:'基药的商业价值正在从“进入目录”转向“患者是否下沉、医保是否跟随、基层是否真正配药”。真正影响成熟品牌的，是患者流、支付和终端配备能否同时改变。',viatris:true},
    {id:'vbp',name:'集采与成熟品牌',keywords:['集采','带量采购','国采','成熟药','仿制药','参比制剂'],judgement:'集采已经从一次性降价工具变成长期价格治理机制，影响不仅是价格，还会继续传导到医院切量、院外承接、供应履约和企业资源配置。',viatris:true},
    {id:'mnc-china',name:'MNC中国运营模式',keywords:['MNC','组织架构','大中华区','Greater China','广阔市场','院外渠道'],judgement:'MNC中国组织正在从单一产品线管理向不同客户场景分层；同时，中国研发、市场洞察和商业判断更直接进入全球资源配置。',viatris:true},
    {id:'glp1',name:'GLP-1与肥胖市场',keywords:['GLP-1','Mounjaro','Zepbound','Wegovy','肥胖','司美格鲁肽','替尔泊肽'],judgement:'GLP-1已经从单品疗效竞争进入portfolio、产能、支付、院外获客和患者分层的综合竞争。',viatris:false},
    {id:'bd',name:'中国创新药出海与BD',keywords:['License-out','license-out','BD','授权','首付款','里程碑','Sandoz','复宏汉霖'],judgement:'中国医药出海不再只有创新药资产授权，生物类似药、制造和全球商业化分工也在进入跨国药企的全球管线与LOE战略。',viatris:false},
    {id:'payment',name:'创新药支付与商保',keywords:['商保','商业健康保险','医保目录','谈判','支付','双通道'],judgement:'创新药支付正在从“是否进医保”扩展到商保、挂网、进院、双通道和直接结算的完整链条，支付基础设施本身开始成为竞争力。',viatris:false},
    {id:'digital',name:'AI与数字医疗',keywords:['AI','数字医疗','人工智能','医疗AI'],judgement:'AI医疗真正的分水岭不是模型能力，而是能否进入真实工作流、完成系统集成、满足合规并证明持续ROI。',viatris:false},
    {id:'supply',name:'全球供应链与制造',keywords:['供应链','美国制造','关税','制造','API'],judgement:'制造和供应链正在从后台运营问题升级为药企应对关税、政策风险和市场准入的战略变量。',viatris:false}
  ];

  // Internal governance only. Not exposed in the reader UI.
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

  const CUSTOM = {
    'grassroots-drg-dip-drug-follows-disease-20260817': {
      background:'过去分级诊疗常卡在三个环节不同步：基层医院未必愿意接，患者未必愿意去，患者下沉后基层也未必有长期使用的药。这次政策开始同时调整医保给医院的支付激励和基层药品供给。',
      lead:['“同病同付”到底怎么操作','它主要改变的是医保给医疗机构的病种结算逻辑。地方从国家推荐的基层病组/病种中选择本地真正有能力诊治的项目；对这些标准化、费用较稳定的简单病例，弱化因医院等级不同带来的支付差异，使三级医院治疗简单病不再天然拿到更高病种支付。基层若能以更低成本规范完成治疗，就更有动力承接。'],
      pair:[
        ['真实落地信号','哈尔滨类似实践中，二级以下机构收治基层病组病例占比同比提升18.44%，次均费用下降6.83%，109家机构实现正向结余；同时2744家基层医疗机构参与药品集采，说明“病人下沉”和“药品下沉”正在一起发生。'],
        ['示意理解（非真实价格）','假设某基层病组医保支付标准为5000元/例：基层若3500元可规范完成治疗，就有合理结余；三级医院若治疗同一简单病例成本更高，但支付不再因等级显著抬高，就更愿意把资源留给复杂病例。5000/3500元仅用于理解机制。']
      ],
      tail:['最后怎么传导到药品','基层收治增加 → 患者慢病随访/续方下沉 → 基层必须扩大对应药品目录 → 基药、集采中选药和医保药同步进入 → 原研与集采仿制在基层重新竞争 → 基层未配原研时，部分需求可能继续流向零售。'],
      viatris:'对阿托伐他汀、氨氯地平等成熟慢病分子，真正需要看：患者是否下沉；基层新增哪些分子/SKU；同分子下原研和集采仿制能否同时获得；基层没有原研时需求是否转到院外零售。'
    },
    'mnc-china-operating-model-reorganization-202608': {
      background:'这张卡合并的是三种不同性质的动作：诺和诺德是商业组织重构，勃林格殷格翰是中国区域治理与研发能力升级，诺华是关键高管变化。放在一起是为了观察MNC如何重新分配中国市场的客户归属、资源和全球接口，而不是认为三家公司做了同一件事。',
      pair:[
        ['诺和诺德：渠道怎么拆','医院、零售/线上健康管理/私立医疗、广阔市场被放进更清晰的不同业务场景。新兴渠道事业部把零售、线上医药健康管理和私立医疗放在一起，说明院外患者触达不再只是医院业务的附属渠道。'],
        ['勃林格殷格翰：中国怎么进入全球','提升大中华区在全球治理中的位置，并计划在上海张江加强早研能力，核心是缩短中国研发和市场洞察进入全球决策的链条。'],
        ['诺华：这次该怎么看','张颖离任首先是国际商业管理连续性问题。是否改变中国战略，需要看继任安排和后续资源，不能单凭一位高管离职推断战略转向。'],
        ['真正值得benchmark的是什么','不是部门名字，而是客户归属、预算、P&L、KPI和决策权是否迁移，以及一线覆盖和跨部门协作是否因此改变。']
      ],
      viatris:'高相关主要在渠道拆分逻辑：成熟品牌同时覆盖医院、零售、线上和广阔市场时，是否仍适合按产品统一管理，还是需要按客户/渠道场景配置不同能力，是值得参考的问题；但不代表应照搬其他公司的组织结构。'
    },
    'viatris-q2-2026-greater-china-growth': {
      background:'Viatris全球组合以成熟品牌为重要基础，中国业务的意义不只在区域规模，而在于它是否能在集采、基层、零售和渠道变化中继续贡献稳定增长。',
      pair:[
        ['这组数字说明什么','Greater China Q2净销售额7.138亿美元，同比+21%、运营口径+16%，显著快于集团整体。公司也明确将Greater China强劲增长列为季度增长驱动之一。'],
        ['现在还不能下什么结论','公开财报没有披露中国品牌级、渠道级拆分，因此不能直接把增长归因到立普妥、络活喜、西乐葆或某一渠道，也不能把reported增长完全理解为真实销量增长。']
      ],
      tail:['真正应该继续拆什么','品牌mix、医院/零售/电商渠道、销量/价格、库存与一次性因素，以及基药/集采变化对H2的影响。'],
      viatris:'这是直接的公司经营信号。对内部分析最有价值的下一步不是重复“+16%”，而是把增长拆到品牌、渠道、量价和库存，判断哪些增长可持续。'
    }
  };

  const EVIDENCE_NOTES = {
    'hengrui-h1-2026-vbp-innovation-mix': {vbp:'支持判断：集采影响正从单个品种价格，进一步传导到企业利润池和资源配置。'},
    'eli-lilly-glp1-q2-2026-widens-gap-with-novo-202608': {glp1:'支持判断：GLP-1竞争已经不仅看疗效，规模化供给和商业执行同样决定份额。'},
    'mnc-china-operating-model-reorganization-202608': {'mnc-china':'支持判断：MNC中国商业组织正在按医院、院外和广阔市场重新划分能力边界。'},
    'grassroots-drg-dip-drug-follows-disease-20260817': {grassroots:'支持判断：患者流、医保支付和基层药品配备开始被放进同一条政策链条。'},
    'nr-vbp-round12': {vbp:'支持判断：集采规则正在从“单纯压价”转向兼顾临床选择、供应稳定和长期价格治理。'},
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
          const literal=text.slice(start,i+1);
          try{return Function(`"use strict";return (${literal});`)()}catch(e){console.error('parse',varName,e);return [];}
        }
      }
    }
    return [];
  }

  async function loadLegacy(){
    const [archive, base] = await Promise.all([
      fetch(`archive.html?v=${UPDATE_DATE}`,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('archive');return r.text()}),
      fetch(`radar-base-20260825.html?v=${UPDATE_DATE}`,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('base');return r.text()})
    ]);
    const oldEvents = extractArray(archive,'newsData');
    const newEvents = extractArray(base,'newEvents');
    const map = new Map();
    [...oldEvents,...newEvents].forEach(e=>{ if(e?.id) map.set(e.id,e); });
    return [...map.values()].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  }

  function eventText(e){ return `${e.title||''} ${arr(e.tags).join(' ')}`; }
  function themeMatches(e,t){ const x=eventText(e).toLowerCase(); return t.keywords.some(k=>x.includes(String(k).toLowerCase())); }
  function themesOf(e){ return THEMES.filter(t=>themeMatches(e,t)); }
  function levelOf(e){
    if(LEVEL_OVERRIDES[e.id]) return LEVEL_OVERRIDES[e.id];
    if(isHigh(e)) return 'major';
    if((e.category||'').includes('政策')||(e.category||'').includes('BD')) return 'major';
    return 'theme-node';
  }
  function isHigh(e){return String(e.viatrisImpact||'').includes('高');}
  function latestUpdate(e){ return arr(e.updates).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0]; }
  function withinWeekly(e){ return String(e.date) >= '2026-08-17' && String(e.date) <= UPDATE_DATE; }
  function priority(e){ let s=0; if(isHigh(e))s+=5; if(levelOf(e)==='major')s+=3; if((e.category||'').includes('政策'))s+=2; if((e.category||'').includes('组织'))s+=2; if((e.category||'').includes('BD'))s+=1; return s; }

  function setupTabs(){ $$('.sheet-tab').forEach(b=>b.addEventListener('click',()=>activateSheet(b.dataset.sheet))); }
  function activateSheet(name){
    $$('.sheet-tab').forEach(x=>x.classList.toggle('active',x.dataset.sheet===name));
    $$('.sheet').forEach(x=>x.classList.toggle('active',x.id===`sheet-${name}`));
  }

  function renderMetrics(){
    const weekly=EVENTS.filter(withinWeekly), focus=weekly.filter(e=>levelOf(e)!=='evidence'), highs=weekly.filter(isHigh);
    $('#weeklyMetrics').innerHTML=[['本周重点',Math.min(focus.length,5)],['本周相关事件',weekly.length],['Viatris高相关',highs.length]].map(([l,v])=>`<div class="metric"><b>${v}</b><span>${l}</span></div>`).join('');
    $('#archiveStats').innerHTML=[['全部事件',EVENTS.length],['长期主题',THEMES.length],['高相关',EVENTS.filter(isHigh).length]].map(([l,v])=>`<div class="metric"><b>${v}</b><span>${l}</span></div>`).join('');
  }

  function chipsFor(e, maxThemes=2){
    const ts=themesOf(e).slice(0,maxThemes);
    return `<div class="chips">${isHigh(e)?'<span class="chip v">Viatris高相关</span>':''}<span class="chip">${esc(e.category||'其他')}</span>${ts.map(t=>`<span class="chip">${esc(t.name)}</span>`).join('')}</div>`;
  }

  function backgroundTitle(e){
    const c=e.category||'';
    if(c.includes('组织')||c.includes('大公司')) return '新闻与公司背景';
    if(c.includes('政策')||c.includes('支付')) return '新闻与政策背景';
    if(c.includes('BD')||c.includes('投融资')) return '新闻与交易背景';
    if(c.includes('药品')||c.includes('创新药')) return '新闻与产品背景';
    return '新闻与背景';
  }

  function dedupeParagraphs(xs){
    const out=[];
    for(const x of xs.map(clean).filter(Boolean)){
      const k=x.replace(/[，。；：、\s]/g,'');
      if(out.some(y=>{const z=y.replace(/[，。；：、\s]/g,'');return z.includes(k)||k.includes(z)})) continue;
      out.push(x);
    }
    return out;
  }

  function buildNewsBlock(e, custom){
    const latest=latestUpdate(e);
    const paras=dedupeParagraphs([e.summary, latest?.text, custom?.background, !custom?.background?e.detail:'']);
    const body=paras.slice(0,4).map(p=>`<p>${esc(p)}</p>`).join('');
    return `<section class="reader-section reader-news"><h4>${esc(backgroundTitle(e))}</h4>${body}</section>`;
  }

  function buildCoreBlock(e, custom){
    if(!custom) return '';
    const parts=[];
    if(custom.lead) parts.push(`<div class="reader-piece reader-piece-lead"><h5>${esc(custom.lead[0])}</h5><p>${esc(custom.lead[1])}</p></div>`);
    if(arr(custom.pair).length){
      parts.push(`<div class="reader-pair">${custom.pair.map(([h,p])=>`<div class="reader-piece"><h5>${esc(h)}</h5><p>${esc(p)}</p></div>`).join('')}</div>`);
    }
    if(custom.tail) parts.push(`<div class="reader-piece reader-piece-tail"><h5>${esc(custom.tail[0])}</h5><p>${esc(custom.tail[1])}</p></div>`);
    if(!parts.length) return '';
    return `<section class="reader-section"><h4>核心解读</h4>${parts.join('')}</section>`;
  }

  function buildImpactBlock(e, custom){
    const items=[];
    if(e.why) items.push(['为什么重要',e.why]);
    if(e.role) items.push(['对行业 / 岗位意味着什么',e.role]);
    const parallel = items.length>1 ? ' impact-pair' : '';
    let html='';
    if(items.length) html += `<div class="impact-grid${parallel}">${items.map(([h,p])=>`<div class="impact-item"><h5>${esc(h)}</h5><p>${esc(p)}</p></div>`).join('')}</div>`;
    if(isHigh(e)) html += `<div class="viatris-box"><h5>对Viatris意味着什么</h5><p>${esc(custom?.viatris || e.role || e.why || '该事件与Viatris核心业务场景直接相关。')}</p></div>`;
    if(!html) return '';
    return `<section class="reader-section"><h4>影响与启发</h4>${html}</section>`;
  }

  function buildMeta(e){
    const blocks=[];
    if(arr(e.updates).length>1){
      blocks.push(`<details class="meta-details"><summary>事件进展 <span>${arr(e.updates).length}</span></summary><div class="meta-body">${arr(e.updates).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(u=>`<div class="timeline-row"><span class="d">${fmt(u.date)}</span><span>${esc(u.text)}</span></div>`).join('')}</div></details>`);
    }
    if(arr(e.sources).length){
      blocks.push(`<details class="meta-details"><summary>来源 <span>${arr(e.sources).length}</span></summary><div class="meta-body">${arr(e.sources).map(s=>`<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label||s.url)} ↗</a>`).join('')}</div></details>`);
    }
    return blocks.length ? `<div class="detail-meta">${blocks.join('')}</div>` : '';
  }

  function buildDetail(e){
    const custom=CUSTOM[e.id];
    return `<div class="reader-detail">${buildNewsBlock(e,custom)}${buildCoreBlock(e,custom)}${buildImpactBlock(e,custom)}${buildMeta(e)}</div>`;
  }

  function renderWeekly(){
    const weekly = EVENTS.filter(withinWeekly).filter(e=>levelOf(e)!=='evidence').sort((a,b)=>priority(b)-priority(a)||String(b.date).localeCompare(String(a.date))).slice(0,5);
    $('#weeklyFocus').innerHTML = weekly.map(e=>`<article class="focus-card" data-id="${esc(e.id)}">
      <div class="focus-top"><h3>${esc(e.title)}</h3><span class="date">${fmt(e.date)}</span></div>
      <p class="focus-summary">${esc(e.summary||'')}</p>
      ${chipsFor(e)}
      ${e.why?`<div class="why-now"><b>为什么值得看：</b>${esc(e.why)}</div>`:''}
      <button class="open-link" data-weekly-toggle aria-expanded="false">展开解读 ↓</button>
      <div class="weekly-detail" hidden>${buildDetail(e)}</div>
    </article>`).join('') || '<div class="empty show">本周没有足够重要的新增事件。</div>';

    const judgements=[
      '基层支付、基药和集采开始从三条独立政策线变成一条“患者流—医保支付—药品配备”的联动链。',
      'MNC中国运营模式越来越按医院、院外和广阔市场拆分能力，同时中国研发和商业洞察更直接进入全球决策。',
      '中国医药出海的能力边界继续扩展：不仅是创新资产，也包括生物类似药、制造与全球商业化分工。'
    ];
    $('#weeklyJudgements').innerHTML=judgements.map(x=>`<div class="insight-item">${esc(x)}</div>`).join('');
    const validations=[
      '9月1日新版基药实施后，各地基层究竟新增哪些分子、规格和品牌。',
      '基层新增慢病患者量最终流向原研成熟品牌还是集采仿制药。',
      'MNC渠道重构后，预算、P&L、KPI和客户归属是否真的发生迁移，而不只是组织图变化。'
    ];
    $('#weeklyValidation').innerHTML=validations.map(x=>`<div class="insight-item">${esc(x)}</div>`).join('');
    $$('[data-weekly-toggle]').forEach(b=>b.addEventListener('click',()=>{
      const detail=b.closest('.focus-card').querySelector('.weekly-detail');
      const willOpen=detail.hidden;
      detail.hidden=!willOpen;
      b.textContent=willOpen?'收起解读 ↑':'展开解读 ↓';
      b.setAttribute('aria-expanded',String(willOpen));
    }));
  }

  function evidenceNote(e,t){
    return EVIDENCE_NOTES[e.id]?.[t.id] || `这条事件用于继续验证“${t.name}”这一长期判断，重点看它是否改变真实执行、资源配置或市场行为。`;
  }

  function renderThemes(){
    $('#themeGrid').innerHTML = THEMES.map(t=>{
      const ev=EVENTS.filter(e=>themeMatches(e,t)).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
      const top=ev.slice(0,4);
      return `<article class="theme-card">
        <div class="theme-title"><h3>${esc(t.name)}</h3>${t.viatris?'<span class="chip v">Viatris相关</span>':''}</div>
        <p class="theme-judgement">${esc(t.judgement)}</p>
        <div class="theme-evidence"><b>最近证据 / 节点</b>${top.map(e=>{
          const src=arr(e.sources)[0];
          const inner=`<span class="evidence-head"><span class="date">${fmt(e.date)}</span><strong>${esc(e.title)}</strong>${src?'<span class="arrow">↗</span>':''}</span><span class="evidence-note">${esc(evidenceNote(e,t))}</span>`;
          return src?`<a class="evidence-row evidence-link" href="${esc(src.url)}" target="_blank" rel="noopener">${inner}</a>`:`<div class="evidence-row">${inner}</div>`;
        }).join('')||'<div class="evidence-row">暂无已归档事件</div>'}</div>
        <div class="theme-actions"><span class="theme-count">${ev.length} 条相关事件</span><button class="theme-btn" data-theme-jump="${esc(t.id)}">查看相关事件</button></div>
      </article>`;
    }).join('');
    $$('[data-theme-jump]').forEach(b=>b.addEventListener('click',()=>{
      activateSheet('events'); $('#themeFilter').value=b.dataset.themeJump; renderEvents();
    }));
  }

  function setupFilters(){
    const cats=[...new Set(EVENTS.map(e=>e.category).filter(Boolean))].sort();
    $('#categoryFilter').innerHTML='<option value="">全部类型</option>'+cats.map(x=>`<option>${esc(x)}</option>`).join('');
    $('#themeFilter').innerHTML='<option value="">全部主题</option>'+THEMES.map(t=>`<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('');
    const months=[...new Set(EVENTS.map(e=>String(e.date||'').slice(0,7)).filter(Boolean))].sort().reverse();
    $('#monthFilter').innerHTML='<option value="">全部月份</option>'+months.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');
    ['search','categoryFilter','themeFilter','monthFilter','viatrisOnly'].forEach(id=>$('#'+id).addEventListener(id==='search'?'input':'change',renderEvents));
  }

  function eventVisible(e){
    const q=clean($('#search').value).toLowerCase();
    if(q && !`${e.title||''} ${e.summary||''} ${arr(e.tags).join(' ')} ${e.category||''}`.toLowerCase().includes(q)) return false;
    if($('#categoryFilter').value && e.category!==$('#categoryFilter').value) return false;
    if($('#monthFilter').value && !String(e.date||'').startsWith($('#monthFilter').value)) return false;
    if($('#viatrisOnly').checked && !isHigh(e)) return false;
    const th=$('#themeFilter').value;
    if(th){const t=THEMES.find(x=>x.id===th); if(!t||!themeMatches(e,t)) return false;}
    return true;
  }

  function renderEventCard(e){
    return `<article class="event-card compact-event" data-id="${esc(e.id)}">
      <div class="event-main">
        <div class="event-top"><h3>${esc(e.title)}</h3><span class="date">${fmt(e.date)}</span></div>
        <p class="event-summary">${esc(e.summary||'')}</p>
        ${chipsFor(e)}
        <button class="open-link" data-toggle aria-expanded="false">展开详情 ↓</button>
      </div>
      <div class="event-detail">${buildDetail(e)}</div>
    </article>`;
  }

  function renderEvents(){
    const list=EVENTS.filter(eventVisible);
    $('#eventList').innerHTML=list.map(renderEventCard).join('');
    $('#emptyState').classList.toggle('show',!list.length);
    $$('.event-card [data-toggle]').forEach(b=>b.addEventListener('click',()=>{
      const card=b.closest('.event-card');
      const open=!card.classList.contains('open');
      card.classList.toggle('open',open);
      b.textContent=open?'收起详情 ↑':'展开详情 ↓';
      b.setAttribute('aria-expanded',String(open));
    }));
  }

  async function init(){
    setupTabs();
    try{
      EVENTS = await loadLegacy();
      renderMetrics();
      renderWeekly();
      renderThemes();
      setupFilters();
      renderEvents();
    }catch(err){
      console.error(err);
      $('#weeklyFocus').innerHTML='<div class="load-error">数据加载失败，但页面结构仍可用。请刷新后重试。</div>';
      $('#themeGrid').innerHTML='<div class="load-error">长期主题数据暂未加载。</div>';
      $('#eventList').innerHTML='<div class="load-error">事件数据暂未加载。</div>';
    }
  }
  init();
})();
