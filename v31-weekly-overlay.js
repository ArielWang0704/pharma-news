(() => {
  'use strict';
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async function(input, init){
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    const res = await nativeFetch(input, init);
    if(!url.includes('radar-catchup-202609.js')) return res;
    try{
      const [baseText, weeklyRes] = await Promise.all([res.text(), nativeFetch(`radar-weekly-20260921.js?v=${Date.now()}`, {cache:'no-store'})]);
      if(!weeklyRes.ok) return new Response(baseText,{status:res.status,statusText:res.statusText,headers:res.headers});
      const weeklyText = await weeklyRes.text();
      const merged = baseText + '\n' + weeklyText.replace('const newEvents =','const weeklyEvents =');
      const injected = merged.replace(/const newEvents\s*=\s*\[/, 'const newEvents = [').replace(/\nconst weeklyEvents\s*=\s*\[/, '\nconst weeklyEvents = [');
      const idx = injected.lastIndexOf('];');
      const widx = injected.lastIndexOf('const weeklyEvents');
      if(widx < 0 || idx < widx) return new Response(baseText,{status:200,headers:{'Content-Type':'text/javascript; charset=utf-8'}});
      const start = injected.indexOf('[',widx), end = injected.indexOf('];',start);
      const weeklyArray = injected.slice(start+1,end);
      const baseEnd = baseText.lastIndexOf('];');
      const out = baseText.slice(0,baseEnd) + (baseText.slice(0,baseEnd).trimEnd().endsWith('[')?'':',') + weeklyArray + baseText.slice(baseEnd);
      return new Response(out,{status:200,headers:{'Content-Type':'text/javascript; charset=utf-8'}});
    }catch(e){ return res; }
  };

  const cards = [
    {
      date:'2026.09.18',
      title:'十部门发布医药工业“十五五”规划：政策目标从“鼓励创新”进入可量化产业KPI',
      summary:'到2030年，规模以上医药工业企业营业收入目标超过3.5万亿元，创新药产业规模年均增速20%以上，首创新药（FIC）占全球比例25%以上，全球年销售额超10亿美元品种达到5个以上，创新医疗器械上市数量达到200个以上。',
      why:'真正的变化不是单个20%增速数字，而是创新、支付、监管、制造和国际化被放进同一套跨部门产业目标。规划同时明确“专利过期药物高效替代”、通用名药/生物类似药推广、零售药店健康驿站、重点药品保供，以及完善价格支付使用政策。对成熟品牌而言，竞争逻辑会更偏向临床价值、稳定供应、低成本高质量制造和终端效率，而不是单靠品牌溢价。',
      industry:'行业主流解读把FIC 25%、创新药20%+增速和全球重磅品种视为从“制药大国”向“制药强国”的质量指标；但这些是2030产业预期，不等于单个企业增长承诺。更值得跟踪的是价格支付、进院和全球商业化配套能否把研发指标转成真实收入。',
      sources:[['工信部：十五五规划解读','https://www.miit.gov.cn/jgsj/xfpgys/yy/art/2026/art_f18b30d0f5fd4635b6544c6d13097b98.html'],['规划全文','https://www.cnpharm.com/upload/resources/file/2026/09/18/195040.pdf'],['21世纪经济报道：原创突围','https://m.21jingji.com/article/20260919/c8324354c202a32ff8dd813e3bebddc6.html'],['经济观察报：FIC与重磅品种目标','https://m.eeo.com.cn/2026/0918/1041672.shtml']]
    },
    {
      date:'2026.09.17',
      title:'DRG/DIP 3.0进一步落到慢病：基层“同病同付”开始直接改变患者流和药品需求',
      summary:'国家医保局本周进一步解释DRG/DIP 3.0：首批DRG基层内科病组共31个，覆盖高血压等基层高频病种；同一统筹区内，基层病种在不同等级医疗机构执行相同支付标准。复杂病例则可通过特例单议降低医院因超支而限制治疗选择的顾虑。',
      why:'这不是另一条新政策，而是9月2日3.0方案的关键落地解释：此前只能说“患者可能下沉”，现在官方已把高血压等慢病、基层同病同付和药品增量空间直接连起来。与此同时，新版基药要求公立机构在实施后2个月内完成用药供应目录更新，辽宁已明确10月底前完成HIS标识和目录调整。患者流、目录、处方优先级开始同时变化。',
      industry:'行业对基药放量仍有分歧：政策给了目录和绩效抓手，但基层配送成本、上下级医院用药衔接和持续供应仍是现实瓶颈。因此不能把“进入基药/患者下沉”直接等同于原研品牌放量，真正需要看终端配备、商业覆盖、库存与处方结构。',
      viatris:'对Viatris最直接的是络活喜、立普妥等成熟慢病品牌。下一步应按省/城市验证：基层慢病患者量是否上升 → 对应SKU是否进入基层/医共体统一目录 → 商业是否覆盖到这些终端 → 是否持续有货。只有四步同时成立，DRG/DIP与基药政策才会转成真实可及和销量。',
      sources:[['国家医保局：迈向价值医疗新征程','https://www.nhsa.gov.cn/art/2026/9/17/art_14_22171.html'],['辽宁卫健委：10月底前更新用药目录','https://wsjk.ln.gov.cn/wsjk/zfxxgk/zc/xzgfxwj/2026091611310457742/index.shtml'],['健康报：新版基药一线落地','https://finance.sina.com.cn/wm/2026-09-17/doc-inisayaf4249955.shtml'],['经济观察报：基层放量仍有配送与衔接瓶颈','https://www.eeo.com.cn/2026/0710/950962.shtml']]
    }
  ];

  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(){
    const box=document.querySelector('#weeklyFocus'); if(!box) return;
    box.innerHTML=cards.map((c,i)=>`<article class="focus-card"><div class="focus-top"><h3>${esc(c.title)}</h3><span class="date">${c.date}</span></div><p class="focus-summary">${esc(c.summary)}</p><div class="chips"><span class="chip">政策/支付</span>${c.viatris?'<span class="chip v">Viatris高相关</span>':''}</div><div class="why-now"><b>为什么值得看：</b>${esc(c.why)}</div><button class="open-link" data-v31-toggle>展开解读 ↓</button><div class="weekly-detail" hidden><div class="reader-detail"><section class="reader-section"><h4>行业怎么看</h4><p>${esc(c.industry)}</p></section>${c.viatris?`<div class="viatris-box"><h5>对Viatris意味着什么</h5><p>${esc(c.viatris)}</p></div>`:''}<div class="detail-meta"><details class="meta-details"><summary>来源 <span>${c.sources.length}</span></summary><div class="meta-body">${c.sources.map(s=>`<a class="source-link" href="${esc(s[1])}" target="_blank" rel="noopener">${esc(s[0])} ↗</a>`).join('')}</div></details></div></div></div></article>`).join('');
    document.querySelectorAll('[data-v31-toggle]').forEach(b=>b.addEventListener('click',()=>{const d=b.nextElementSibling; d.hidden=!d.hidden; b.textContent=d.hidden?'展开解读 ↓':'收起解读 ↑';}));
    const m=document.querySelector('#weeklyMetrics'); if(m) m.innerHTML=`<div class="metric"><b>2</b><span>本期重点</span></div><div class="metric"><b>2</b><span>本周新增事件</span></div><div class="metric"><b>1</b><span>Viatris高相关</span></div>`;
    const j=document.querySelector('#weeklyJudgements'); if(j) j.innerHTML=['产业政策开始同时考核原创性、全球商业化、制造供应和支付使用，创新不再只是审评端指标。','基层慢病机会从“目录扩容”进入“患者流+统一用药目录+处方优先+供应履约”四环节联动阶段。','中国创新药出海仍在加速，但美国拟议的生物技术对外投资审查意味着地缘政治风险会更多落到交易结构和技术边界，而非简单全面封堵。'].map(x=>`<div class="insight-item">${esc(x)}</div>`).join('');
    const v=document.querySelector('#weeklyValidation'); if(v) v.innerHTML=['10月底各省医疗机构完成基药目录更新后，络活喜/立普妥等成熟慢病SKU在基层实际配备率和供应覆盖是否提升。','十五五规划中的价格、支付、进院配套政策何时转成可量化执行指标。'].map(x=>`<div class="insight-item">${esc(x)}</div>`).join('');
  }
  document.addEventListener('radar:ready',render,{once:true});
})();