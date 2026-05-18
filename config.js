/**
 * 全局配置文件 — 所有页面共享此配置
 * 双语内容通过 zh / en 子对象管理
 */

const RESEARCH_CONFIG = {

  // ─── 研究者信息 ──────────────────────────────────────────
  researcher: {
    name: "Duan",
    zh: {
      aboutTitle: "关于作者与研究说明",
      intro: "Duan，曾在办公协同与效率软件领域担任产品经理 6 年，目前于柏林求学，持续关注德国 B2B 软件、企业数字化与 AI 落地相关议题。",
      focusLabel: "长期关注的问题包括：",
      focusItems: [
        "德国 B2B 软件市场的结构与特征",
        "企业如何在特定市场、文化与监管环境下定义问题、设计产品并推进 Go-to-Market",
        "数字化与 AI 系统如何真正被组织采用，并在实际业务中发挥价值"
      ],
      coreLabel: "这些问题背后的核心，其实是：",
      coreInsight: "在市场、组织、监管、技术与用户体验等多重约束下，企业如何设计真正有效、可落地、可被采用的产品与行动策略，并完成从概念到规模化采用的闭环。",
      aiNote: "同时，也持续关注 AI、自动化与企业系统的结合方式，尤其关注其在真实商业环境中的可控性、责任边界与长期价值。",
      disclaimer: "相关研究与分析主要基于公开信息、行业观察与个人理解整理，内容仅用于学习交流与观点讨论，不构成商业、法律或投资建议。"
    },
    en: {
      aboutTitle: "About the Author",
      intro: "Duan is a product manager with 6 years of experience in office collaboration and productivity software. Currently based in Berlin, with ongoing focus on German B2B software, enterprise digitalization, and AI adoption.",
      focusLabel: "Areas of ongoing focus:",
      focusItems: [
        "The structure and characteristics of the German B2B software market",
        "How companies define problems, design products, and execute Go-to-Market within specific market, cultural, and regulatory environments",
        "How digitalization and AI systems are genuinely adopted by organizations and deliver value in real business operations"
      ],
      coreLabel: "The underlying question across all of this:",
      coreInsight: "Under the multi-layered constraints of market, organization, regulation, technology, and user experience — how can companies design products and strategies that are truly effective, deployable, and adoptable, completing the loop from concept to scaled adoption?",
      aiNote: "Also tracking how AI, automation, and enterprise systems intersect — particularly their controllability, accountability boundaries, and long-term value in real business environments.",
      disclaimer: "Research and analysis are based primarily on public information, industry observation, and personal interpretation. Content is for learning and discussion only, and does not constitute commercial, legal, or investment advice."
    },
    contact: ""
  },

  // ─── 当前研究对象 ─────────────────────────────────────────
  subject: {
    name: "SAP SE",
    ticker: "SAP",
    exchange: "NYSE · XETRA",
    founded: "1972",
    hq: "Walldorf, Germany",
    employees: "~107,000",
    startDate: "2026-05",
    lastUpdated: "2026-05-14",

    zh: {
      sector: "企业软件 / Enterprise Software",
      marketCap: "约 $2,500 亿（2026 年）",
      description: "SAP 是全球最大的企业应用软件公司之一，总部位于德国 Walldorf，1972 年由五位前 IBM 工程师创立。其 ERP 系统是全球约 77% 的财富 500 强企业核心业务流程的底层系统，在制造、金融、零售、能源等几乎所有主要行业占据主导地位。2025 年总营收 €368 亿，市值约 $2,500 亿，是欧洲市值最高的科技公司。",
      motivation: "我们研究 SAP 的核心价值在于两层。\n\n一层是通用价值：SAP 是企业软件护城河逻辑的最佳标本——迁移成本、数据积累、生态体系三重叠加的自我强化正循环，在 B2B SaaS 领域具有普遍参考意义。S/4HANA 迁移窗口期（2025–2030）正在创造十年级别的机会，而它从\u201c卖授权\u201d到\u201c卖平台\u201d的转型，是理解行业下一个十年竞争格局的关键视角。\n\n另一层是本地价值：在德国，SAP 就是 B2B 软件运转的基础设施本身。整个生态围绕它或在它之上展开。研究它的业务边界、擅长与短板、生态设施、竞争格局与未来动向，就是给德国 B2B 软件市场装上了信号标和地震仪——看得清方向在哪、震感从哪来、自己该往哪走。",
      coreQuestions: [
        "SAP 的护城河来自哪里？客户粘性的底层逻辑是什么？",
        "云转型战略的真实进展：RISE with SAP 能否完成历史使命？",
        "与 Oracle、Workday、ServiceNow 相比，SAP 的竞争边界在哪里？",
        "AI 集成（Joule）能否成为 SAP 下一个十年的增长引擎？",
        "S/4HANA 迁移窗口期对 ISV 和周边产品意味着什么机会？"
      ],
      metaLabels: { founded: "成立年份", hq: "总部", employees: "员工规模", marketCap: "市值", lastUpdated: "最近更新" }
    },

    en: {
      sector: "Enterprise Software",
      marketCap: "~$250B (2026)",
      description: "SAP is one of the world's largest enterprise application software companies, founded in 1972 by five former IBM engineers and headquartered in Walldorf, Germany. Its ERP systems underpin the core business processes of approximately 77% of Fortune 500 companies, holding a dominant position across manufacturing, finance, retail, energy, and virtually every major industry. Total revenue in 2025 reached €36.8 billion, with a market capitalization of approximately $250 billion — Europe's highest-valued technology company.",
      motivation: "We study SAP at two levels.\n\nThe first is universal value: SAP is the definitive case study in enterprise software moat logic — a self-reinforcing flywheel of switching costs, data accumulation, and ecosystem lock-in that has broad reference value across B2B SaaS. The S/4HANA migration window (2025–2030) is creating a decade-scale opportunity, and SAP's transition from 'selling licenses' to 'selling a platform' is the key lens for understanding the competitive landscape of enterprise software over the next decade.\n\nThe second is local value: In Germany, SAP is the infrastructure of B2B software itself. The entire ecosystem operates around it or on top of it. Studying its business boundaries, strengths and weaknesses, ecosystem dynamics, competitive landscape, and future direction is like installing a signal beacon and seismograph on the German B2B software market — revealing where things are heading, where tremors originate, and where you should be positioning.",
      coreQuestions: [
        "Where does SAP's moat come from? What is the underlying logic of customer stickiness?",
        "Cloud transformation progress: Can RISE with SAP fulfill its historical mission?",
        "Compared to Oracle, Workday, and ServiceNow — where does SAP's competitive boundary lie?",
        "Can AI integration (Joule) become SAP's growth engine for the next decade?",
        "What opportunities does the S/4HANA migration window create for ISVs and adjacent products?"
      ],
      metaLabels: { founded: "Founded", hq: "Headquarters", employees: "Employees", marketCap: "Market Cap", lastUpdated: "Last Updated" }
    }
  },

  // ─── 专题列表 ─────────────────────────────────────────────
  topics: [
    {
      id: "P1M1",
      slug: "phase1-profit-model",
      enSlug: "en-phase1-profit-model",
      status: "published",
      publishDate: "2026-05-14",
      readingTime: 18,
      zh: {
        title: "盈利模式及其变迁",
        subtitle: "SAP 如何赚钱：从一次性授权到云订阅的收入重构",
        summary: "基于五年财务数据，解析 SAP 收入结构的变迁逻辑、Cloud 内部增长分化、以及 Cloud 转型云端价值假设成立的三个前提条件。",
        tags: ["财务", "云转型", "商业模式"]
      },
      en: {
        title: "Profit Model & Transformation",
        subtitle: "How SAP makes money: restructuring revenue from perpetual licenses to cloud subscriptions",
        summary: "Drawing on five years of financial data, this report analyzes SAP's revenue structure evolution, growth divergence within Cloud, and the three preconditions for the cloud transition value thesis to hold.",
        tags: ["Financials", "Cloud Transition", "Business Model"]
      }
    }
  ],

  // ─── 站点信息 ──────────────────────────────────────────────
  site: {
    name: "Duan's Research",
    zh: {
      tagline: "独立研究 · 长期视角",
      copyright: "© 2026 Duan",
      license: "非商业用途可自由转载，需注明来源。"
    },
    en: {
      tagline: "Independent Research · Long-term Perspective",
      copyright: "© 2026 Duan",
      license: "Free to share for non-commercial use with attribution."
    }
  }
};
