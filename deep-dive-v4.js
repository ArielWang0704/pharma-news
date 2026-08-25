(() => {
  const outer = document.getElementById('appFrame');
  const esc = s => String(s ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const clean = s => String(s || '').replace(/\s+/g,' ').trim();
  const arr = v => Array.isArray(v) ? v : [];
  const high = i => String(i.viatrisImpact || '').includes('高');
  const sec = (title, body, cls='') => `<div class="v4sec ${cls}"><h3>${esc(title)}</h3>${body}</div>`;
  const list = xs => `<ul>${arr(xs).filter(Boolean).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;

  function ctx(){
    try{
      const wrap = outer?.contentDocument;
      const f = wrap?.getElementById('radarFrame');
      if(!f?.contentWindow || !f?.contentDocument) return null;
      return {w:f.contentWindow,d:f.contentDocument};
    }catch(e){ return null; }
  }
  function data(w){ try{return w.eval('newsData')}catch(e){return[]} }
  function sentences(s){ return (clean(s).match(/[^。！？；]+[。！？；]?/g)||[]).map(clean).filter(Boolean); }
  function uniq(xs,n=6){
    const out=[];
    for(const x of xs){
      const t=clean(x); if(!t) continue;
      const k=t.replace(/[，。；：、\s]/g,'');
      if(out.some(y=>{const z=y.replace(/[，。；：、\s]/g,'');return z.includes(k)||k.includes(z)})) continue;
      out.push(t); if(out.length>=n) break;
    }
    return out;
  }
  function kind(i){
    const c=i.category||'', t=i.title||'';
    if(/Q[1-4]|H[12]|财报|业绩|半年报|年报/.test(t)) return 'finance';
    if(c.includes('政策')||c.includes('支付')) return 'policy';
    if(c.includes('BD')||c.includes('投融资')) return 'bd';
    if(c.includes('组织')||c.includes('大公司')||c.includes('战略')) return 'org';
    if(c.includes('器械')||c.includes('诊断')) return 'device';
    if(c.includes('数字')||c.includes('AI')) return 'digital';
    if(c.includes('渠道')||c.includes('患者')) return 'channel';
    if(c.includes('药品')||c.includes('创新药')) return 'drug';
    return 'general';
  }

  const custom = {
    'mnc-china-operating-model-reorganization-202608': {
      conclusion:'这不是三家MNC“同时重组”，而是三种不同动作共同反映一个趋势：跨国药企正在重新划分中国市场的渠道、资源和全球接口。',
      facts:[
        '诺和诺德：大中国区商业组织重新分层，医院、零售/线上健康管理/私立医疗、广阔市场被放进更清晰的不同业务场景。',
        '其中新兴渠道事业部把零售、线上医药健康管理和私立医疗放在一起，说明院外患者触达不再只是医院业务的附属渠道。',
        '商务与广阔市场事业部继续承担更广泛的商业覆盖，并把基层和基药扩容机会纳入资源考虑。',
        '勃林格殷格翰：提升大中华区在全球治理中的位置，同时计划在上海张江加强早期研发能力，核心是缩短中国洞察进入全球决策的链条。',
        '诺华：前中国区总裁、国际业务首席商务官张颖离任，首先影响的是国际商业管理连续性；是否改变中国战略仍需看继任与后续资源。'
      ],
      background:'三家公司业务模式并不相同。诺和诺德当前中国增长高度依赖糖尿病/肥胖等大规模患者市场，因此医院与院外获客、零售、线上健康管理的协同很关键；勃林格殷格翰更强调中国研发与全球创新体系连接；诺华此次则主要是关键高管变化。把三件事放在一张卡里，是为了观察MNC如何重新配置中国资源，而不是认为三家公司采取了同一种组织模式。',
      meaning:[
        '组织调整真正需要看的不是部门名称，而是客户归属是否重划：谁负责医院、谁负责零售/线上、谁负责广阔市场。',
        '第二层是预算、P&L、KPI和决策权是否跟着迁移；只有这些变化，才会真正改变一线行为。',
        '第三层是中国与全球总部的接口是否变短：中国市场洞察、研发和商业判断能否更快进入全球资源分配。'
      ],
      implication:'对管理层而言，这类调整的benchmark价值在于看“客户场景是否已经复杂到需要独立能力体系”。对一线而言，最直接的变化会体现在客户归属、协作边界、资源审批、覆盖频率和KPI，而不是组织图本身。',
      viatris:'高相关之处主要在诺和诺德的渠道拆分逻辑：成熟品牌同时覆盖医院、零售、线上和广阔市场时，是否仍适合按产品统一管理，还是需要按客户/渠道场景配置不同能力，是值得参考的问题。但这只是benchmark，不代表Viatris应复制其组织结构。'
    },
    'grassroots-drg-dip-drug-follows-disease-20260817': {
      conclusion:'“同病同付”真正改变的是医保给医院的结算激励；当基层更愿意接、患者更愿意去以后，“药随病走”才会进一步把基药、集采药和医保药带到基层。',
      facts:[
        '国家层面形成首批基层病种方向：DRG 31个病组、DIP 127个病种，重点选择路径清晰、基层有能力诊治、费用相对稳定的常见病、多发病和部分慢病。',
        '已披露方向涉及高血压、糖尿病、冠心病、呼吸系统感染等基层高频疾病。',
        '“同病同付”主要针对医保对医疗机构的病种支付逻辑，不等于患者在不同等级医院的报销比例完全相同，也不等于收费完全一样。',
        '国家卫健委同步提出“药随病走”“同病同药同治”，要求基层诊疗能力扩展后同步扩大药品配备，优先基药，并积极使用集采中选和医保目录药品。',
        '哈尔滨类似实践中，二级以下机构收治基层病组病例占比同比提升18.44%，次均费用下降6.83%，109家机构实现正向结余。',
        '哈尔滨还推动2744家基层医疗机构参加药品集采，社区卫生服务中心和乡镇卫生院常备药品扩容。'
      ],
      background:'过去分级诊疗容易卡在三个环节不同步：基层医院不一定愿意接简单病，患者不一定愿意下沉，患者下沉后基层也未必有长期使用的药。这次政策开始同时调整支付激励和药品供给。',
      mechanism:[
        '地方从推荐病种中选择本地基层真正有能力诊治的病种。',
        '医保弱化因医院等级不同带来的病种支付差异，使三级医院收治简单病例不再天然获得更高支付。',
        '基层若能以较低成本规范完成治疗，更容易形成合理结余，因此更愿意接诊。',
        '患者端再叠加基层起付线、报销比例、转诊等政策，增加去基层的经济动力。',
        '患者真正下沉后，基层必须有药可开，因此基药、集采中选药和医保药同步扩展。',
        '最终处方与续方场景会在医院、基层和零售之间重新分配。'
      ],
      example:'真实案例 + 示意理解：哈尔滨已经出现“基层收治占比上升、次均费用下降、基层机构参与集采增加”的组合变化。为了理解结算机制，可以假设某基层病组医保支付标准为5000元/例：如果基层3500元能规范完成治疗，就有合理结余；三级医院若同一简单病例成本更高但支付标准不再随等级明显抬高，就更愿意把资源留给复杂病例。这里5000/3500元仅为示意，不代表任何真实地区标准。',
      impact:[
        ['基层医疗机构','简单、标准化病种更有经济动力承接，同时必须补齐诊疗能力和药品目录。'],
        ['三级医院','简单病例的支付优势下降，更有动力把床位和医生资源留给复杂患者。'],
        ['患者','若当地再叠加基层更低起付线/更高报销等政策，慢病随访和续方更可能下沉。'],
        ['药企','新增基层患者不等于品牌自动受益，最终取决于基层具体采购分子、规格以及原研/集采仿制的可获得性。'],
        ['零售/商业','如果基层诊疗下沉但品牌药未被基层配备，部分续方需求可能转到零售，商业覆盖和终端库存变得更重要。']
      ],
      viatris:'对阿托伐他汀、氨氯地平等成熟慢病分子，真正要看四件事：患者是否下沉；基层新增哪些分子/SKU；同分子下原研和集采仿制能否同时获得；基层没有原研时需求是否转到院外零售。'
    }
  };

  function genericFacts(i){
    return uniq([...sentences(i.summary),...arr(i.updates).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,2).map(x=>x.text),...sentences(i.detail)],6);
  }
  function genericBackground(i,k){
    if(k==='policy') return '这类政策需要先区分“文件写了什么”和“地方/医院最终怎么执行”。真正影响业务的通常是结算规则、采购/配备、医生行为和患者自付如何变化。';
    if(k==='org') return '公司组织新闻应先理解该公司的业务结构、主要客户和增长场景，再判断这次调整改变了哪些资源与决策边界。';
    if(k==='finance') return '财报数字本身只是结果，理解它需要拆区域、产品组合、量价、汇率、库存和一次性因素。';
    if(k==='bd') return 'BD交易需要区分headline总金额和真正确定的经济价值。首付款、资产阶段、权益范围、开发责任和里程碑兑现条件更关键。';
    if(k==='drug') return '创新药/药品新闻需要放回疾病治疗路径中看：现有标准治疗是什么、目标患者是谁、产品解决了哪个未满足需求，以及准入和支付是否支持真实使用。';
    if(k==='device') return '器械/诊断的商业价值不仅取决于性能，还取决于它是否进入医院工作流、采购预算和收费路径。';
    if(k==='digital') return '数字医疗/AI最关键的是能否进入真实工作流并持续使用，而不只是技术演示或单次试点。';
    if(k==='channel') return '渠道新闻需要沿患者/处方从哪里产生、去哪里购药、谁负责配送和终端是否有库存来理解。';
    return i.detail || i.summary || '';
  }
  function genericCore(i,k){
    if(k==='policy') return sec('怎么落地 / 谁会被影响',`<p>${esc(i.why||i.role||'重点看地方执行、结算和采购规则如何改变医院、患者与企业行为。')}</p>`);
    if(k==='org') return sec('战略含义',`<p>${esc(i.why||'重点看客户归属、预算、P&L、KPI和决策权是否发生迁移。')}</p>`)+sec('对管理和一线执行的启发',`<p>${esc(i.role||'组织图只有在资源和一线行为改变时才有商业意义。')}</p>`);
    if(k==='finance') return sec('这组数字说明什么',`<p>${esc(i.why||'需要判断增长/下滑是结构性的还是由汇率、库存或一次性因素驱动。')}</p>`)+sec('分析时还要继续拆什么',`<p>${esc(i.role||'继续拆产品、区域、量价、库存和可持续性。')}</p>`);
    if(k==='bd') return sec('交易结构与质量怎么看',`<p>${esc(i.why||'重点看首付款、里程碑、权益范围、资产阶段和开发责任，而不是只看总交易金额。')}</p>`)+sec('双方为什么愿意做',`<p>${esc(i.role||'卖方用资产换资金和全球开发能力，买方用交易补管线和增长缺口。')}</p>`);
    if(k==='drug') return sec('临床 / 商业意义',`<p>${esc(i.why||'重点看相对现有治疗的差异、患者筛选、准入、支付和商业化瓶颈。')}</p>`)+sec('对药企意味着什么',`<p>${esc(i.role||'获批只是起点，真实用量取决于患者识别、医生采用、支付和供应。')}</p>`);
    if(k==='device') return sec('使用和商业化路径',`<p>${esc(i.why||'重点看医院工作流、采购、装机/耗材、收费和国产替代。')}</p>`);
    if(k==='digital') return sec('真正的落地点',`<p>${esc(i.why||'重点看系统集成、合规、ROI和持续使用率。')}</p>`);
    if(k==='channel') return sec('渠道如何传导到业务',`<p>${esc(i.why||'重点看需求、患者流、购药地点、商业覆盖和库存履约。')}</p>`);
    return sec('为什么重要',`<p>${esc(i.why||i.role||i.summary||'')}</p>`);
  }
  function customHtml(i,c){
    let html=sec('一句话先说结论',`<p class="lead">${esc(c.conclusion)}</p>`,'key');
    html+=sec('这条新闻具体发生了什么',list(c.facts));
    html+=sec(i.id==='mnc-china-operating-model-reorganization-202608'?'公司 / 业务背景':'政策背景',`<p>${esc(c.background)}</p>`);
    if(c.meaning) html+=sec('怎么理解这次变化',list(c.meaning));
    if(c.mechanism) html+=sec('具体怎么运作',`<div class="flow">${c.mechanism.map((x,n)=>`<div><span>${n+1}</span><p>${esc(x)}</p></div>`).join('')}</div>`);
    if(c.example) html+=sec('案例 / 示意理解',`<p>${esc(c.example)}</p>`,'example');
    if(c.impact) html+=sec('分别会影响谁',`<div class="stake">${c.impact.map(x=>`<div><b>${esc(x[0])}</b><p>${esc(x[1])}</p></div>`).join('')}</div>`);
    if(c.implication) html+=sec('对管理和一线执行的启发',`<p>${esc(c.implication)}</p>`);
    if(c.viatris) html+=sec('对Viatris的潜在影响',`<p>${esc(c.viatris)}</p>`,'vt');
    return html;
  }
  function genericHtml(i){
    const k=kind(i);
    const bgTitle={policy:'政策背景',org:'公司 / 业务背景',finance:'财报背景',bd:'交易背景',drug:'产品 / 疾病背景',device:'产品与使用场景背景',digital:'应用场景背景',channel:'渠道背景',general:'背景'}[k];
    let html=sec('一句话先说结论',`<p class="lead">${esc(i.why||i.summary||i.title)}</p>`,'key');
    html+=sec('这条新闻具体发生了什么',list(genericFacts(i)));
    html+=sec(bgTitle,`<p>${esc(genericBackground(i,k))}</p>`);
    html+=genericCore(i,k);
    if(high(i)) html+=sec('对Viatris的潜在影响',`<p>${esc(i.role||i.why||'需要结合具体产品、渠道和竞争格局进一步判断。')}</p>`,'vt');
    return html;
  }
  function timelineSources(i){
    let html='';
    if(arr(i.updates).length){
      html+='<h3 class="v4tail">事件进展</h3><div class="timeline">'+arr(i.updates).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(u=>`<div class="event"><div class="event-date">${esc(u.date)}</div><div class="event-body">${esc(u.text)}</div></div>`).join('')+'</div>';
    }
    if(arr(i.sources).length){
      html+='<h3 class="v4tail">来源</h3><div class="sources">'+arr(i.sources).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label||s.url)}</a>`).join('')+'</div>';
    }
    return html;
  }
  function style(d){
    if(d.getElementById('v4style'))return;
    const s=d.createElement('style');s.id='v4style';s.textContent=`
      .v4wrap{display:grid;gap:10px}.v4sec{border:1px solid #d8e0ea;border-radius:8px;padding:12px;background:#fbfcfe}.v4sec h3,.v4tail{margin:0 0 8px;color:#1f4e79;font-size:14px}.v4sec p{margin:0;line-height:1.7}.v4sec ul{margin:0;padding-left:20px;display:grid;gap:6px}.v4sec.key{border-left:4px solid #1f4e79;background:#f4f8fc}.v4sec.example{background:#fffaf0;border-color:#ead29b}.v4sec.vt{background:#fff8e8;border-color:#efcd8e}.flow{display:grid;gap:7px}.flow>div{display:grid;grid-template-columns:28px 1fr;gap:8px;align-items:start}.flow span{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#e7f0f8;color:#1f4e79;font-weight:700}.flow p{margin:1px 0 0}.stake{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.stake>div{border:1px solid #e3e8ef;border-radius:7px;padding:9px;background:white}.stake b{color:#1f4e79}.lead{font-weight:700;color:#173b5f}.v4tail{margin-top:12px}@media(max-width:760px){.stake{grid-template-columns:1fr}}`;
    d.head.appendChild(s);
  }
  function apply(d,items){
    style(d);
    const map=new Map(items.map(i=>[clean(i.title),i]));
    d.querySelectorAll('.card').forEach(card=>{
      const title=clean(card.querySelector('h2')?.textContent);const i=map.get(title);if(!i)return;
      const detail=card.querySelector('details');if(!detail)return;
      let body=detail.querySelector('.v4wrap');
      if(!body){
        [...detail.children].forEach(el=>{if(el.tagName!=='SUMMARY')el.remove()});
        body=d.createElement('div');body.className='v4wrap';detail.appendChild(body);
      }
      body.innerHTML=(custom[i.id]?customHtml(i,custom[i.id]):genericHtml(i))+timelineSources(i);
      const sm=detail.querySelector('summary');if(sm)sm.textContent='展开：新闻背景、具体变化和影响';
    });
  }
  let obs;
  function run(){
    const z=ctx();if(!z)return false;
    const ds=data(z.w);const listEl=z.d.getElementById('newsList');if(!ds.length||!listEl)return false;
    apply(z.d,ds);
    if(!obs){obs=new MutationObserver(()=>setTimeout(()=>apply(z.d,data(z.w)),0));obs.observe(listEl,{childList:true});}
    return true;
  }
  let n=0,t=setInterval(()=>{if(run()||++n>100)clearInterval(t)},120);
  outer?.addEventListener('load',()=>setTimeout(run,200));
})();