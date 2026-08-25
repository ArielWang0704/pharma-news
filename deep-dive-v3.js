(() => {
  const outer = document.getElementById('appFrame');
  const esc = s => String(s ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const arr = v => Array.isArray(v) ? v : [];
  const clean = s => String(s || '').replace(/\s+/g,' ').trim();
  const high = i => String(i.viatrisImpact || '').includes('高');
  const list = xs => `<ul>${arr(xs).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  const sec = (title, body, cls='') => `<div class="dd ${cls}"><h3>${esc(title)}</h3>${body}</div>`;

  function archiveCtx(){
    try {
      const wrapperDoc = outer?.contentDocument;
      const radarFrame = wrapperDoc?.getElementById('radarFrame');
      if (!radarFrame?.contentWindow || !radarFrame?.contentDocument) return null;
      return {w: radarFrame.contentWindow, d: radarFrame.contentDocument};
    } catch(e) { return null; }
  }

  function data(w){ try { return w.eval('newsData'); } catch(e) { return []; } }
  function sentences(s){ return (clean(s).match(/[^。！？；]+[。！？；]?/g)||[]).map(clean).filter(Boolean); }
  function uniq(xs,n=6){ const out=[]; for(const x of xs){ const t=clean(x); if(!t) continue; const k=t.replace(/[，。；：、\s]/g,''); if(out.some(y=>{const z=y.replace(/[，。；：、\s]/g,''); return z.includes(k)||k.includes(z)})) continue; out.push(t); if(out.length>=n) break; } return out; }

  function isGrass(i){ return i.id === 'grassroots-drg-dip-drug-follows-disease-20260817'; }

  function conclusion(i){
    if(isGrass(i)) return '“同病同付”不是简单把基层和三级医院的报销比例改成一样，而是医保改变“给医院怎么结账”的规则：简单、规范、费用稳定的病种在同一统筹区不再因为医院等级高就天然获得更高支付，基层因此更有动力接诊；患者下沉后，药品配备又通过“药随病走”、基药和集采同步下沉跟上。';
    return i.why || i.summary || i.title;
  }

  function facts(i){
    if(isGrass(i)) return [
      '国家层面初步形成首批基层病种推荐方向：DRG 31个病组、DIP 127个病种，主要选择临床路径清晰、基层具备诊疗能力、费用相对稳定的常见病、多发病和部分慢病。',
      'DRG基层病组筛选还设置了量化门槛：优先选择基层住院病例占比较高、三级与基层次均费用差较小的病组，并剔除复杂合并症/并发症病例。',
      '“同病同付”针对的是医保对医疗机构的病种支付逻辑，不等于患者在不同医院的报销比例完全相同，也不等于所有医院最终收费完全一样。',
      '国家卫健委同步要求随着基层诊疗能力扩大，按照“药随病走”“同病同药同治”扩大基层用药，优先配备基药，并积极使用集采中选和医保目录药品。',
      '哈尔滨已开展类似实践：筛选34个适宜基层的常见病病组，取消不同等级医疗机构付费差异系数；二级以下机构收治基层病组病例占比同比提升18.44%，次均费用下降6.83%，109家机构实现正向结余。',
      '哈尔滨同时推动2744家基层医疗机构参加药品集采；125家社区卫生服务中心、185家乡镇卫生院医保常备药品均达350种以上，慢病常用药、急救药综合配备覆盖率超过95%。'
    ];
    return uniq([...sentences(i.summary), ...arr(i.updates).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,2).map(x=>x.text), ...sentences(i.detail)], 6);
  }

  function background(i){
    if(isGrass(i)) return '过去分级诊疗一直有一个现实断点：患者是否愿意下沉、基层医院是否愿意接、基层有没有患者长期使用的药，三件事经常不同步。即使基层“理论上能看”，如果医保支付给大医院更有利、患者基层报销优势不明显、基层药又不全，患者仍会继续往大医院跑。这次政策的价值在于把支付激励、基层能力和药品供给放在同一条链上。';
    const c=i.category||'';
    if(c.includes('政策')||c.includes('支付')) return '政策文件只是起点，真正落地通常要经过地方细则、医保/医院结算、采购与配备、医生行为、患者自付和购药路径几个环节。看政策不能只看“写了什么”，还要看谁因此改变行为。';
    if(c.includes('BD')||c.includes('投融资')) return 'BD交易不能只看headline总金额。首付款、里程碑、版税、权益范围、资产阶段和后续开发责任，决定交易到底有多确定、买卖双方为什么愿意做。';
    if(c.includes('组织')||c.includes('战略')||c.includes('大公司')) return '组织调整真正重要的不是部门改名，而是客户归属、P&L、预算、KPI和决策权往哪里迁移。只有这些变化，才会改变一线覆盖和资源配置。';
    if(c.includes('药品')||c.includes('创新药')) return '获批或临床阳性只是商业化起点。患者识别、检测、医院准入、支付、竞品差异和供应能力共同决定最后能不能变成真实用量。';
    if(c.includes('器械')||c.includes('诊断')) return '器械/诊断除了产品性能，还取决于医院工作流、采购预算、装机/耗材模式、收费项目和国产替代。';
    if(c.includes('AI')||c.includes('数字')) return '数字医疗要区分“技术看起来能用”和“真实工作流愿意持续用”。系统集成、合规、ROI和使用率比单次演示更重要。';
    return i.detail || i.summary || '';
  }

  function mechanism(i){
    if(isGrass(i)) return [
      '第一步：各统筹地区从国家推荐中挑出本地基层真正有能力诊治的病种，并结合设备、医生能力和本地疾病谱动态调整。',
      '第二步：对这些基层病种，医保弱化或取消因医院等级不同带来的支付差异。简单病在三级医院治疗，不再天然获得更高病种支付。',
      '第三步：基层如果能按规范、较低成本完成治疗，就更容易形成合理结余，因此“愿意接”；三级医院收治简单病例的收益空间缩小，更愿意把资源留给复杂病例。',
      '第四步：患者端通常还会叠加基层起付线更低、报销比例更高、转诊优惠等政策，使患者“愿意去”。这与同病同付是两套机制，但方向一致。',
      '第五步：患者真正下沉以后，基层必须有药可开，因此“药随病走”要求药品目录随诊疗能力扩展，基药、集采中选药和医保药同步进入基层。',
      '第六步：处方和续方场景从大医院向基层、零售重新分配，最终改变分子、品牌、商业配送和终端库存结构。'
    ];
    const t=`${i.title} ${i.summary} ${i.detail}`, c=i.category||'';
    if(t.includes('基本药物')||t.includes('基药')) return ['进入基药目录 → 获得优先配备信号','地方/医院形成具体分子、剂型、规格清单','患者和处方进入基层 → 目录资格转成真实用量','集采价格与供应影响品牌选择','配送、缺药和院外续方决定最终可及'];
    if(t.includes('集采')||t.includes('带量采购')) return ['医疗机构报量 → 形成约定采购需求','竞价与规则筛选 → 确定中选企业和价格','地方执行 → 医院采购向中选品种切换','未中选/参比制剂更多转向差异化或院外','中选价进一步影响零售、电商和其他渠道价格'];
    if(c.includes('BD')||c.includes('投融资')) return ['签约支付首付款 → 买方取得约定权益','临床/注册达标 → 触发开发里程碑','上市销售 → 触发商业里程碑/版税','卖方获得资金与全球开发杠杆，买方补管线','最终价值取决于兑现率而非headline总额'];
    if(c.includes('组织')||c.includes('战略')||c.includes('大公司')) return ['战略优先级改变 → 重划客户/产品/区域','团队和P&L归属变化 → KPI和预算改变','一线覆盖和跨部门协作改变','商业执行方式改变','最终在收入、份额或费用效率体现'];
    if(c.includes('药品')||c.includes('创新药')) return ['临床/获批 → 明确可进入的患者场景','检测/筛选 → 找到适用人群','医院准入和支付 → 决定能否开出','与标准治疗比较 → 决定医生采用','供应、教育和随访 → 决定持续用量'];
    if(c.includes('器械')||c.includes('诊断')) return ['获批/性能认可 → 进入医院评估','科室确认工作流价值 → 采购/收费','装机或试剂耗材采购 → 形成收入','检测量/使用频率 → 决定复购','集采、收费和国产替代 → 影响份额和价格'];
    if(c.includes('AI')||c.includes('数字')) return ['技术进入真实工作流','证明节省时间/提高质量','接入HIS/EMR/随访系统','满足数据和合规要求','用真实使用率和ROI决定续购'];
    return ['事件改变规则或资源','相关主体调整行为','患者/客户路径变化','传导到产品、价格、渠道或供应','最终在销量、份额或效率上体现'];
  }

  function example(i){
    if(isGrass(i)) return {
      real: '真实案例｜哈尔滨：当地筛选34个适宜基层的常见病病组，取消不同等级医疗机构付费差异系数。结果是二级以下机构收治基层病组病例占比同比提升18.44%，次均费用下降6.83%，109家机构实现正向结余。与此同时，2744家基层医疗机构参与药品集采，基层常备药扩容，说明“患者下沉”和“药品下沉”是在一起推进。',
      demo: '示意例子｜假设某统筹区把一个适宜基层的简单病组支付标准定为5000元/例。基层若3500元可以规范治好，5000元支付标准下有合理结余，更愿意接诊；三级医院若因为床位、检查、人力成本更高，治疗同样病例要5500元，但也只能按类似病种标准结算，就更愿意把资源留给复杂病例。这里的5000/3500/5500元只是帮助理解机制的示意数字，不代表任何真实地区标准。'
    };
    const t=`${i.title} ${i.summary} ${i.detail}`, c=i.category||'';
    if(t.includes('基本药物')||t.includes('基药')) return {demo:'示意例子：一名长期服用降压药的患者，以前每三个月去大医院续方。基层扩大高血压管理后，社区开始配备相关基药和集采品种，患者可能改在社区拿药。此时品牌份额取决于社区到底配哪个分子、规格，以及原研和集采仿制是否都能买到。'};
    if(t.includes('集采')||t.includes('带量采购')) return {demo:'示意例子：某医院过去一年使用某分子10万盒，集采执行后大部分约定量优先向中选企业采购，中选品牌院内份额会迅速提高；未中选原研若仍有患者偏好，可能更多转向自费或院外零售。10万盒仅为示意。'};
    if(t.includes('Viatris')&&(t.includes('Q2')||t.includes('增长'))) return {demo:'示意例子：财报中的reported +21%和operational +16%不是同一概念。可以理解为账面收入增长21%，剔除汇率等因素后业务自身约增长16%；判断真实动能应优先看operational，再继续拆品牌、渠道、量价和库存。'};
    if(c.includes('BD')||c.includes('投融资')) return {demo:'示意例子：一笔“最高20亿美元”的授权，不代表卖方今天拿到20亿美元。可能只有1亿美元首付款，剩余金额要等临床、获批和销售节点后兑现，所以首付款、资产阶段和开发责任往往比headline更重要。'};
    if(c.includes('组织')||c.includes('战略')||c.includes('大公司')) return {demo:'示意例子：如果公司把零售、线上健康管理、私立医疗从原团队中拆成独立事业部，变化的不只是部门名；客户归属、预算、KPI、数据口径和一线覆盖方式都会一起迁移，说明公司把院外场景提升为独立增长引擎。'};
    if(c.includes('药品')||c.includes('创新药')) return {demo:'示意例子：一个新靶向药临床数据很好，但若患者必须先做特定检测、医院没有检测能力、药又未进入医保，“获批”也不会立刻变成销量。商业化要走完患者识别 → 检测 → 医院准入 → 支付 → 持续用药。'};
    if(c.includes('器械')||c.includes('诊断')) return {demo:'示意例子：医院认可某IVD设备性能后，还要完成采购/投放、收费和科室流程；真正决定商业价值的是每天多少标本、耗材复购频率以及收费/医保能否覆盖。'};
    if(c.includes('AI')||c.includes('数字')) return {demo:'示意例子：AI能把病历摘要从10分钟降到2分钟，但如果不能接入EMR、医生仍要手工复制粘贴，就很难规模化。真正价值是“直接进入工作流 + 明确ROI + 合规可用”。'};
    return {demo:'示意例子：继续追问谁会因此改变行为、为什么改变、患者/客户会流向哪里，以及最终在哪个产品、渠道或财务指标上看到结果。'};
  }

  function beforeAfter(i){
    if(isGrass(i)) return ['以前：即使基层能治简单病，医院支付、患者报销、药品配备可能各自为政；患者仍习惯去大医院，基层也不一定愿意接。','现在：先用基层病种和同病同付改变医院收治激励，再叠加基层待遇倾斜和“药随病走”，让病人、钱和药尽量同时向基层移动。'];
    const t=`${i.title} ${i.summary}`, c=i.category||'';
    if(t.includes('基药')||t.includes('基本药物')) return ['以前：容易只关注“某药有没有进入基药目录”。','现在：要继续看地方配备、基层患者流、集采竞争、供货和院外续方，目录只是起点。'];
    if(t.includes('集采')) return ['以前：院内品牌份额更多受历史使用、医生偏好和招采影响。','现在：中选资格、约定量和中选价显著重塑院内份额，未中选品牌更多转向差异化或院外。'];
    if(c.includes('BD')||c.includes('投融资')) return ['以前：资产价值和开发风险主要留在自研公司内部。','现在：通过授权把资金、全球临床和商业化能力组合，价值由首付款、里程碑、版税和权益保留共同分配。'];
    if(c.includes('组织')||c.includes('战略')||c.includes('大公司')) return ['以前：资源沿原有产品线/区域/职能边界分配。','现在：组织重划客户、渠道或区域，说明新的增长场景被提升到独立管理优先级。'];
    return ['以前：行业按原有规则、资源和客户路径运行。','现在：这条事件改变了其中一个关键约束，需要观察相关主体是否真的改变行为。'];
  }

  function stakeholders(i){
    if(isGrass(i)) return [
      ['患者','简单病、稳定慢病更有可能在基层完成诊疗和续方；如果同时叠加基层起付线更低、报销比例更高，患者经济上也更愿意下沉。'],
      ['基层医院','同病同付削弱等级差异带来的支付劣势，规范治疗简单病种更容易形成合理结余；但前提是设备、人员和质量控制真正跟得上。'],
      ['三级医院','简单病例支付优势下降，更有动力把床位和资源留给复杂病例，而不是靠常见病扩大服务量。'],
      ['药企','基层新增患者并不等于原研品牌新增销量；基药和集采中选药的制度性配备可能让仿制药先拿到新增量。'],
      ['商业/零售','需求从少数大医院变成更多基层终端和院外续方点，配送覆盖、断供、库存和患者找药路径会变得更重要。']
    ];
    const c=i.category||'';
    if(c.includes('政策')||c.includes('支付')) return [['患者','就医层级、自付、购药地点和品牌选择可能改变。'],['医院/医生','结算和采购约束变化后，会重新权衡收治和用药。'],['药企','要同时看准入、价格、渠道、供应和患者承接。'],['商业/零售','患者流和处方外流会改变终端需求分布。']];
    if(c.includes('BD')||c.includes('投融资')) return [['卖方','获得现金和全球开发资源，同时让渡部分权益。'],['买方','用资本换管线增长并承担后续失败风险。'],['研发团队','全球临床和项目优先级可能改变。'],['投资者','应关注首付款和资产质量，而非只看总金额。']];
    if(c.includes('组织')||c.includes('战略')||c.includes('大公司')) return [['一线团队','客户归属、汇报线、KPI和覆盖方式可能改变。'],['职能团队','预算和资源向新优先级迁移。'],['管理层','组织边界要明确谁对结果负责。'],['合作伙伴/渠道','对接窗口和决策链可能变化。']];
    if(c.includes('药品')||c.includes('创新药')) return [['患者','获得新选择，但可及取决于检测、准入和支付。'],['医生','判断相对标准治疗的真实增益和适用人群。'],['药企','临床成功后还要解决准入、支付、教育和供应。'],['支付方','衡量临床价值和预算影响。']];
    return [['患者/客户','选择和行为路径可能改变。'],['企业','需要调整资源、产品或渠道策略。'],['渠道/合作方','需求和履约方式可能变化。'],['管理层','要用后续数据判断是否为结构性变化。']];
  }

  function industry(i){
    if(isGrass(i)) return '这会把慢病和常见病竞争从“谁在三级医院有更强品牌/专家影响力”，进一步推向“谁能在基层以合适价格被配备、稳定供货、让患者持续拿得到”。基层场景更重价格、标准化采购和供应，因此集采仿制药可能先获得制度性优势；原研成熟品牌若要保留份额，需要证明患者黏性、医生信任、差异化价值和院外可及能够抵消价格差。';
    return i.why || '重点看这件事是否改变竞争规则、利润池、患者流、渠道结构或资源配置。';
  }

  function implication(i){
    if(isGrass(i)) return '分析这条政策时，不能只问“基层市场有多大”，而要一层层验证：患者有没有真的下沉 → 基层是否能治 → 医保支付有没有激励 → 对应分子/SKU有没有配 → 谁在配送 → 有没有库存 → 患者最后在哪续方。准入、商务、销售、供应和财务看到的其实是同一条链上的不同环节。';
    return i.role || '把新闻转成工作判断时，应继续问：哪个主体会改变行为、哪项指标能看到变化、公司因此应做什么不同的决策。';
  }

  function viatris(i){
    if(isGrass(i)) return '对Viatris最关键的不是笼统判断“基层下沉是利好还是利空”，而是具体看阿托伐他汀、氨氯地平等相关分子：①患者真的从大医院下沉了吗；②基层新增哪些分子、剂型和规格；③同一分子里原研和集采仿制是否都能进；④如果基层只配集采仿制，仍偏好原研的患者会不会转去零售；⑤零售和基层需求更分散后，经销商覆盖和库存能不能承接。';
    return '这条事件被标记为Viatris高相关，需要进一步落到具体产品、分子、渠道和终端：哪些患者/客户行为会变、需求流向哪里、供应和商业覆盖能否承接。';
  }

  function validation(i){
    if(isGrass(i)) return ['DRG 31组和DIP 127个基层病种正式名单及各地实际采用范围','各统筹区是否真的取消/弱化基层病种等级差异系数，以及支付标准如何设定','高血压、冠心病、糖尿病等患者基层就诊和续方占比是否上升','基层阿托伐他汀、氨氯地平等相关分子/SKU配备率、断供率和采购结构','基层新增用量中原研与集采仿制的份额变化','患者拿不到原研时是否流向零售、电商或其他院外终端','商业公司对更分散基层终端的覆盖、库存和履约能力'];
    return arr(i.watch).length ? i.watch : ['是否出台进一步执行细则','患者/客户行为是否改变','销量、份额、价格、渠道或供应是否出现对应变化'];
  }

  function addCss(d){
    if(d.getElementById('dd-v3-style')) return;
    const s=d.createElement('style'); s.id='dd-v3-style';
    s.textContent='.ddw{display:grid;gap:12px}.dd{border:1px solid var(--line);border-radius:8px;padding:12px;background:#fbfcfe}.dd h3{margin:0 0 8px;color:var(--primary);font-size:14px}.dd p{margin:0;color:#344054;font-size:13px;line-height:1.75}.dd ul{margin:0;padding-left:20px;color:#344054;font-size:13px;line-height:1.75;display:grid;gap:5px}.dd.key{background:#f3f7fb;border-left:4px solid var(--primary)}.dd .lead{font-size:14px;font-weight:600;color:#203a57}.flow{display:grid;gap:7px}.flow>div{display:grid;grid-template-columns:24px 1fr;gap:8px}.flow span{display:flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--primary-soft);color:var(--primary);font-size:11px;font-weight:700}.example{background:#fffaf0;border-color:#ead7ad}.example h3{color:#8a5a12}.two,.stake{display:grid;grid-template-columns:1fr 1fr;gap:10px}.two>div,.stake>div{border:1px solid #e4e9f0;border-radius:7px;padding:10px;background:#fff}.two b,.stake b{display:block;margin-bottom:5px;color:var(--primary);font-size:12px}.vt{background:#fff8e8;border-color:#e7c87a}@media(max-width:650px){.two,.stake{grid-template-columns:1fr}}';
    d.head.appendChild(s);
  }

  function renderDetails(i,w){
    let fd=x=>x; try{fd=w.eval('formatDate')}catch(e){}
    const ex=example(i), ba=beforeAfter(i), st=stakeholders(i), ups=arr(i.updates).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    const exampleHtml = `${ex.real?`<p><b>真实落地：</b>${esc(ex.real.replace(/^真实案例｜[^：]*：?/,'') )}</p>`:''}${ex.demo?`<p style="margin-top:${ex.real?'8px':'0'}"><b>${ex.real?'示意理解：':'示意例子：'}</b>${esc(ex.demo.replace(/^示意例子[｜：]?/,'') )}</p>`:''}`;
    return `<summary>展开：具体怎么落地、举例、谁受影响和后续验证</summary><div class="ddw">
      ${sec('一句话先说结论',`<p class="lead">${esc(conclusion(i))}</p>`,'key')}
      ${sec('1. 这条新闻具体发生了什么',list(facts(i)))}
      ${sec('2. 背景：为什么以前没这么容易落地',`<p>${esc(background(i))}</p>`)}
      ${sec('3. 规则 / 商业逻辑到底怎么运作',`<div class="flow">${mechanism(i).map((x,n)=>`<div><span>${n+1}</span><p>${esc(x)}</p></div>`).join('')}</div>`)}
      ${sec('4. 举个例子，帮助理解',exampleHtml,'example')}
      ${sec('5. 以前 vs 现在',`<div class="two"><div><b>以前</b><p>${esc(ba[0])}</p></div><div><b>现在</b><p>${esc(ba[1])}</p></div></div>`)}
      ${sec('6. 谁会受到什么影响',`<div class="stake">${st.map(x=>`<div><b>${esc(x[0])}</b><p>${esc(x[1])}</p></div>`).join('')}</div>`)}
      ${sec('7. 对行业格局意味着什么',`<p>${esc(industry(i))}</p>`)}
      ${sec('8. 对药企 / 岗位意味着什么',`<p>${esc(implication(i))}</p>`)}
      ${high(i)?sec('9. 对Viatris的潜在影响',`<p>${esc(viatris(i))}</p>`,'vt'):''}
      ${sec(high(i)?'10. 下一步看什么才能验证判断':'9. 下一步看什么才能验证判断',list(validation(i)))}
      ${sec('事件进展',ups.length?`<div class="timeline">${ups.map(u=>`<div class="event"><div class="event-date">${esc(fd(u.date))}</div><div class="event-body">${esc(u.text)}</div></div>`).join('')}</div>`:'<p>暂无后续进展记录。</p>')}
      ${sec('可靠来源',arr(i.sources).length?`<div class="sources">${i.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join(' · ')}</div>`:'<p>暂无来源链接。</p>')}
    </div>`;
  }

  let observer=null;
  function apply(){
    const z=archiveCtx(); if(!z) return false;
    const ds=data(z.w); if(!ds.length) return false;
    const listEl=z.d.getElementById('newsList'); if(!listEl) return false;
    addCss(z.d);
    const map=new Map(ds.map(x=>[clean(x.title),x]));
    listEl.querySelectorAll('.card').forEach(card=>{
      const item=map.get(clean(card.querySelector('h2')?.textContent));
      const det=card.querySelector('details');
      if(item&&det) det.innerHTML=renderDetails(item,z.w);
    });
    if(!observer){ observer=new MutationObserver(()=>setTimeout(apply,0)); observer.observe(listEl,{childList:true}); }
    return true;
  }

  let tries=0;
  const timer=setInterval(()=>{ if(apply() || ++tries>100) clearInterval(timer); },120);
  outer?.addEventListener('load',()=>setTimeout(apply,250));
})();