(() => {
  'use strict';

  const UPDATE_DATE = '2026-09-16';
  const WEEK_START = '2026-09-01';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const arr = v => Array.isArray(v) ? v : [];
  const clean = s => String(s || '').replace(/\s+/g,' ').trim();
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = d => String(d || '').replaceAll('-','.');

  const THEMES = [
    {id:'grassroots',name:'基药与基层医疗',keywords:['基药','基本药物','基层','DRG','DIP','同病同付','药随病走'],judgement:'DRG/DIP 3.0把基层“同病同付”从方向变成国家分组要求，基药与集采“三进”则补上药品供应。成熟品牌要看患者流、支付标准、基层/零售配备是否同步变化。',viatris:true},
    {id:'vbp',name:'集采与成熟品牌',keywords:['集采','带量采购','国采','成熟药','成熟品牌','仿制药','参比制剂'],judgement:'第12批药品与第7批耗材共同确认：集采仍然控价，但“畸低价不带量”、按厂牌报量、复活机制和临床功能折算，正在把竞争从最低价推向合理价格、真实需求与供应履约。',viatris:true},
    {id:'mnc-china',name:'MNC中国运营模式',keywords:['MNC','组织架构','大中华区','Greater China','广阔市场','院外渠道','成熟品牌'],judgement:'MNC的运营分工正在同时按客户场景和资产生命周期重构：医院/零售/广阔市场需要不同能力，创新药与成熟品牌也越来越采用不同的制造、监管和商业运营模式。',viatris:true},
    {id:'glp1',name:'GLP-1与肥胖/代谢市场',keywords:['GLP-1','Mounjaro','Zepbound','Wegovy','肥胖','司美格鲁肽','替尔泊肽','MASH'],judgement:'GLP-1正从减重单品走向代谢疾病平台：口服剂型降低给药摩擦，MASH扩展科室与筛查入口；商业化越来越取决于诊断漏斗、支付、渠道和患者长期留存。',viatris:false},
    {id:'bd',name:'中国创新药出海与BD',keywords:['License-out','license-out','BD','授权','首付款','里程碑','Sandoz','复宏汉霖','Roche','GSK'],judgement:'中国医药出海已从单资产license-out进入modality/platform交易与MNC复购阶段。评价交易要看upfront、人体数据成熟度、保留权益、开发责任和买方是否持续向同一平台下注，而不是只看headline。',viatris:false},
    {id:'payment',name:'创新药支付与商保',keywords:['商保','商业健康保险','医保目录','国谈','谈判','支付','双通道','参照药'],judgement:'创新药支付正从年度国谈走向“上市前参照药预沟通—基本医保/商保分层—进院/双通道—上市后续约与价值再评价”的连续机制；商保目录价值仍需用真实保险覆盖与结算证明。',viatris:false},
    {id:'retail',name:'院外零售与患者承接',keywords:['零售药店','院外','DTP','电商','医保个人账户','白名单','三进','医保找药'],judgement:'院外零售正在从医院处方的补充渠道，变成医保价格治理、集采延伸和慢病患者承接的重要基础设施。成熟品牌要同时看门店覆盖、价格、自付、处方流和供应履约。',viatris:true},
    {id:'medtech-payment',name:'器械/IVD与医疗服务支付',keywords:['医疗器械','耗材','IVD','诊断','医疗服务价格','预立项','手术机器人','脑机接口','医保医疗服务项目'],judgement:'器械商业化不再由“获批—进院”单独决定，收费项目、地方定价、医保支付、集采与真实工作流共同决定使用量；价格和health economics正在前移到研发/审评阶段。',viatris:false},
    {id:'digital',name:'AI与数字医疗',keywords:['AI','数字医疗','人工智能','医疗AI'],judgement:'AI医疗真正的分水岭不是模型能力，而是能否进入真实工作流、完成系统集成、满足合规并证明持续ROI。',viatris:false},
    {id:'supply',name:'全球供应链与制造',keywords:['供应链','美国制造','关税','制造','API'],judgement:'制造和供应链正在从后台运营问题升级为药企应对关税、政策风险和市场准入的战略变量。',viatris:false}
  ];

  const LEVEL_OVERRIDES = {
    'hengrui-h1-2026-vbp-innovation-mix':'evidence',
    'eli-lilly-glp1-q2-2026-widens-gap-with-novo-202608':'evidence',
    'china-biotech-lab-monkey-shortage-preclinical-bottleneck-202608':'evidence',
    'mnc-china-operating-model-reorganization-202608':'evidence',
    'glp1-china-2026':'theme-node',
    'grassroots-drg-dip-drug-follows-disease-20260817':'major',
    'nhsa-medical-insurance-15th-five-year-plan-20260819':'major',
    'nr-vbp-round12':'major',
    'essential-medicines-list-2026-official-release-analysis-202607':'major',
    'beijing-shanghai-commercial-health-insurance-innovation-drug-202607':'major',
    'sandoz-henlius-biosimilar-global-license-20260817':'major',
    'viatris-q2-2026-greater-china-growth':'major',
    'nhsa-pharma-industry-high-quality-development-forum-20260827':'major',
    'high-value-consumables-vbp-7-digestive-intervention-20260826':'major',
    'dualitybio-genentech-dupac-global-adc-collaboration-20260827':'major',
    'hesco-sentivera-preclinical-autoimmune-license-20260825':'major',
    'novo-oral-semaglutide-china-weight-management-20260827':'major',

    'simcere-roche-sim0660-20260901':'evidence',
    'drg-dip-3-0-20260902':'evidence',
    'hutchmed-gsk-hmpl-a830-attc-20260903':'evidence',
    'nhsa-2026-national-reimbursement-negotiation-20260909':'major',
    'nhsa-medical-service-price-guides-20260909':'evidence',
    'vbp-high-value-consumables-round7-results-20260910':'major',
    'wegovy-mash-china-approval-20260910':'evidence',
    'retail-pharmacy-personal-account-whitelist-rollout-20260912':'evidence',
    'medilink-tampeli-sclc-phase3-20260913':'evidence',
    'hunan-vbp-drugs-three-in-retail-20260914':'evidence',
    'sanofi-cheplapharm-mature-medicines-20260914':'evidence',
    'gsk-chimagen-trispecific-tce-20260915':'evidence',
    'ivonescimab-harmoni2-os-20260915':'major',
    'nhsa-high-tech-price-prelisting-20260915':'evidence',
    'legend-biotech-ingrid-zhang-ceo-20260915':'evidence',
    'nhsa-national-medical-service-reimbursement-catalogue-20260916':'major'
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
    'global-pharma-us-manufacturing-tariff-supply-chain-202608': {supply:'支持判断：制造与供应链已经成为应对关税和市场政策风险的战略变量。'},

    'simcere-roche-sim0660-20260901': {bd:'支持判断：中国平台型资产可以在人体数据前获得MNC验证，但交易质量仍应拆分upfront、临床成熟度和后续兑现概率。'},
    'drg-dip-3-0-20260902': {grassroots:'修正判断：基层市场不只靠基药扩容，医保对医院的“同病同付”正在直接改变患者下沉激励。',payment:'支持判断：支付方式改革正在从控费进一步承担分级诊疗与创新支持功能。'},
    'hutchmed-gsk-hmpl-a830-attc-20260903': {bd:'支持判断：中国可交易的modality能力正在从抗体/ADC扩展到“自研小分子payload+抗体定向递送”。'},
    'nhsa-2026-national-reimbursement-negotiation-20260909': {payment:'修正判断：创新药准入正在从年度谈判变成参照药预沟通、基本医保/商保分层和上市后价值评价的连续机制。'},
    'nhsa-medical-service-price-guides-20260909': {'medtech-payment':'支持判断：全国先统一“收费项目字典”，为创新器械收费与后续医保支付建立共同基础设施。'},
    'vbp-high-value-consumables-round7-results-20260910': {vbp:'强证据：6个异常低价产品中选但零带量，说明“反极端低价”已经进入真实分量规则。','medtech-payment':'支持判断：器械集采开始显式处理临床功能差异，而非只比较最低价格。'},
    'wegovy-mash-china-approval-20260910': {glp1:'支持并升级判断：GLP-1正在从减重产品扩展成多器官代谢疾病平台，诊断筛查和科室入口的重要性上升。'},
    'retail-pharmacy-personal-account-whitelist-rollout-20260912': {retail:'支持判断：医保定点药店正从泛健康消费场景回到更强的医疗属性，经营mix和合规要求都会变化。'},
    'hunan-vbp-drugs-three-in-retail-20260914': {vbp:'支持判断：集采价格治理正从院内延伸到基层、民营医院和零售药店。',retail:'强证据：零售端开始同时管理覆盖、供货价和药店加成，院外渠道不再与集采价格体系割裂。'},
    'sanofi-cheplapharm-mature-medicines-20260914': {'mnc-china':'支持判断：创新药和成熟品牌越来越需要不同的制造、监管与商业operating model。',vbp:'支持判断：成熟品牌的长期价值需要专门化生命周期运营，而不是沿用创新药组织成本结构。'},
    'gsk-chimagen-trispecific-tce-20260915': {bd:'支持判断：同一MNC对同一中国平台复购，比单次headline金额更能验证平台能力。'},
    'nhsa-high-tech-price-prelisting-20260915': {'medtech-payment':'修正判断：创新器械的收费路径从获批后补手续，前移到临床/创新器械审查阶段并行准备。'},
    'nhsa-national-medical-service-reimbursement-catalogue-20260916': {'medtech-payment':'强证据：收费项目、价格预立项和全国医保支付范围开始形成三层相互衔接的国家框架。',payment:'支持判断：医保支付标准化正在从药品进一步扩展到医疗服务项目。'}
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
    const urls = [
      `archive.html?v=${Date.now()}`,
      `radar-base-20260825.html?v=${Date.now()}`,
      `radar-catchup-202609.js?v=${Date.now()}`
    ];
    const responses = await Promise.all(urls.map(u => fetch(u,{cache:'no-store'})));
    for(const r of responses){ if(!r.ok) throw new Error(`数据文件加载失败：${r.status}`); }
    const [archive,base,catchup] = await Promise.all(responses.map(r=>r.text()));
    const oldEvents = extractArray(archive,'newsData');
    const newEvents = extractArray(base,'newEvents');
    const catchupEvents = extractArray(catchup,'newEvents');
    const map = new Map();
    [...oldEvents,...newEvents,...catchupEvents].forEach(e=>{ if(e && e.id) map.set(e.id,e); });
    const out=[...map.values()].sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
    if(!out.length) throw new Error('事件数据为空');
    return out;
  }

  function isHigh(e){ return String(e.viatrisImpact||'').includes('高'); }
  function levelOf(e){ return LEVEL_OVERRIDES[e.id] || 'theme-node'; }
  function withinWeekly(e){ return String(e.date||'') >= WEEK_START && String(e.date||'') <= UPDATE_DATE; }
  function priority(e){
    let s=0;
    if(isHigh(e)) s+=3;
    if(levelOf(e)==='major') s+=5;
    if(/政策|支付/.test(e.category||'')) s+=2;
    if(/组织|公司|大公司/.test(e.category||'')) s+=1;
    if(/BD|投融资/.test(e.category||'')) s+=1;
    return s;
  }
  function eventText(e){ return `${e.title||''} ${e.summary||''} ${e.detail||''} ${arr(e.tags).join(' ')} ${e.category||''}`; }
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
    [e.summary, latest?.text, e.detail].map(clean).filter(Boolean).forEach(x=>{ if(!paragraphs.includes(x)) paragraphs.push(x); });
    const main=`<section class="reader-section reader-news"><h4>新闻与背景</h4>${paragraphs.slice(0,3).map(x=>`<p>${esc(x)}</p>`).join('')}</section>`;
    const interpret=[e.why,e.role].map(clean).filter(Boolean);
    const insight=interpret.length?`<section class="reader-section"><h4>核心解读</h4>${interpret.map(x=>`<p>${esc(x)}</p>`).join('')}</section>`:'';
    const viatris=e.viatrisNote?`<div class="viatris-box"><h5>对Viatris意味着什么</h5><p>${esc(e.viatrisNote)}</p></div>`:'';
    const meta=`<div class="detail-meta">${timeline(e)}${sourceLinks(e)}</div>`;
    return `<div class="reader-detail">${main}${insight}${viatris}${meta}</div>`;
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
    const focus=weekly.filter(e=>levelOf(e)==='major');
    const highs=weekly.filter(isHigh);
    const wm=$('#weeklyMetrics'), as=$('#archiveStats');
    if(wm) wm.innerHTML=[['本期重点',focus.length],['9月新增事件',weekly.length],['Viatris高相关',highs.length]].map(([l,v])=>`<div class="metric"><b>${v}</b><span>${l}</span></div>`).join('');
    if(as) as.innerHTML=[['全部事件',EVENTS.length],['长期主题',THEMES.length],['高相关',EVENTS.filter(isHigh).length]].map(([l,v])=>`<div class="metric"><b>${v}</b><span>${l}</span></div>`).join('');
  }

  function renderWeekly(){
    const box=$('#weeklyFocus'); if(!box) return;
    const weekly=EVENTS.filter(withinWeekly).filter(e=>levelOf(e)==='major').sort((a,b)=>priority(b)-priority(a)||String(b.date||'').localeCompare(String(a.date||''))).slice(0,4);
    box.innerHTML=weekly.map(e=>`<article class="focus-card" data-id="${esc(e.id)}"><div class="focus-top"><h3>${esc(e.title)}</h3><span class="date">${fmt(e.date)}</span></div><p class="focus-summary">${esc(e.summary||'')}</p>${chips(e)}${e.why?`<div class="why-now"><b>为什么值得看：</b>${esc(e.why)}</div>`:''}<button class="open-link" data-weekly-toggle aria-expanded="false">展开解读 ↓</button><div class="weekly-detail" hidden>${baseDetail(e)}</div></article>`).join('') || '<div class="empty show">本期没有足够重要的新增事件。</div>';

    const judgements=[
      '医保药品准入正在从年度谈判，走向“提前定锚 + 基本医保/商保分层 + 上市后价值再评价”的生命周期管理。',
      '集采的反极端低价已进入可验证执行：合理价格、临床需求和供应履约开始共同决定谁真正获得采购量。',
      '中国创新药全球竞争进入下一阶段：在中国做出领先数据只是第一步，能否在全球患者中复现正在成为更关键的价值变量。',
      '医疗新技术支付正在前移：收费项目、地方价格与医保支付从获批后的串行手续，逐渐变成研发/注册阶段就要同步设计的商业基础设施。'
    ];
    const validations=[
      '正式医保/商保目录公布后，高值创新药最终落在哪一层支付，以及商保目录能否形成真实结算量。',
      '第7批耗材2027年执行后，国产扩量与外资保价两类策略最终如何影响真实份额和收入。',
      'HARMONi-7等全球研究能否在非中国人群中复制依沃西相对标准治疗的优势。',
      '价格预立项首批地方案例能把“产品获批—形成收费项目—进入医保支付”周期缩短多少。'
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
