(() => {
  'use strict';
  const nativeFetch = window.fetch.bind(window);

  window.fetch = async function(input, init){
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    const res = await nativeFetch(input, init);
    if(!url.includes('radar-catchup-202609.js')) return res;
    try{
      const [baseText, weeklyRes] = await Promise.all([
        res.text(),
        nativeFetch(`radar-weekly-20260921.js?v=${Date.now()}`, {cache:'no-store'})
      ]);
      if(!weeklyRes.ok) return new Response(baseText,{status:res.status,statusText:res.statusText,headers:res.headers});
      const weeklyText = await weeklyRes.text();
      const merged = baseText + '\n' + weeklyText.replace('const newEvents =','const weeklyEvents =');
      const injected = merged
        .replace(/const newEvents\s*=\s*\[/, 'const newEvents = [')
        .replace(/\nconst weeklyEvents\s*=\s*\[/, '\nconst weeklyEvents = [');
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
      title:'十部门发布医药工业“十五五”规划：真正的变化不是“创新药20%”，而是产业目标从数量扩张转向原创、全球化与全链条兑现',
      summary:'到2030年，规模以上医药工业企业营业收入目标超过3.5万亿元，创新药产业规模年均增速20%以上，首创新药（FIC）占全球比例25%以上，全球年销售额超10亿美元品种达到5个以上，创新医疗器械上市数量达到200个以上。',
      category:'政策/支付',
      viatris:true,
      why:'这次规划同时由工信、发改、卫健、医保、药监等十部门联合发布，说明它不只是研发或产业政策，而是把原创创新、制造、临床转化、支付使用、供应保障和国际化放进一套目标体系。尤其值得注意的是，规划一边要求FIC和全球重磅品种，一边又明确“专利过期药物高效替代”、通用名药和生物类似药推广，这意味着未来五年创新药与成熟药的政策方向会同时更加清晰。',
      detail: `
        <div class="reader-detail research-detail">
          <section class="reader-section reader-news">
            <span class="research-kicker">INDUSTRY POLICY / 15TH FIVE-YEAR PLAN</span>
            <h4>先把这份规划放回“十四五”背景里：问题已经从“有没有创新”变成“创新质量够不够高、能不能真正产业化和全球变现”</h4>
            <p>“十四五”期间，中国医药工业已经完成了一个明显的量级跃迁：工信部披露，规模以上医药工业增加值年均增长4.1%，230款创新药和292款创新医疗器械上市，在研新药数量跃居全球前列。换句话说，过去五年“有没有创新产品、有没有管线”已经不再是最主要的问题。</p>
            <p>因此“十五五”把指标明显往前推了一层：到2030年，首创新药（FIC）占全球比例达到25%以上，创新药产业规模年均增长20%以上，医药上市公司平均研发投入强度年均达到10%以上，全球年销售额超过10亿美元的中国品种达到5个以上。这里最重要的不是某一个数字，而是评价体系从“国内获批数量”转向了“原创性 + 全球商业价值 + 工业化能力”。</p>
            <p>21世纪经济报道采访的多位专家也把这一点说得很清楚：国内创新药管线数量已经很大，但全球首创新靶点、全新机制仍偏少；同时，中国企业的全球多中心临床、海外注册、国际商业化渠道和全球学术品牌能力仍弱于资产授权能力。也就是说，过去几年最强的是“把中国资产卖给全球”，未来五年政策希望看到的是“真正做出全球产品和全球公司”。</p>
          </section>

          <section class="reader-section">
            <h4>这次真正的结构变化：研发、制造、支付和国际化不再是四条平行线，而是被要求接成一条产业闭环</h4>
            <div class="research-chain"><span>原创发现</span><i>→</i><span>临床转化</span><i>→</i><span>规模制造</span><i>→</i><span>价格/支付/进院</span><i>→</i><span>全球注册与商业化</span><i>→</i><span>形成全球销售</span></div>
            <p style="margin-top:12px">这也是为什么十部门共同发布比单一部门发文更值得看。规划不仅写研发指标，还要求打通临床转化、中试放大、关键原料与高端设备、AI制药、价格支付使用、重点药品供应、国际注册和海外商业体系。它实际上是在承认：创新药“获批”只是中间节点，只有产品进入真实使用、形成收入，并能在全球市场持续销售，研发价值才真正闭环。</p>
            <p>对行业来说，这会逐渐改变资源配置。单纯堆管线数量、追热门靶点的价值会下降；具备CMC放大、全球临床、供应链和商业化能力的平台型公司，重要性会上升。对大型药企而言，未来的竞争也不只是研发部门之间的竞争，而是研发、制造、准入、商业和全球BD能否形成一个系统。</p>
          </section>

          <section class="reader-section">
            <h4>一个容易被忽略的部分：规划对成熟药并不“友好保护”，而是明确推动专利过期药高效替代</h4>
            <p>规划明确提出“实施专利过期药物高效替代行动”，推进通用名药和生物类似药系统开发与推广应用，同时支持新剂型、新工艺快速迭代。这个方向与创新药支持并不矛盾：政策希望创新药提高原创和全球价值，同时希望成熟领域继续通过仿制替代、工艺升级和制造效率释放资源。</p>
            <p>这意味着成熟原研品牌未来五年的竞争环境不会因为“创新药政策利好”而变宽松。相反，专利后市场更可能继续面临替代、价格和渠道效率压力。品牌价值仍然存在，但需要越来越多地靠长期循证、患者信任、剂型/规格差异、稳定供应、基层和零售可及，而不是靠历史品牌溢价本身。</p>
            <p>同时，规划又提出支持零售药店扩展专业服务和健康促进功能、强化重点药品生产供应监测，并要求继续完善价格、支付和使用政策。对成熟慢病产品来说，真正值得看的不是一句“原研会不会被替代”，而是院内份额下降后，零售、基层、慢病管理和稳定供应能不能形成新的价值承接。</p>
          </section>

          <section class="reader-section">
            <h4>行业怎么看：最乐观的解读是“中国药企进入全球创新2.0”；最现实的约束则是FIC和全球销售不能靠政策指标自动生成</h4>
            <div class="reader-pair">
              <div class="reader-piece"><h5>乐观的一面</h5><p>政策把FIC、全球10亿美元品种、研发强度和国际化能力量化，确实会进一步把资本、人才和政策资源推向真正原创的平台、全球临床和工业化能力。中国创新药已经有资产输出基础，下一步向共同开发、海外研发中心、全球商业化升级具备现实土壤。</p></div>
              <div class="reader-piece"><h5>不能忽略的边界</h5><p>FIC占比和全球重磅品种都是2030年的产业预期，并不是企业收入承诺。全球10亿美元销售尤其需要海外注册、市场准入、商业团队、供应能力和品牌建设，这些恰恰是目前中国药企相对薄弱的环节。headline式license-out金额也不能直接等同于全球销售能力。</p></div>
            </div>
            <div class="research-callout"><b>更值得跟踪的不是KPI本身：</b>接下来真正会改变企业行为的，是审评审批、创新药进院、医保/商保支付、全球临床和海外商业化支持如何被转成具体政策工具。如果这些配套没有同步落地，FIC和全球销售目标更像方向性约束，而不是经营结果。</div>
          </section>

          <section class="reader-section">
            <h4>对Viatris意味着什么：这份规划同时强化了两股相反但都重要的力量</h4>
            <p>一边是“专利过期药高效替代”和通用名药推广，对成熟原研品牌构成持续压力；另一边是基层、零售、稳定供应和专业服务的重要性继续上升，为成熟慢病品牌保留了新的竞争维度。</p>
            <p>因此对Viatris更有用的不是笼统判断“政策利好/利空”，而是把成熟品牌拆成几个问题：哪些分子会更快被仿制替代；哪些SKU仍有真实临床或患者偏好；哪些产品的增长空间更多来自基层/零售而非院内；供应稳定、价格差和终端覆盖能否形成可验证优势。对于立普妥、络活喜等核心成熟慢病品牌，未来的防守逻辑会越来越像“品牌价值 + 可及 + 供应 + 渠道效率”的组合，而不是单一品牌力。</p>
          </section>

          <div class="detail-meta">
            <details class="meta-details">
              <summary>来源与延伸阅读 <span>5</span></summary>
              <div class="meta-body">
                <a class="source-link" href="https://www.miit.gov.cn/jgsj/xfpgys/yy/art/2026/art_f18b30d0f5fd4635b6544c6d13097b98.html" target="_blank" rel="noopener">官方｜工信部《医药工业发展“十五五”规划》解读 ↗</a>
                <a class="source-link" href="https://www.cnpharm.com/c/2026-09-18/1107274.shtml" target="_blank" rel="noopener">官方转载｜规划全文与十项指标 ↗</a>
                <a class="source-link" href="https://m.21jingji.com/article/20260919/c8324354c202a32ff8dd813e3bebddc6.html" target="_blank" rel="noopener">行业媒体｜21世纪经济报道：原创突围、全球化能力与产业链短板 ↗</a>
                <a class="source-link" href="https://www.eeo.com.cn/2026/0918/1041672.shtml" target="_blank" rel="noopener">财经媒体｜经济观察报：FIC与全球重磅品种目标 ↗</a>
                <a class="source-link" href="https://fgw.wuhai.gov.cn/fgw/507589/rdgz13/2483352/index.html" target="_blank" rel="noopener">政策全文转载｜专利过期药高效替代、AI与供应链任务 ↗</a>
              </div>
            </details>
          </div>
        </div>
      `
    },

    {
      date:'2026.09.17',
      title:'DRG/DIP 3.0进一步落到慢病：真正值得看的是“同病同付 + 基药目录更新 + 特例单议”如何同时改变医院和药品需求',
      summary:'国家医保局进一步解释DRG/DIP 3.0：首批31个DRG基层内科病组覆盖高血压等常见慢病，同一统筹区内基层病种在不同等级医疗机构执行相同支付标准；复杂病例可通过特例单议降低医院因超支而限制治疗选择的顾虑。',
      category:'政策/支付',
      viatris:true,
      why:'这不是单独一条“患者下沉”政策。9月以来，支付端的基层同病同付、供应端的新版基药目录、医院端的HIS和用药目录更新开始在时间上重叠。真正的商业含义要看这三层能否同时落地：医院愿不愿接、患者会不会下沉、基层有没有对应SKU且能持续供货。',
      detail: `
        <div class="reader-detail research-detail">
          <section class="reader-section reader-news">
            <span class="research-kicker">DRG/DIP 3.0 / GRASSROOTS / ESSENTIAL MEDICINES</span>
            <h4>先把几个容易混在一起的政策拆开：“同病同付”改的是医保给医院怎么结算，不等于患者报销比例相同，也不等于基药政策本身</h4>
            <p>DRG/DIP 3.0首次在国家分组方案里明确基层病种。医保局9月17日进一步解释：首批DRG基层内科病组共31个，覆盖高血压等基层高频病种；同一统筹区内，同一基层病种在不同等级医疗机构执行相同的医保支付标准，目的是减少高等级医院在简单病例上天然获得更高支付的优势，引导二级及以下机构承接常见病、多发病。</p>
            <p>这里的“同付”是医保基金与医疗机构之间的支付标准，不是患者在社区和三甲的个人报销比例完全一样；患者端的起付线和报销比例仍由地方医保政策决定。它也不是基药政策：基药解决的是“基层应该优先配什么药”，DRG/DIP解决的是“医院收治什么病时医保怎么付钱”。两者只是现在开始出现更强联动。</p>
          </section>

          <section class="reader-section">
            <h4>为什么医院行为会变：标准病例与复杂病例开始被分开处理</h4>
            <div class="research-chain"><span>简单常见病统一支付</span><i>→</i><span>三级医院留简单病例的支付优势下降</span><i>→</i><span>基层收治动力提高</span><i>→</i><span>复杂病例通过特例单议兜底</span></div>
            <p style="margin-top:12px">对标准、资源消耗稳定的高血压等基层病种，“同病同付”弱化医院等级差异；对难治性高血压、极高危血脂异常、多病共存老年人等高成本复杂病例，3.0版又通过特例单议、精准分组等机制给医院留出超出标准支付的兜底空间。这个设计很关键：如果只做统一支付，医院可能更倾向压低成本；增加复杂病例例外机制后，政策希望在“控标准病例成本”和“不给复杂治疗设天花板”之间找平衡。</p>
            <p>券商对3.0版的典型解读也是这个方向：分组更细、特例单议和创新技术单独分组，会让医保资金更贴近真实资源消耗，并改善部分创新药械的支付环境。但这不意味着医院不再控费——标准病例里，医院依然有动力选择成本更可控、路径更成熟的药品和服务。</p>
          </section>

          <section class="reader-section">
            <h4>这周真正新增的信息，是支付端和药品目录端开始在同一个落地窗口发生变化</h4>
            <p>新版国家基本药物目录已经从9月1日起实施。辽宁9月16日明确要求，全省各级公立医疗机构在10月底前完成HIS系统基本药物属性标识和本机构用药供应目录更新，优先配备使用基本药物，并逐步形成以基药为主导的“1+X”用药模式。也就是说，“患者是否下沉”和“下沉后能开什么药”第一次在非常接近的时间窗口同时变化。</p>
            <p>这就是为什么不能只看DRG/DIP。支付改变患者和医院流向，但如果基层药房没有对应SKU、商业配送不到、库存不稳定，患者仍然可能回到大医院或转向零售；反过来，如果基层目录快速更新且供货稳定，慢病续方和长期用药才可能真正迁移。</p>
            <div class="research-chain"><span>支付规则</span><i>→</i><span>患者/医院流向</span><i>→</i><span>基层目录</span><i>→</i><span>商业配送</span><i>→</i><span>持续库存</span><i>→</i><span>处方与复购</span></div>
          </section>

          <section class="reader-section">
            <h4>行业真正有争议的地方：基层增量会不会自动变成原研品牌增量？答案并不确定</h4>
            <div class="reader-pair">
              <div class="reader-piece"><h5>偏乐观的政策解读</h5><p>医保局相关解读直接提出，高血压等慢病药企业可能获得基层增量空间，并强调真实世界医保价值、长期预后和循证证据的重要性。这个方向意味着，单纯“最低采购价”之外，长期临床价值可能获得更多讨论空间。</p></div>
              <div class="reader-piece"><h5>现实约束</h5><p>基层标准病例仍处在明确的成本约束下，而新版基药和集采药本身也强化低价、高可及供应。行业观点普遍认为，配送成本、上下级医院用药衔接、目录是否统一、药店能否承接处方，都会决定患者下沉后最终买到什么品牌。因此“基层患者增加”并不自动等于“原研销量增加”。</p></div>
            </div>
            <p style="margin-top:12px">甚至存在相反可能：如果同一分子下集采仿制药已进入基层核心目录，而原研没有被同步配备，患者下沉反而可能加快品牌替换。只有当临床偏好、目录准入、患者支付意愿、渠道可得性和库存同时成立时，成熟原研才可能把“患者流变化”转化为真实销量。</p>
          </section>

          <section class="reader-section">
            <h4>对Viatris意味着什么：最应该建立的不是“政策利好”判断，而是一条可以被数据验证的转化漏斗</h4>
            <div class="research-chain"><span>基层病种被纳入</span><i>→</i><span>患者量真实上升</span><i>→</i><span>对应分子进入基层目录</span><i>→</i><span>Viatris SKU能被采购</span><i>→</i><span>商业稳定送达</span><i>→</i><span>形成处方/复购</span></div>
            <p style="margin-top:12px">对络活喜、立普妥等成熟慢病品牌，下一步真正该看的是省/城市级数据，而不是国家政策标题：①高血压等基层病组实际病例量是否上升；②本地医院/医共体10月底更新目录后，哪些分子、规格和厂牌进入；③同分子集采品与原研的患者实际价差；④商业能否覆盖到新增基层终端；⑤断货、配送频率和安全库存是否支持持续使用；⑥如果基层不配原研，零售是否承接续方。</p>
            <p>这条政策对Viatris的价值，最终取决于“患者流 × 目录 × 价格 × 供应”四件事能否同时成立。任何一环缺失，都可能让宏观政策机会停留在纸面。</p>
          </section>

          <div class="detail-meta">
            <details class="meta-details">
              <summary>来源与延伸阅读 <span>6</span></summary>
              <div class="meta-body">
                <a class="source-link" href="https://www.nhsa.gov.cn/art/2026/9/17/art_14_22171.html" target="_blank" rel="noopener">官方｜国家医保局：DRG/DIP 3.0与基层慢病、特例单议 ↗</a>
                <a class="source-link" href="https://wsjk.ln.gov.cn/wsjk/zfxxgk/zc/xzgfxwj/2026091611310457742/index.shtml" target="_blank" rel="noopener">地方执行｜辽宁：10月底前完成HIS与用药供应目录更新 ↗</a>
                <a class="source-link" href="https://www.vbdata.cn/intelDetail/1098984" target="_blank" rel="noopener">行业媒体｜动脉网：新版基药目录进入机构落地窗口 ↗</a>
                <a class="source-link" href="https://stock.finance.sina.com.cn/stock/go.php/vReport_Show/kind/lastest/rptid/842788645499/index.phtml" target="_blank" rel="noopener">券商观点｜中银国际：3.0版分组、特例单议与支付环境 ↗</a>
                <a class="source-link" href="https://finance.sina.com.cn/roll/2026-09-16/doc-inirzmyx4772459.shtml" target="_blank" rel="noopener">行业观点｜药店承接基层处方与院外增量的讨论 ↗</a>
                <a class="source-link" href="https://finance.sina.com.cn/money/bank/2026-09-03/doc-iniqpvfu1120855.shtml" target="_blank" rel="noopener">政策解读｜3.0版分组精细化与病种库调整 ↗</a>
              </div>
            </details>
          </div>
        </div>
      `
    }
  ];

  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function render(){
    const box=document.querySelector('#weeklyFocus');
    if(!box) return;

    box.innerHTML=cards.map(c=>`
      <article class="focus-card">
        <div class="focus-top">
          <h3>${esc(c.title)}</h3>
          <span class="date">${c.date}</span>
        </div>
        <p class="focus-summary">${esc(c.summary)}</p>
        <div class="chips">
          <span class="chip">${esc(c.category)}</span>
          ${c.viatris?'<span class="chip v">Viatris高相关</span>':''}
        </div>
        <div class="why-now"><b>为什么值得看：</b>${esc(c.why)}</div>
        <button class="open-link" data-v31-toggle>展开深度解读 ↓</button>
        <div class="weekly-detail" hidden>${c.detail}</div>
      </article>
    `).join('');

    document.querySelectorAll('[data-v31-toggle]').forEach(b=>b.addEventListener('click',()=>{
      const d=b.nextElementSibling;
      d.hidden=!d.hidden;
      b.textContent=d.hidden?'展开深度解读 ↓':'收起深度解读 ↑';
    }));

    const m=document.querySelector('#weeklyMetrics');
    if(m) m.innerHTML=`<div class="metric"><b>2</b><span>本期重点</span></div><div class="metric"><b>2</b><span>深度研究卡</span></div><div class="metric"><b>2</b><span>Viatris高相关</span></div>`;

    const j=document.querySelector('#weeklyJudgements');
    if(j) j.innerHTML=[
      '“十五五”医药工业政策开始从“创新数量”转向原创性、工业化和全球商业价值；对成熟药则同时强化专利后高效替代。',
      '基层慢病机会已经从“目录扩容”进入“支付激励 + 用药目录 + 商业履约”联动阶段，患者流变化并不自动等于原研品牌增长。',
      '未来判断政策影响需要更多看执行链条是否闭环，而不是只看国家层面的方向性表述。'
    ].map(x=>`<div class="insight-item">${esc(x)}</div>`).join('');

    const v=document.querySelector('#weeklyValidation');
    if(v) v.innerHTML=[
      '10月底各地医疗机构完成新版基药目录更新后，络活喜/立普妥等成熟慢病SKU的实际配备率、终端覆盖和库存是否提升。',
      '“十五五”规划中的价格、支付、进院和全球商业化支持将如何转成具体实施政策。'
    ].map(x=>`<div class="insight-item">${esc(x)}</div>`).join('');
  }

  document.addEventListener('radar:ready',render,{once:true});
})();
