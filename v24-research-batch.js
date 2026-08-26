(() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const source = (kind,label,url) => `<a class="source-link" href="${url}" target="_blank" rel="noopener"><span class="source-kind">${kind}</span>${label} ↗</a>`;
  const wrap = inner => `<div class="reader-detail research-detail">${inner}</div>`;
  const meta = links => `<div class="detail-meta"><details class="meta-details"><summary>来源与延伸阅读 <span>${links.length}</span></summary><div class="meta-body">${links.join('')}</div></details></div>`;

  const OVERRIDES = {
    'sandoz-henlius-biosimilar-global-license-20260817': wrap(`
      <section class="reader-section reader-news">
        <span class="research-kicker">BD / BIOSIMILAR / LOE</span><h4>新闻与交易背景</h4>
        <p>8月17日，复宏汉霖与Sandoz把此前单个产品合作升级成平台级合作。框架最多可覆盖10款单抗和/或ADC生物类似药资产；首批已落地3款：西妥昔单抗生物类似药HLX05-N、依洛尤单抗生物类似药HLX16、贝利尤单抗生物类似药，另给Sandoz一款透明质酸酶HLXTE-HAase1001的选择权。</p>
        <p>首批3款产品对应的首付款最高7700万美元，开发及开发预算里程碑最高1.6亿美元，销售里程碑最高7700万美元，因此首批3款的headline金额最高3.14亿美元；另有800万美元不可退还选择权费。复宏汉霖披露，2026年预计可实现的开票金额最高1.005亿美元。</p>
        <p>双方并非第一次合作。2025年4月，Sandoz已取得复宏汉霖伊匹木单抗生物类似药HLX13在欧美等46个国家和地区的独家商业化权益。这次从“一个品种”扩大到“最多10个资产”，意味着关系从单品授权走向长期平台合作。</p>
      </section>
      <section class="reader-section"><h4>这笔交易真正值得看的，不只是3.14亿美元</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>40%销售分成：价值分享比headline更重要</h5><p>公告约定，除另有约定外，Sandoz还需按相关产品在合作区域内各国家的净销售额或净利润的40%向复宏汉霖支付销售分成。行业报道普遍把这一条视为交易最有分量的部分：它让复宏汉霖不是只在签约和里程碑阶段变现，而是能继续分享产品上市后的长期商业价值。</p></div>
          <div class="reader-piece"><h5>headline金额不等于确定收入</h5><p>3.14亿美元里很大一部分依赖研发、注册和销售节点。首批资产整体仍偏早期，后续能否兑现取决于研发推进、监管获批、上市时点、价格竞争和实际销售。因此判断BD质量，要把首付款、近期可确认收入、成功概率和长期分成拆开，而不是只看总金额。</p></div>
        </div>
      </section>
      <section class="reader-section"><h4>双方为什么愿意这样合作</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>对Sandoz：提前锁定下一批LOE机会</h5><p>Sandoz的核心增长逻辑之一就是生物药专利到期后的生物类似药机会。公司把未来十年视为biosimilar“黄金十年”，并持续扩充管线。与复宏汉霖合作，可以把海外市场洞察、注册和商业化能力更早放进资产开发，而不是等项目成熟后再采购。</p></div>
          <div class="reader-piece"><h5>对复宏汉霖：把研发制造平台变成全球收入</h5><p>复宏汉霖主要负责研发、生产和供应，Sandoz发挥全球注册、准入和商业化能力。这样复宏汉霖无需在每个海外市场复制一套商业团队，却仍能通过首付款、里程碑和销售分成持续分享价值。</p></div>
        </div>
        <div class="research-callout"><b>行业判断：</b>这不是典型“创新分子license-out”，而是“研发制造平台 + 全球商业基础设施”的分工。中国医药出海的可交易能力，正在从单一创新资产扩大到CMC、规模制造、国际注册和生物类似药平台。</div>
      </section>
      ${meta([
        source('官方','复宏汉霖：战略合作与首批资产','https://www.henlius.com/en/NewsDetails-6075-26.html'),
        source('公告','复星医药：权益范围、财务条款及40%分成','https://paper.cnstock.com/html/2026-08/18/content_2255917.htm'),
        source('官方','Sandoz：合作扩展至最多10个biosimilar资产','https://www.eqs-news.com/news/ad-hoc/sandoz-announces-strategic-collaboration-with-henlius-on-up-to-10-biosimilars-further-expanding-industry-leading-pipeline/e80008bb-53ed-43f1-bf4a-969db31d1a39_en'),
        source('媒体','Reuters：Sandoz biosimilar增长与“golden decade”','https://www.reuters.com/business/healthcare-pharmaceuticals/sandoz-results-narrowly-beat-sales-expectations-2026-08-05/'),
        source('媒体','每日经济新闻：10款合作与四成销售分成','https://wap.eastmoney.com/a/202608173843260444.html')
      ])}
    `),

    'nr-vbp-round12': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">POLICY / VBP</span><h4>先把这批集采发生了什么讲清楚</h4>
        <p>第12批国家药品集采覆盖65种药品，全国约4.5万家医疗机构报量，327家企业的521个产品获得中选资格。8月6日正式中选结果和供应清单公布，后续在2026年内由各地陆续执行。</p>
        <p>这批真正值得看的不是“又降了多少价”，而是规则开始更明确地同时处理三件事：防止极端低价把市场拖进恶性竞争、给医院保留更真实的临床选择、让参比制剂/原研药在合理降价后仍有留在院内的路径。</p>
      </section>
      <section class="reader-section"><h4>三个关键规则，分别改变什么行为</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>1. 双锚点：极端低价不再自动变成全场价格基准</h5><p>第一个锚点取“最低报价”和“入围均价向下1个标准差”中的较高值，用来限制合理中选价区间；如果报价低于入围均价向下2个标准差，企业仍可能中选，但带量比例降为0、且不占入围名额。逻辑是：可以让企业报低价，但不再奖励用极端低价绑走采购量。</p></div>
          <div class="reader-piece"><h5>2. 参比制剂“不带量复活”：保院内资格，不保证销量</h5><p>报价有效但未入围的参比制剂，如果进一步降到规则允许的价格区间，可获得中选资格但不带协议量。对原研药来说，这很重要：以前常是“跟仿制药拼价抢量”或“出局”；现在多了一条“接受价格约束、保留院内采购资格、靠临床需求获得自然量”的路径。</p></div>
          <div class="reader-piece"><h5>3. 按厂牌报量：医院的真实品牌选择更早进入采购机制</h5><p>医院报量不只报通用名总量，而是按厂牌表达需求。这样不同品牌的历史使用和临床偏好能更直接反映到约定采购量，而不是中选后再由医院内部二次分配。</p></div>
          <div class="reader-piece"><h5>4. 基层小量订单不锁死厂牌：先解决“送不下去”</h5><p>对未加入医共体、单品种报量很小的基层机构，执行考核可不锁定到具体厂牌，采购任一中选厂牌即可计量。背后的现实问题是基层订单碎、配送成本高；规则在价格之外，也开始处理供应履约。</p></div>
        </div>
      </section>
      <section class="reader-section"><h4>所以，集采正在从“价格战”变成什么</h4>
        <div class="research-chain"><span>报价仍然要低</span><i>→</i><span>但异常低价不再获量</span><i>→</i><span>医院品牌需求更真实地表达</span><i>→</i><span>原研可保留院内入口</span><i>→</i><span>最终竞争转向价格+临床偏好+供应</span></div>
        <p style="margin-top:12px">第一财经报道，这一批有10个参比制剂中选，为历批最多。这个数字不能简单理解成“原研重新赢了”：有的原研通过价格竞争拿到量，有的可能只是保住中选身份；真正要看的是各分子的报量、最终价格、医院实际采购和院外承接。</p>
        <div class="viatris-box"><h5>对Viatris意味着什么</h5><p>高相关点不是“原研受益”四个字，而是每个成熟品牌都要重新回答：本分子是否进本批集采、哪个规格/剂型、参比制剂以什么规则中选、医院按厂牌报了多少量、中选价会不会成为院外价格锚点、未带量/未中选部分能否由零售承接。没有分子和SKU级mapping之前，不应直接下财务结论。</p></div>
      </section>
      ${meta([
        source('官方','国家医保局：第12批国家药品集采开标','https://www.nhsa.gov.cn/art/2026/7/31/art_14_21646.html'),
        source('媒体','第一财经：新规生效，原研与临床选择变化','https://www.yicai.com/news/103301776.html'),
        source('媒体','每日经济新闻：规则解读会与零带量机制','https://www.nbd.com.cn/articles/2026-07-24/4511534.html'),
        source('行业','中国医药报：双锚点、参比制剂与规则变化','https://bk.cnpharm.com/zgyyb/2026/07/30/app_325602.html'),
        source('行业','新康界：标准差机制的模拟解读','https://finance.sina.com.cn/stock/med/2026-06-14/doc-inickkzt8969518.shtml')
      ])}
    `),

    'essential-medicines-list-2026-official-release-analysis-202607': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">POLICY / ESSENTIAL MEDICINES</span><h4>新版基药目录到底变了什么</h4>
        <p>2026版国家基本药物目录将于9月1日起实施，共794种药品：化学药品和生物制品476种、中成药318种；新增116个品种，并首次批量纳入16种创新药。官方测算，新版基药占全国公立医疗卫生机构药品使用量约71%，其中基层、二级、三级公立医疗机构分别约78%、74%、65%。</p>
        <p>比“新增了多少药”更重要的是遴选逻辑。行业采访把这一轮变化概括为从过去更强调“控费保基本”，进一步转向“临床必需、上下衔接”：高血压、糖尿病、慢阻肺、消化系统等常见病和慢病选择增加，同时通过剂型和规格调整，让基层与大医院更容易使用同一套常用治疗方案。</p>
      </section>
      <section class="reader-section"><h4>最容易混淆的四件事，需要分开</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>基药目录：回答“医疗机构应该优先配什么”</h5><p>它主要影响医疗卫生机构的配备、使用和上下级用药衔接，是供应与临床使用政策，不等于医保支付清单。</p></div>
          <div class="reader-piece"><h5>医保目录：回答“医保基金能不能付”</h5><p>药品可以同时是基药和医保药，但两者功能不同。新版新增基药均已进入医保范围，意味着支付资格基本具备，但实际报销仍受医保支付范围和地方政策影响。</p></div>
          <div class="reader-piece"><h5>集采：回答“以什么价格、向谁买多少”</h5><p>进入基药不会自动决定品牌。若同分子同时处于集采环境，医院还要面对中选结果、约定采购量和价格约束。</p></div>
          <div class="reader-piece"><h5>患者下沉：回答“需求到底在哪里发生”</h5><p>只有基层真正能诊治、医保支付跟着下沉、机构也把药配上，目录资格才会转化成真实用量。因此8月“同病同付+药随病走”政策是基药商业影响的重要后续。</p></div>
        </div>
      </section>
      <section class="reader-section"><h4>对药企来说，真正的商业链条</h4>
        <div class="research-chain"><span>进入基药目录</span><i>→</i><span>地方/医共体调整用药目录</span><i>→</i><span>基层形成真实患者量</span><i>→</i><span>采购到具体分子/规格/品牌</span><i>→</i><span>供应与配送能覆盖</span><i>→</i><span>才形成真实销售</span></div>
        <p style="margin-top:12px">所以“进基药”是机会入口，不是销量保证。对创新药，它增加了基层和县域使用场景；对成熟品牌，它同时带来更多患者触点和更强的集采仿制竞争。真正要追的是地方配备清单、分子规格、品牌可得性和院内外续方流向。</p>
        <div class="viatris-box"><h5>对Viatris意味着什么</h5><p>重点不是泛泛说“基层机会变大”，而是逐个核对立普妥/络活喜等相关分子的剂型规格是否处在新版目录及地方配备范围、同分子集采中选格局、基层能否同时获得原研、患者续方是否转向零售，以及商业覆盖能否把新增需求接住。</p></div>
      </section>
      ${meta([
        source('官方','国家卫健委：2026版国家基本药物目录发布','https://www.nhc.gov.cn/yaozs/c100098/202607/0f4f2bdcfead449f8412453373522470.shtml'),
        source('发布会','国家卫健委发布会：794种、71%使用量及机构分层数据','https://ws.zibo.gov.cn/art/2026/7/10/art_812_3010060.html'),
        source('媒体','每日经济新闻：16种创新药与具体品类变化','https://www.nbd.com.cn/articles/2026-07-09/4464929.html'),
        source('媒体','财联社：从“控费保基本”到“临床必需、上下衔接”','https://www.cls.cn/detail/2421786'),
        source('媒体','新华财经：创新药首次批量进入基药','https://www.cnfin.com/kx/detail/20260712/4439081_1.html')
      ])}
    `),

    'nhsa-medical-insurance-15th-five-year-plan-20260819': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">POLICY / PAYMENT SYSTEM</span><h4>它不是一条单点政策，而是未来五年医保“操作系统”</h4>
        <p>国家医保局8月19日发布《全民医疗保障“十五五”规划》。基本医保参保率目标继续保持95%左右，职工和居民医保目录内住院费用基金支付比例分别稳定在80%左右、70%左右；即时结算医保基金支出覆盖率要从2025年的约70%提高到80%以上，长期护理保险将覆盖所有统筹地区。</p>
        <p>更重要的是，规划把DRG/DIP、基层支付、药耗集采、药品价格治理、医保目录、商保和基金结算放进同一个五年框架。2025年末，按病种付费结算出院人次已占91.8%，涉及医保基金约1.04万亿元；下一阶段不再是“要不要做DRG/DIP”，而是如何把规则做得更精细。</p>
      </section>
      <section class="reader-section"><h4>从药企视角看，未来五年有四条传导链</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>医院：从按项目挣钱，继续转向按病种经营</h5><p>医保会动态调整病种分组和支付标准，推进DRG/DIP 3.0、结余留用及多元复合支付。医院对药品的判断会更关注“这个药是否帮助在病种预算里获得更好结果”，而不只是单项药价。</p></div>
          <div class="reader-piece"><h5>基层：支付规则开始主动引导患者流</h5><p>规划明确分批推进基层病种“同病同付”，并探索慢病管理结合按人头付费。支付工具会越来越直接地参与分级诊疗，而患者流变化又会反过来影响药品配备和渠道。</p></div>
          <div class="reader-piece"><h5>药价与集采：从“降一次价”转向长期价格治理</h5><p>集采继续扩围，但同时强调稳临床、保质量、反内卷、防围标；网络药店比价、价格监测、挂网治理和直接结算会共同改变药品价格体系和回款效率。</p></div>
          <div class="reader-piece"><h5>创新药：基本医保与商保更明确分工</h5><p>基本医保继续“保基本”，同时完善商保创新药目录、数据共享和同步结算，为高价创新药提供补充支付路径。商保是否真正放量，关键会从“有没有目录”转到保费规模、理赔能力和直赔基础设施。</p></div>
        </div>
        <div class="research-callout"><b>核心判断：</b>以后分析一个药品的支付环境，不能只问“进没进医保”。更完整的链条是：医保目录资格 → 价格/集采 → DRG/DIP下医院的经济账 → 患者是否下沉 → 基层/零售是否配到 → 商保能否补支付。</div>
      </section>
      ${meta([
        source('官方','国家医保局：《全民医疗保障“十五五”规划》','https://www.nhsa.gov.cn/art/2026/8/19/art_104_21827.html'),
        source('官方','国家医保局：规划政策解读与DRG/DIP、集采、商保细节','https://www.nhsa.gov.cn/art/2026/8/19/art_105_21829.html'),
        source('媒体','财联社：关键量化指标','https://api3.cls.cn/share/article/2457988?app=&os=CailianpressWeb&sv=831'),
        source('媒体','经济观察网：民生与产业影响解读','https://www.eeo.com.cn/2026/0819/1004220.shtml'),
        source('行业','新浪医药：基本医保与商保“双轮驱动”解读','https://finance.sina.com.cn/stock/med/2026-08-22/doc-inipeimp6077373.shtml')
      ])}
    `),

    'beijing-shanghai-commercial-health-insurance-innovation-drug-202607': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">PAYMENT / COMMERCIAL INSURANCE</span><h4>北京、上海在解决的不是“再做一张药品名单”</h4>
        <p>两地政策真正针对的是创新药进入现实医疗场景后的几个堵点：药企和保险怎么定价、医院愿不愿意进药、DRG会不会让医院因为成本超标而少用、药店能不能供到、患者是否还要先垫一大笔钱再慢慢理赔。</p>
        <p>北京允许商保创新药快速挂网，支持药企与保险协商定价、按疗效付费和分期支付；在医院端，商保创新药可不受“一品两规”限制，并探索“双通道”保障供应，对符合条件的新药新技术还可从DRG病组支付中单独处理。上海则进一步强调医疗、医保、商保数据共享、同步结算、直赔以及创新药械适配数据用于保险定价。</p>
      </section>
      <section class="reader-section"><h4>把政策工具和它要解决的堵点一一对应</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>协商定价 / 按疗效付费</h5><p>解决保险公司担心高价药“赔不起、价值不确定”的问题，把一部分疗效风险重新分给药企。</p></div>
          <div class="reader-piece"><h5>快速挂网 / 不受“一品两规”</h5><p>解决“保险愿意赔，但医院药事目录进不去”的准入问题。</p></div>
          <div class="reader-piece"><h5>DRG除外 / 特例单议</h5><p>解决医院在病种预算下担心用了高价创新药就亏损的问题，避免支付方式改革反过来压制合理创新使用。</p></div>
          <div class="reader-piece"><h5>双通道 / 一站式结算</h5><p>前者解决医院不备药时患者去哪买，后者解决患者先垫钱再报销的体验和保险公司的理赔运营成本。</p></div>
        </div>
        <div class="research-callout"><b>最重要的边界：</b>这些政策把“可及基础设施”搭出来，并不等于商保已经拥有和基本医保相当的支付能力。真正要看参保规模、赔付率、药企折扣、医院处方量、直赔覆盖和保险产品是否长期可持续。</div>
      </section>
      ${meta([
        source('官方','北京：支持商业健康保险高质量发展若干措施','https://www.beijing.gov.cn/zhengce/zhengcefagui/202602/t20260213_4514116.html'),
        source('官方','北京：2026创新医药措施与进院/DRG/一站式结算','https://www.beijing.gov.cn/zhengce/zhengcefagui/202606/t20260617_4704451.html'),
        source('官方','上海：商业健康保险支持生物医药创新若干措施','https://www.nhsa.gov.cn/art/2026/7/15/art_14_21434.html'),
        source('解读','北京市医保局：商保政策背景与任务拆解','https://ybj.beijing.gov.cn/zwgk/2024zcjd/202602/t20260212_4511022.html')
      ])}
    `),

    'mnc-china-operating-model-reorganization-202608': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">MNC CHINA / ORGANIZATION</span><h4>先不要把三家公司理解成“同一种重组”</h4>
        <p>这张卡放在一起，是为了观察跨国药企怎样重新定义中国的客户场景和全球位置，但三个事件性质不同：诺和诺德是商业组织重构；勃林格殷格翰是中国区域治理和研发权重提升；诺华是国际商业高管变动。</p>
        <p>其中最值得拆的是诺和诺德。8月17日起，其中国一线业务形成更清晰的医院、新兴渠道、商务与广阔市场三套场景：原糖尿病事业部与胰岛素事业部合并为医院事业部；新设新兴渠道事业部，把零售、线上医药健康管理和私立医疗放在一起；原商务及零售事业部更名为商务与广阔市场事业部，零售业务转出，同时强化基药扩容带来的广阔市场机会；市场端还新增Consumer Engagement团队。</p>
      </section>
      <section class="reader-section"><h4>为什么这次调整有信息量</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>医院和院外不再被当成同一套商业动作</h5><p>零售、线上健康管理和私立医疗被放到同一个新兴渠道事业部，说明企业越来越把“患者离开医院之后怎么被持续触达”当成独立能力，而不是医院销售的附属工作。</p></div>
          <div class="reader-piece"><h5>基药/广阔市场成为单独资源命题</h5><p>商务与广阔市场事业部继续承担基层和广阔市场扩张，与新版基药目录落地形成呼应。这里真正要看的是后续预算、人员和客户覆盖是否跟着迁移，而不是部门名字本身。</p></div>
          <div class="reader-piece"><h5>这还是诺和诺德年内第二轮调整</h5><p>2026年初公司刚按产品线重新拆过糖尿病、胰岛素和肥胖业务；半年后又进一步按医院/院外场景重排，说明快速变化的GLP-1、肥胖、自费零售和基层市场正在倒逼组织继续迭代。</p></div>
          <div class="reader-piece"><h5>BI和诺华更多是“全球接口”信号</h5><p>勃林格殷格翰提升中国在全球治理和早研中的位置，反映中国研发和商业洞察更早进入全球决策；诺华高管离任则首先是管理连续性事件，不能单凭人员变化推断中国战略转向。</p></div>
        </div>
        <div class="viatris-box"><h5>对Viatris意味着什么</h5><p>最值得benchmark的是“客户场景怎么切”，而不是照搬组织图。成熟品牌同时面对医院、零售、线上、私立医疗和基层时，需要检查客户归属、预算、P&L、KPI和决策权是否与场景匹配，尤其是院外患者承接与基层覆盖是否仍被产品线结构限制。</p></div>
      </section>
      ${meta([
        source('行业','医药魔方：诺和诺德8月组织架构调整','https://bydrug.pharmcube.com/news/detail/520e2b7ec1585e5577e6d3c8535e0537'),
        source('媒体','新浪医药/行业汇总：三大事业部、新兴渠道与Consumer Engagement','https://finance.sina.com.cn/wm/2026-08-24/doc-inipkvru1997051.shtml'),
        source('媒体','中华网：诺和诺德年内第二轮架构调整及广阔市场逻辑','https://finance.china.com/yiyao/13004692/20260825/49697736.html'),
        source('历史','医药魔方：2026年初诺和诺德首次产品线调整','https://bydrug.pharmcube.com/news/detail/069e5a1077b1aa955137789a41aaff72')
      ])}
    `),

    'glp1-china-2026': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">GLP-1 / CHINA COMMERCIALIZATION</span><h4>GLP-1中国竞争已经从“谁的药更好”进入“谁能把患者旅程跑通”</h4>
        <p>产品层面，中国GLP-1正在同时经历创新药进入、口服剂型推进、医保/自费分层和仿制化前移；商业层面，Novo、Lilly、Pfizer、信达等又在加大消费者疾病教育和院外触达。Reuters 8月24日报道，地铁、健身房、睡眠呼吸暂停和脂肪肝等疾病教育场景正在成为肥胖市场获客入口。</p>
        <p>这背后有一个监管约束：中国处方药不能像普通消费品一样直接面向公众做广告。因此企业更多做疾病教育、体重管理、共病认知，再把有需求的人导向合规问诊和处方环节。业内争议也在这里：疾病教育和隐性处方药推广之间的边界可能变得模糊。</p>
      </section>
      <section class="reader-section"><h4>真正的竞争链条</h4>
        <div class="research-chain"><span>消费者意识到肥胖是疾病</span><i>→</i><span>线上/线下咨询</span><i>→</i><span>医生评估并开处方</span><i>→</i><span>医院/私立/药店获得药</span><i>→</i><span>自费/医保/商保支付</span><i>→</i><span>长期复购与依从</span></div>
        <p style="margin-top:12px">真实渠道案例已经出现。国药控股零售板块与诺和诺德在2026年启动新一轮“减重中心”合作，覆盖50余家分公司，明确强调医零协同、专业药师和患者服务。这说明GLP-1商业化不只是“销售代表覆盖医院”，还包括零售服务网络、患者教育和长期管理。</p>
      </section>
      <section class="reader-section"><h4>所以看GLP-1，至少同时看五件事</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>产品</h5><p>减重幅度、适应症、口服/注射、给药频率和安全性。</p></div>
          <div class="reader-piece"><h5>供应</h5><p>产能是否足够，缺货会直接打断长期治疗和市场份额。</p></div>
          <div class="reader-piece"><h5>支付</h5><p>医保、自费价格、商保和患者支付能力决定可触达人群。</p></div>
          <div class="reader-piece"><h5>渠道</h5><p>医院、私立医疗、线上问诊、DTP/零售谁掌握患者入口与续方。</p></div>
          <div class="reader-piece"><h5>合规</h5><p>疾病教育能做到什么程度、平台和KOL如何参与，是增长与监管之间的重要边界。</p></div>
        </div>
      </section>
      ${meta([
        source('媒体','Reuters：地铁、健身房与“stealth ads”争议','https://www.reuters.com/legal/litigation/snoring-subways-stealth-ads-how-big-pharma-targets-chinas-waistline-2026-08-24/'),
        source('渠道','国药控股×诺和诺德：减重中心与医零协同','https://sh.sinopharmholding.com/gykg/xwzx/gsxw/2026/6/I1513852927356174336.html'),
        source('媒体','Reuters：GLP-1医保初审','https://www.reuters.com/business/healthcare-pharmaceuticals/pfizer-innovent-glp-1-drugs-pass-china-insurance-preliminary-review-2026-06-29/')
      ])}
    `),

    'china-innovative-drug-outlicensing-scale-up-202607': wrap(`
      <section class="reader-section reader-news"><span class="research-kicker">CHINA BIOTECH / GLOBAL BD</span><h4>“上半年1100亿美元”很大，但先别把它当成药企已经收到的钱</h4>
        <p>国家药监局披露，2026年上半年中国创新药对外授权共81笔，披露交易总额约1100亿美元，约为2025年全年交易总额的80%，覆盖肿瘤、代谢、免疫、神经等10个治疗领域，受让方分布在20多个国家和地区。</p>
        <p>但headline总额包含多年研发、注册和销售里程碑，并不等于签约时的现金。21世纪经济报道引用行业统计称，上半年首付款总额约50亿美元——与1100亿美元headline相比是完全不同的量级。看BD景气度时，应把“交易规模很大”和“现金真正兑现”分开。</p>
      </section>
      <section class="reader-section"><h4>比交易数量更重要的是结构正在升级</h4>
        <div class="reader-pair">
          <div class="reader-piece"><h5>资产阶段更成熟</h5><p>行业盘点显示，越来越多II期、III期或具有更完整临床数据的资产进入跨境合作，不再只是临床前“低成本买期权”。成熟资产通常能换来更高首付款，也要求卖方证明更强差异化。</p></div>
          <div class="reader-piece"><h5>从单资产走向平台和组合</h5><p>交易开始出现多资产、底层平台、共同开发甚至NewCo等形式，说明MNC买的不只是一个分子，也在买持续产出能力。</p></div>
          <div class="reader-piece"><h5>买方逻辑：专利悬崖+内部研发缺口</h5><p>全球药企未来几年面临重磅药专利到期，需要更快补管线；中国资产数量多、推进快、成本效率高，因此成为外部创新的重要供给池。</p></div>
          <div class="reader-piece"><h5>卖方逻辑：BD变成融资和全球开发工具</h5><p>对Biotech而言，license-out既能提供非股权现金，也能把海外临床和商业化风险交给更有能力的伙伴。但长期价值仍取决于资产能否真的推进到获批和销售。</p></div>
        </div>
        <div class="research-callout"><b>所以评价一笔交易：</b>先看首付款和近期付款，再看临床阶段、海外权益范围、里程碑触发条件、royalty/利润分成、谁负责开发，以及买方是否真的把它放进核心管线。</div>
      </section>
      ${meta([
        source('数据','财联社：81笔、约1100亿美元','https://www.cls.cn/detail/2424457'),
        source('媒体','21世纪经济报道：首付款与估值逻辑','https://m.21jingji.com/article/20260713/herald/227ba56d40b9b9567e5e61900acff20b.html'),
        source('行业','医药魔方：交易从早期资产向成熟资产/平台升级','https://bydrug.pharmcube.com/news/detail/52244d7ee674a34d3a366de61dc3417a'),
        source('媒体','21世纪经济报道：从单点出海到能力出海','https://m.21jingji.com/article/20260814/herald/27d6f01f19af1b6b29d7130b2cecb304.html')
      ])}
    `)
  };

  const MARKERS = ['一句话结论','发生了什么','必要背景','背景','规则变化','规则到底怎么运作','结构变化','为什么重要','行业启发','管理启发','商业影响','对Viatris高相关','后续观察点','后续重点','边界说明','核心变化'];
  const markerRe = new RegExp(`(${MARKERS.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')})：`,'g');

  function splitLegacyParagraph(p){
    if(p.closest('.research-detail')) return;
    const text=(p.textContent||'').trim();
    const hits=[...text.matchAll(markerRe)];
    if(hits.length < 2) return;
    const box=document.createElement('div'); box.className='legacy-segments';
    for(let i=0;i<hits.length;i++){
      const start=hits[i].index; const end=i+1<hits.length?hits[i+1].index:text.length;
      const chunk=text.slice(start,end).trim(); const idx=chunk.indexOf('：');
      if(idx<0) continue;
      const row=document.createElement('p'); row.className='legacy-segment';
      row.innerHTML=`<b>${esc(chunk.slice(0,idx))}：</b>${esc(chunk.slice(idx+1).trim())}`;
      box.appendChild(row);
    }
    if(box.children.length) p.replaceWith(box);
  }

  function applyOverride(id,html){
    document.querySelectorAll(`[data-id="${id}"]`).forEach(card=>{
      if(card.dataset.researchV24==='1') return;
      const detail=card.querySelector('.reader-detail');
      if(detail) detail.outerHTML=html;
      const weekly=card.querySelector('.weekly-detail');
      if(weekly && !weekly.querySelector('.research-detail')) weekly.innerHTML=html;
      card.dataset.researchV24='1';
    });
  }

  function patch(){
    Object.entries(OVERRIDES).forEach(([id,html])=>applyOverride(id,html));
    document.querySelectorAll('.reader-news p').forEach(splitLegacyParagraph);
  }

  let tries=0;
  const timer=setInterval(()=>{ patch(); if(++tries>100) clearInterval(timer); },120);
  const obs=new MutationObserver(()=>patch());
  obs.observe(document.body,{childList:true,subtree:true});
})();