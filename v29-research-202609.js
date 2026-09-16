(() => {
  'use strict';
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const source = (kind,label,url) => `<a class="source-link" href="${url}" target="_blank" rel="noopener"><span class="source-kind">${kind}</span>${label} ↗</a>`;
  const wrap = inner => `<div class="reader-detail research-detail">${inner}</div>`;
  const meta = links => `<div class="detail-meta"><details class="meta-details"><summary>来源与延伸阅读 <span>${links.length}</span></summary><div class="meta-body">${links.join('')}</div></details></div>`;

  const OVERRIDES = {
    'nhsa-2026-national-reimbursement-negotiation-20260909': wrap(`
      <section class="reader-section reader-news">
        <span class="research-kicker">PAYMENT / NRDL / COMMERCIAL INSURANCE</span>
        <h4>先把今年国谈发生了什么讲清楚</h4>
        <p>9月9日，2026年国家医保药品目录谈判竞价及商保创新药目录价格协商收官。财联社现场统计显示，约124个目录外药品先后进入基本医保谈判/竞价环节；收官日转入商保创新药目录价格协商。最终目录尚未公布，因此现在能判断的是“规则怎么变”，还不能判断哪些产品最终进入哪一层支付。</p>
        <p>今年最有信息量的变化不是谈判桌上“砍了多少”，而是谈判之前的准备机制明显前移。国家医保局今年首次系统推进1类新药参照药预沟通：第一批31个、第二批28个。参照药是药物经济学测算和医保价值判断的锚点，企业在正式目录调整前就能知道专家如何理解比较对象，从而更早准备药经模型、上市定价和谈判策略。</p>
      </section>
      <section class="reader-section">
        <h4>真正变化：国谈正从一次性价格博弈，变成连续的产品生命周期管理</h4>
        <div class="research-chain"><span>上市前后确定参照药</span><i>→</i><span>提前做价值/药经证据</span><i>→</i><span>基本医保或商保分层准入</span><i>→</i><span>进院/双通道真实可及</span><i>→</i><span>续约与真实世界价值再评价</span></div>
        <p style="margin-top:12px">过去企业容易把“上市定价”和“国谈”当成两个阶段：先建立一段自费市场，到了目录调整再准备谈判。参照药预沟通把医保价值锚点前移后，这两个阶段越来越难完全分开。一个创新药首发价定得多高、选择什么对照、患者援助怎么设计，都会更早影响后面的药经逻辑和医保可接受价格区间。</p>
        <p>这不意味着价格压力减弱。恰恰相反，规则越透明，医保方越能系统地比较临床增量与价格增量。对“比上一代好一点、但贵很多”的产品，透明的参照药和药经框架可能比过去更严格；真正差异化的创新则更容易提前准备证据。</p>
      </section>
      <section class="reader-section">
        <h4>“双目录”提供第二层支付，但商保还没有被证明能自动放量</h4>
        <p>首版商保创新药目录是2025年推出的新机制。国家医保局披露，截至2026年5月底，首版目录药品已在1486家定点医药机构配备，100多个惠民保产品覆盖了目录内药品。这说明商保目录已经从“名单”进入真实保险和终端落地。</p>
        <p>但本周也出现一个重要的反向信号。财新统计，今年商保创新药目录有58个通用名通过形式审查，比上年减少63个；基本医保方向则增加。这个差异不能简单解释为企业“不看好商保”，但至少说明企业仍在观察商保目录究竟能带来多少保费池、真实赔付和患者增量。国家医保局也明确，商保创新药目录本身是推荐性目录，而不是类似基本医保的强制支付清单。</p>
      </section>
      <section class="reader-section">
        <h4>行业怎么看：可预测性提高了，但“第二支付层”仍要用真实结算证明价值</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>偏积极的理解</h5><p>财联社现场采访将今年概括为从“临场博弈”转向“前置规则下协商”。对创新药企业，最大的好处不是价格一定更高，而是研发后期就能知道需要什么比较证据、可能走哪条支付路径，减少上市后才发现医保价值故事不成立的风险。</p></div>
          <div class="reader-piece"><h5>需要保留的判断边界</h5><p>商保目录能否成为稳定的第二支付层，不能只看目录数量。还要看保险产品是否真正承保、免赔额和赔付比例、医院/药店是否有药、患者能否顺利结算，以及保险公司是否认为这些药能带来产品吸引力而非只增加赔付成本。</p></div>
        </div>
        <div class="research-callout"><b>本周形成的判断：</b>中国创新药支付正在从“是否进医保”的单一问题，变成“价值锚点何时确定、基本医保承接多少、商保承接多少、上市后如何持续验证价值”的连续管理。11月正式目录公布后，真正要看的不是名单本身，而是高价药最终落在哪一层支付，以及商保目录能否形成真实结算量。</div>
      </section>
      ${meta([
        source('媒体','财联社：2026国谈收官与双目录新周期','https://www.cls.cn/detail/2478240'),
        source('媒体','财新：2026医保谈判收官，商保衔接受关注','https://m.caixin.com/m/2026-09-09/102483309.html'),
        source('官方','国家医保局：第一批31个参照药预沟通','https://www.nhsa.gov.cn/art/2026/4/29/art_14_20366.html'),
        source('官方','国家医保局：第二批28个参照药预沟通','https://www.nhsa.gov.cn/art/2026/6/6/art_14_20877.html'),
        source('官方','国家医保局：首版商保目录真实落地情况','https://www.nhsa.gov.cn/art/2026/7/9/art_14_21357.html')
      ])}
    `),

    'vbp-high-value-consumables-round7-results-20260910': wrap(`
      <section class="reader-section reader-news">
        <span class="research-kicker">MEDTECH / VBP / GI INTERVENTION</span>
        <h4>结果看起来“九成中选”，但这并不代表竞争变松</h4>
        <p>9月10日，第七批国家组织高值医用耗材集采在天津开标，覆盖23种消化介入耗材。156家企业的558个产品投标，148家企业的517个产品中选，中选产品占比超过九成。注射针、取石网篮等临床高频产品的主流厂牌基本留在场内。</p>
        <p>如果只看“中选率”，很容易误判政策在放松。实际上，本轮的目标已经从“用淘汰率制造降价”转向“让临床主流产品尽量中选，再通过价格、报量和供应规则决定谁获得采购量”。这对器械尤其重要：同一个品类内部型号、功能、医生操作习惯和售后服务差异远大于普通化学仿制药。</p>
      </section>
      <section class="reader-section">
        <h4>“反内卷”第一次出现了可以数出来的真实结果：6个异常低价产品中选但零带量</h4>
        <p>本轮继续使用双锚点控制报价离散度。如果企业报价明显低于同组正常价格分布，仍可能获得中选身份，但不再因此拿到约定采购量。国家医保局披露，共有6个产品触发“中选、零带量”。这个细节比“反内卷”口号本身更重要，因为它直接改变企业的报价激励：极端低价不再是抢量捷径。</p>
        <p>同时，未正常入围的产品仍存在以合理价格“复活”、保留院内资格的路径。政策形成两头约束：高价不能不受约束，异常低价也不再被奖励。企业因此有更多空间在“保价格”和“保采购量”之间做选择。</p>
      </section>
      <section class="reader-section">
        <h4>器械和药品最大的不同：临床功能开始被显式放进价格比较</h4>
        <p>本轮对覆膜支架、多级扩张球囊等特殊功能产品设置差异化比较规则，并通过功能折算使不同设计先转换成更可比的价格再竞争。这是很关键的一步：如果所有产品只按注册证类别比较，企业增加临床功能可能完全得不到价格回报；现在规则至少开始承认“同一耗材类别内部并不完全同质”。</p>
        <p>医院又是按厂牌报量，因此产品历史使用、医生偏好和真实需求能更早进入分量机制。《每日经济新闻》现场统计，23类耗材中有13类的首年报量第一品牌已经是国产品牌，说明国产龙头在国采前就已经积累了不低的临床使用基础。集采更像在放大既有竞争力，而不是凭“国产身份”自动分配份额。</p>
      </section>
      <section class="reader-section">
        <h4>行业怎么看：中选只是入场券，真正的收入还要经过医生偏好和渠道履约</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>政策侧的变化</h5><p>价格仍然要降，但最低价不再是唯一目标；质量、保供、产品功能和医疗机构真实报量共同决定采购结果。对能够覆盖多个品类、供应全国市场的厂商更有利。</p></div>
          <div class="reader-piece"><h5>产业侧的反例</h5><p>科创板日报采访提醒，国采确定的是准入资格和采购限价，并不等于产品会自动放量。消化介入器械高度依赖医生使用习惯、型号适配和企业渠道服务，所以中选后实际采购仍可能明显分化。</p></div>
        </div>
        <div class="research-callout"><b>本周形成的判断：</b>集采已经进入更精细的市场结构设计阶段。国产替代仍可能继续，但原因更准确地说是成本、全产品线、既有临床需求和供应能力共同增强，而不是“集采=国产必胜”。</div>
      </section>
      ${meta([
        source('官方','国家医保局：第七批耗材国采开标结果','https://www.nhsa.gov.cn/art/2026/9/10/art_14_22086.html'),
        source('媒体','科创板日报：中选是入场券，实际放量仍看医生与渠道','https://www.cls.cn/subject/7583'),
        source('媒体','每日经济新闻：医院报量国产占优与企业现场反馈','https://m.nbd.com.cn/articles/2026-09-14/4581098.html')
      ])}
    `),

    'ivonescimab-harmoni2-os-20260915': wrap(`
      <section class="reader-section reader-news">
        <span class="research-kicker">ONCOLOGY / IO 2.0 / WCLC</span>
        <h4>这次不是“又一次赢K药”：此前的PFS优势第一次延伸到了总生存期</h4>
        <p>HARMONi-2是一项全部在中国开展的随机、双盲III期试验，入组398名未经系统治疗、PD-L1 TPS≥1%、EGFR/ALK阴性的局部晚期或转移性非小细胞肺癌患者，直接比较PD-1/VEGF双抗依沃西与帕博利珠单抗单药。</p>
        <p>此前主要终点PFS已经明显阳性：11.1个月对5.8个月，HR 0.51。本次WCLC公布的预设OS中期分析把证据再推进一层：中位OS 30.8个月对22.6个月，HR 0.73，P=0.009；24个月OS率57.9%对48.0%，36个月45.0%对33.1%。也就是说，“延缓进展”终于延伸成了“总体活得更久”。</p>
      </section>
      <section class="reader-section">
        <h4>但总体阳性不等于每个亚组都同样强</h4>
        <p>预设亚组里，PD-L1 TPS≥50%人群的OS HR为0.58，鳞癌人群为0.65；而PD-L1 1–49%人群HR为0.85、非鳞癌HR为0.79，两组置信区间均跨1。这些亚组并没有为独立显著性检验充分统计把握，因此不能直接得出“低表达/非鳞癌没有效果”，但也不能把总体HR 0.73机械外推给每一个患者群。</p>
        <p>这正是WCLC现场评议专家Mariana Brandão提出的核心问题：获益似乎更多由PD-L1高表达和鳞癌患者驱动。她明确表示，不会仅凭这一结果立即改变PD-L1高表达NSCLC的一线临床实践。这个谨慎意见值得保留，因为它提醒市场不要把一个漂亮的总体终点写成“全面取代K药”。</p>
      </section>
      <section class="reader-section">
        <h4>下一关已经从“中国数据够不够好”，变成“能不能在全球人群复现”</h4>
        <p>HARMONi-2的所有患者来自中国，这是这项资产全球估值最现实的边界。中国NSCLC人群、后续治疗路径和医疗实践与欧美并不完全相同，因此全球监管与临床界不会仅凭这项试验自动接受相同幅度的外推。</p>
        <p>目前有一些方向性支持：依沃西另一项全球HARMONi研究在不同适应症和联合化疗背景下，Western与Asian患者的OS方向趋于一致。但它不是HARMONi-2的复制试验，不能替代验证。真正回答“依沃西能否成为全球Keytruda challenger”的，是正在推进的全球HARMONi-7等研究。</p>
      </section>
      <section class="reader-section">
        <h4>行业怎么看：PD-1/VEGF的机制可信度显著上升，但global reproducibility才是下一个价值拐点</h4>
        <p>从产业角度看，依沃西最大的进展是把“PD-1/VEGF双通路可能优于单PD-1”的机制假设，从PFS推到了OS。它会继续提高全球药企对这一modalitiy的兴趣，也让其他PD-(L)1/VEGF双抗项目面对更高的临床门槛。</p>
        <div class="research-callout"><b>本周形成的判断：</b>中国创新药全球竞争已经进入下一阶段。仅在中国做出漂亮数据不再足够；当产品开始挑战全球标准治疗时，最重要的估值变量会变成同一优势能否跨地区、跨人群、跨治疗路径复制。</div>
      </section>
      ${meta([
        source('学会','IASLC：HARMONi-2预设OS分析','https://www.iaslc.org/iaslc-news/press-release/late-breaking-harmoni-2-analysis-shows-ivonescimab-significantly-improves'),
        source('官方','康方生物：WCLC HARMONi-2完整结果','https://akesobio.com/cn/media/akeso-news/20260915/'),
        source('媒体','经济观察网：WCLC现场评议与全球化争议','https://www.eeo.com.cn/2026/0915/1037377.shtml'),
        source('专业媒体','ASCO Post：HARMONi-2结果回顾','https://ascopost.com/news/september-2026/ivonescimab-significantly-improves-overall-survival-vs-pembrolizumab-in-pd-l1-positive-advanced-nsclc/')
      ])}
    `),

    'nhsa-national-medical-service-reimbursement-catalogue-20260916': wrap(`
      <section class="reader-section reader-news">
        <span class="research-kicker">MEDTECH / PAYMENT INFRASTRUCTURE</span>
        <h4>三件连续发生的政策，要放在一张图里理解</h4>
        <p>9月9日，国家医保局宣布完成40批医疗服务价格项目立项指南，把各省原来4000余项到2万多项不等的收费项目，统一规范为2624个主项目、742个加收项、174个扩展项；9月15日又推出高水平新技术新产品医疗服务价格“预立项”；9月16日正式启动我国首个全国统一基本医保医疗服务项目目录。</p>
        <p>单独看，每一项都像价格管理的技术性文件；连起来看，则是在重新搭建创新医疗技术从“有技术”到“能收费”再到“能被医保支付”的基础设施。</p>
      </section>
      <section class="reader-section">
        <h4>以前最容易卡在哪：注册证拿到了，不代表医院能马上用、能马上收钱</h4>
        <div class="research-chain"><span>产品/技术获批</span><i>→</i><span>医院愿意采购</span><i>→</i><span>地方有没有收费项目</span><i>→</i><span>项目价格是多少</span><i>→</i><span>医保是否支付</span><i>→</i><span>患者真实使用</span></div>
        <p style="margin-top:12px">创新器械常见的商业化断点，不是产品没有临床价值，而是注册审批、医院采购、收费项目和医保支付长期处在不同流程。经济参考报援引行业情况称，过去产品获批后，仅价格立项和收费准入就可能等待半年到两三年。对手术机器人、脑机接口、新介入器械等需要依赖医疗服务收费的产品，这段空窗直接决定装机后能否形成真实使用量。</p>
      </section>
      <section class="reader-section">
        <h4>现在三层规则分别解决不同问题，不能混为“全国统一定价”</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>第一层：统一收费“字典”</h5><p>40批立项指南统一的是项目名称、服务产出、计价单位和加收/扩展规则。它解决同名不同项、同项不同名，但并没有把全国价格定成一个数；具体价格仍由地方测算。</p></div>
          <div class="reader-piece"><h5>第二层：把价格讨论提前到获批前</h5><p>进入临床研究的新技术、进入创新医疗器械特别审查程序的新产品，可由一家三级医院向省医保申请预立项。正式获批后可快速转为正式项目。预立项是“提前准备收费路径”，不是正式价格，更不是医保报销承诺。</p></div>
          <div class="reader-piece"><h5>第三层：建立全国医保支付范围</h5><p>9月16日启动的国家医保医疗服务项目目录，首批覆盖心血管、呼吸、眼科、放疗、麻醉、康复等13类。制定后先服务跨省异地就医结算，再逐步与各省支付范围衔接。</p></div>
          <div class="reader-piece"><h5>支付会更快，也会更早要求经济性</h5><p>预立项制度同时设置约束：如果设备折旧/耗材成本占收费项目过高，或高值耗材价格很高，需要解释经济性与价格合理性；价值仍不确定的技术还可“附条件新增”，再用真实世界评价决定继续、降价或退出。</p></div>
        </div>
      </section>
      <section class="reader-section">
        <h4>对器械/IVD商业化意味着什么：health economics要从市场准入后置工作，前移到产品设计</h4>
        <p>过去器械企业很容易把“注册证”当成商业化终点，再由市场准入团队处理收费和医保。新机制让这个顺序发生变化：产品在研发/临床阶段就需要回答它创造了什么独立医疗服务产出、为什么值得形成新收费项目、相对现有工作流节省了什么或改善了什么。</p>
        <p>这对真正改变诊疗路径的创新器械是利好，但不是给所有“新设备”开快车道。政策明确，普通设备升级和绝大多数常规IVD并不自动纳入预立项；“创新”需要体现临床价值和患者获益，而不是功能叠加。</p>
      </section>
      <section class="reader-section">
        <h4>行业怎么看：更快的通道和更早的价值审查，是同一枚硬币的两面</h4>
        <p>医保局座谈会上，医院和企业代表普遍把预立项视为缩短创新落地周期的工具；但同时也明确提出不能把制度变成“开闸放水”，应让价格跟随价值而不是跟随概念。这个分歧其实非常健康：未来MedTech竞争不是“能不能拿证”，而是“能不能用临床和经济证据证明这项技术值得形成一个新的支付单元”。</p>
        <div class="research-callout"><b>本周形成的判断：</b>中国医疗器械/新技术支付正在从产品上市后的downstream问题，前移成研发阶段就必须考虑的产品设计问题。收费项目、地方定价、医保支付和真实工作流正在被逐渐接成一条链。</div>
      </section>
      ${meta([
        source('官方','国家医保局：40批医疗服务价格项目立项指南收官','https://www.nhsa.gov.cn/art/2026/9/9/art_14_22050.html'),
        source('官方','国家医保局：高水平新技术新产品价格预立项解读','https://www.nhsa.gov.cn/art/2026/9/15/art_105_22143.html'),
        source('官方','国家医保局：预立项工作座谈会','https://www.nhsa.gov.cn/art/2026/9/15/art_14_22144.html'),
        source('官方','国家医保局：首批全国医保医疗服务项目目录工作方案','https://www.nhsa.gov.cn/art/2026/9/16/art_14_22149.html'),
        source('媒体','经济参考报：价格预立项从上市后等待转向提前介入','https://www.jjckb.cn/20260915/4a1cad8bc3ec4e42a3f75c22b956c421/c.html')
      ])}
    `),

    'drg-dip-3-0-20260902': wrap(`
      <section class="reader-section reader-news">
        <span class="research-kicker">PAYMENT / GRASSROOTS</span><h4>DRG/DIP 3.0最值得看的，不是分组数量，而是首次把“基层同病同付”写进国家分组</h4>
        <p>3.0版DRG包含492个核心分组和825个细分组，DIP核心病种库5125个。国家层面首次给出31个DRG基层病组和127个DIP基层病种，覆盖高血压、糖尿病、呼吸系统感染等常见内科疾病及部分成熟手术，并要求统筹地区合理确定本地基层病种后，对不同等级医疗机构实行“同病同付”。</p>
        <p>需要特别区分：这里的“同付”是医保基金对医院的结算标准，不是患者去社区和三甲医院的个人报销比例变成完全一样。它改变的是医院侧激励——同一适合基层处理的病，如果大医院不再因为等级高天然获得更高基金支付，基层收治的经济条件会变得相对更好。</p>
      </section>
      <section class="reader-section"><h4>它与基药/集采政策真正接上的地方：患者流下沉以后，药必须跟得上</h4>
        <p>支付端把常见病往基层引导，只有在基层能够开到相应药物时才会形成完整闭环。新版基药目录、集采药“三进”、基层药品配备与DRG/DIP 3.0实际上分别解决“基层可以配什么”“低价中选药怎么供应下去”“患者为什么愿意/医院为什么愿意在基层治疗”。</p>
        <div class="viatris-box"><h5>对Viatris意味着什么</h5><p>高相关不在DRG分组本身，而在患者流变化。对立普妥、络活喜等成熟慢病分子，后续应该按“哪些基层病种被纳入 → 患者是否真实下沉 → 基层配备哪些厂牌/SKU → 集采品与原研的价格和处方延续 → 商业覆盖能否稳定履约”去看。不能把“同病同付”直接等同于成熟品牌销量增长。</p></div>
      </section>
      ${meta([
        source('官方','国家医保局：DRG/DIP 3.0发布会实录','https://www.nhsa.gov.cn/art/2026/9/2/art_14_21978.html'),
        source('媒体','新华社：国家层面首次明确基层病种同病同付','https://society.people.com.cn/n1/2026/0902/c1008-40791266.html'),
        source('媒体','科创板日报：3.0版对基层与创新技术的调整','https://www.cls.cn/detail/2472721')
      ])}
    `),

    'retail-pharmacy-personal-account-whitelist-rollout-20260912': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">RETAIL / MEDICAL INSURANCE ACCOUNT</span><h4>白名单开始进入省级落地：医保个人账户从“药店消费”进一步回到“医疗消费”</h4>
        <p>国家要求各省原则上在9月底前形成统一的定点零售药店职工医保个人账户支付白名单。9月以来，黑龙江、新疆、云南等地陆续公开征求意见。原则上，国药准字药品、中药饮片、部分医疗器械/耗材和IVD可以纳入；保健品、日用品、化妆品、隐形眼镜等医疗属性弱或生活消费品明确排除。</p>
        <p>它不是“以后药店不能刷医保”，而是把医保个账的用途进一步从泛消费收紧到治疗相关支出，并把白名单、医保编码、价格一致性和反串换监管一起落到定点协议。</p>
      </section>
      <section class="reader-section"><h4>真正受影响的是药店经营mix，而不是合规药品本身</h4>
        <p>过去部分医保药店依靠非药品/保健品等高毛利品类补贴药品低毛利经营。白名单落实后，这类交叉补贴空间会收缩，医保店必须更依赖真实药品、处方承接、慢病复购和专业服务。长期看，这会进一步拉开“医疗属性强的医保店”与普通健康消费零售的经营逻辑。</p>
        <div class="viatris-box"><h5>对Viatris意味着什么</h5><p>对合规成熟处方药本身不是直接负面，但会改变承接产品的药店网络和经济模型。后续更值得看的是：哪些门店仍是高质量医保定点、处方药销售占比是否提高、医保与非医保顾客是否同价，以及主要SKU在医保店的真实可及和复购，而不是只看门店覆盖数量。</p></div>
      </section>
      ${meta([
        source('官方','国家医保局：定点零售药店个账白名单要求','https://www.nhsa.gov.cn/art/2026/5/19/art_53_20546.html'),
        source('地方','黑龙江：个人账户支付范围清单征求意见','https://ybj.hlj.gov.cn/ybj/c105387/202609/c00_31972633.shtml'),
        source('地方','新疆：个人账户白名单制度征求意见','https://ylbzj.xinjiang.gov.cn/ylbzj/tzgg/202609/35840dda493f419e9298d532775d7e43.shtml'),
        source('地方','云南：个人账户白名单征求意见','https://finance.sina.com.cn/jjxw/2026-09-12/doc-inirqrwy6352445.shtml')
      ])}
    `),

    'hunan-vbp-drugs-three-in-retail-20260914': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">VBP / RETAIL / ACCESS</span><h4>湖南把集采药“三进”从覆盖要求进一步做成供应和零售价管理</h4>
        <p>湖南公布2026年集采药“三进”供应清单，要求各市州10月底前公布参与的医保定点零售药店；中选企业必须按中选价格及时足量供货，断供或超中选价供应经整改无效可被移出“三进”。地方还可以把药店“量价比较指数”与集采药加成比例挂钩，对整体价格持续偏高的药店降低加成。</p>
        <p>这说明“集采药进零售”不只是让患者在药店也能买到，而是在把院外零售逐渐纳入集采的价格和履约体系。药店不再是院内价格治理之外的完全独立空间。</p>
      </section>
      <section class="reader-section"><h4>成熟品牌以后看院外，不能只看分销覆盖</h4>
        <div class="research-chain"><span>中选药进入哪些药店</span><i>→</i><span>中选价能否稳定供货</span><i>→</i><span>药店实际加成/零售价</span><i>→</i><span>原研与集采品患者价差</span><i>→</i><span>真实购买选择</span></div>
        <div class="viatris-box"><h5>对Viatris意味着什么</h5><p>对立普妥、络活喜等成熟品牌，零售监测要进一步从“有没有货/覆盖多少门店”升级到同分子SKU级价格和供货对照：集采品进入多少核心药店、零售价与中选价偏离多少、原研品牌的价格差是否扩大、患者是否因价差发生替换。渠道覆盖只有和价格、需求、履约一起看才有意义。</p></div>
      </section>
      ${meta([source('地方','湖南省医保局：2026年集采药“三进”供应清单','https://ybj.hunan.gov.cn/ybj/first113541/firstF/f3113607/202609/t20260914_34063692.html')])}
    `),

    'sanofi-cheplapharm-mature-medicines-20260914': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">MATURE BRANDS / OPERATING MODEL</span><h4>这不是普通“卖老药”：Sanofi把成熟药下一阶段生命周期交给专业平台，同时保留股权利益</h4>
        <p>Sanofi与Cheplapharm宣布拟建立新的成熟药战略合作：Cheplapharm将承接20个成熟药及3个全球生产基地，Sanofi则取得Cheplapharm 26.4%股权。官方确认交易包括Lovenox/Clexane（依诺肝素），其余完整产品清单和各市场权益尚未全部披露。</p>
        <p>Sanofi给出的理由非常直接：创新药和部分成熟药在制造、监管维护和商业化方面需要不同的operating model。Cheplapharm专门经营成熟品牌，能够用更适合长生命周期资产的成本结构维护生产、注册、供应和商业价值；Sanofi则进一步集中资源到创新，同时通过股权继续分享成熟药平台的长期价值。</p>
      </section>
      <section class="reader-section"><h4>行业含义：成熟药不是“没有价值”，而是价值需要不同的组织来提取</h4>
        <p>创新Pharma的商业体系通常围绕新适应症、医学教育、快速增长和高研发投入配置；成熟品牌更依赖供应稳定、监管维护、SKU/市场组合、渠道效率、价格治理和低成本运营。如果把两类资产放在同一套组织里，成熟品牌很容易在资源优先级上持续后退。</p>
        <div class="viatris-box"><h5>对Viatris意味着什么</h5><p>这条与Viatris高度相关的地方不是某个Sanofi产品，而是它再次验证了Viatris所代表的专业化成熟品牌逻辑：专利后资产仍能创造长期现金流，但前提是用与创新药不同的成本、制造、价格、渠道和生命周期管理方式经营。当前官方没有披露20个资产在中国的完整权益，因此不能进一步推断对中国市场的直接竞争影响。</p></div>
      </section>
      ${meta([source('官方','Sanofi：与Cheplapharm建立成熟药战略合作','https://www.sanofi.com/en/media-room/press-releases/2026/2026-09-14-13-03-56-3361178')])}
    `)
  };

  function applyOverride(id, html){
    document.querySelectorAll(`[data-id="${id}"]`).forEach(card => {
      if(card.dataset.researchV29 === '1') return;
      const detail = card.querySelector('.reader-detail');
      if(detail) detail.outerHTML = html;
      const weekly = card.querySelector('.weekly-detail');
      if(weekly && !weekly.querySelector('.research-detail')) weekly.innerHTML = html;
      card.dataset.researchV29 = '1';
    });
  }

  function patch(){ Object.entries(OVERRIDES).forEach(([id,html]) => applyOverride(id,html)); }
  let tries = 0;
  const timer = setInterval(() => { patch(); if(++tries > 120) clearInterval(timer); }, 120);
  document.addEventListener('radar:ready', patch);
  document.addEventListener('radar:events-rendered', patch);
})();
