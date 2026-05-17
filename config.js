/**
 * 全局配置文件 — 所有页面共享此配置
 * 添加新专题：在 topics 数组中追加一条记录即可
 * 修改研究者信息、方法论、免责声明：统一在此文件修改
 */

const RESEARCH_CONFIG = {

  // ─── 研究者信息 ──────────────────────────────────────────
  researcher: {
    name: "Duan",
    title: "独立研究员",
    bio: "专注于企业软件、B2B SaaS 及科技行业的独立研究。曾在德国 B2B 领域深度参与产品与商业化工作，研究视角兼顾产品逻辑、商业模式与竞争格局。",
    methodology: `本系列研究基于公开信息进行独立分析，信息来源包括：公司年报与财报、分析师研报、官方技术文档、行业媒体报道、专业社区讨论及产品实测。

分析框架围绕三个核心维度展开：商业逻辑（护城河、盈利模式、增长驱动）、技术架构（产品演进、平台策略、生态关系）、竞争格局（市场定位、主要竞争者、差异化来源）。

所有观点代表研究者个人判断，会随新信息持续迭代。欢迎通过邮件提出勘误或补充。`,
    disclaimer: `本研究仅供参考，不构成任何投资建议或商业决策依据。所有数据来源于公开渠道，准确性以原始来源为准。研究者可能持有相关证券头寸，但不会因此影响研究结论的客观性。转载需注明来源，商业使用请提前联系。`,
    contact: ""
  },

  // ─── 当前研究对象 ─────────────────────────────────────────
  subject: {
    name: "SAP SE",
    ticker: "SAP",
    exchange: "NYSE · XETRA",
    sector: "企业软件 / Enterprise Software",
    founded: "1972",
    hq: "Walldorf, Germany",
    employees: "~107,000",
    marketCap: "约 $2,500 亿（2026 年）",

    // 公司简介：重要信息 + 行业地位（首页第一段）
    description: "SAP 是全球最大的企业应用软件公司之一，总部位于德国 Walldorf，1972 年由五位前 IBM 工程师创立。其 ERP 系统是全球约 77% 的财富 500 强企业核心业务流程的底层系统，在制造、金融、零售、能源等几乎所有主要行业占据主导地位。2025 年总营收 €368 亿，市值约 $2,500 亿，是欧洲市值最高的科技公司。",

    // 研究价值：为什么研究这家公司（首页第二段）
    motivation: `我们研究 SAP 的核心价值在于：理解企业软件护城河的底层逻辑——SAP 的客户粘性是迁移成本、数据积累与生态体系三重叠加的结果，这套逻辑在 B2B SaaS 领域具有普遍参考价值。同时，S/4HANA 迁移窗口期（2025–2030）正在为周边产品创造罕见的市场机会，而 SAP 正从"卖 ERP 授权"向"卖企业运营平台"转型的过程，也是理解企业软件下一个十年竞争格局的关键视角。`,

    // 核心研究问题（驱动整个研究系列）
    coreQuestions: [
      "SAP 的护城河来自哪里？客户粘性的底层逻辑是什么？",
      "云转型战略的真实进展：RISE with SAP 能否完成历史使命？",
      "与 Oracle、Workday、ServiceNow 相比，SAP 的竞争边界在哪里？",
      "AI 集成（Joule）能否成为 SAP 下一个十年的增长引擎？",
      "S/4HANA 迁移窗口期对 ISV 和周边产品意味着什么机会？"
    ],

    startDate: "2026-05",
    lastUpdated: "2026-05-14"
  },

  // ─── 专题列表 ─────────────────────────────────────────────
  // status: "published" | "draft" | "coming"
  topics: [
    {
      id: "P1M1",
      slug: "phase1-profit-model",
      title: "盈利模式及其变迁",
      subtitle: "SAP 如何赚钱：从一次性授权到云订阅的收入重构",
      summary: "基于五年财务数据，解析 SAP 收入结构的变迁逻辑、Cloud 内部增长分化、以及 Cloud 转型云端价值假设成立的三个前提条件。",
      tags: ["财务", "云转型", "商业模式"],
      status: "published",
      publishDate: "2026-05-14",
      readingTime: 18,
      file: "topics/phase1-profit-model.html"
    },
    {
      id: "01",
      slug: "company-overview",
      title: "公司全景",
      subtitle: "从小镇创业到全球巨头：SAP 的历史沿革与战略演变",
      summary: "梳理 SAP 52 年的发展脉络，理解其从德国中型企业服务商成长为全球 ERP 霸主的内在逻辑，以及当前云转型战略的历史背景。",
      tags: ["历史", "战略", "商业模式"],
      status: "published",
      publishDate: "2026-05-14",
      readingTime: 22,
      file: "topics/01-company-overview.html"
    },
    {
      id: "02",
      slug: "business-model",
      title: "商业模式解构",
      subtitle: "ERP 帝国的收入逻辑：订阅、许可与服务的三角结构",
      summary: "深入分析 SAP 的收入构成、定价模式、客户分层策略，以及云迁移如何重塑其长期现金流特征。",
      tags: ["财务", "商业模式", "云转型"],
      status: "draft",
      publishDate: null,
      readingTime: 28,
      file: "topics/02-business-model.html"
    },
    {
      id: "03",
      slug: "tech-architecture",
      title: "技术架构深解",
      subtitle: "从 R/3 到 S/4HANA：二十年架构演进与迁移的真实难度",
      summary: "解构 SAP 核心技术栈的演进逻辑，分析 HANA 内存数据库、BTP 平台、Fiori 界面层的战略意图，以及企业迁移面临的真实技术挑战。",
      tags: ["技术架构", "S/4HANA", "BTP"],
      status: "draft",
      publishDate: null,
      readingTime: 35,
      file: "topics/03-tech-architecture.html"
    },
    {
      id: "04",
      slug: "competitive-landscape",
      title: "竞争格局分析",
      subtitle: "四强博弈：SAP vs Oracle vs Workday vs ServiceNow",
      summary: "横向对比主要竞争对手的市场定位、核心优势与薄弱环节，判断 SAP 在不同细分市场的竞争态势与护城河厚度。",
      tags: ["竞争格局", "市场分析", "Oracle", "Workday"],
      status: "coming",
      publishDate: null,
      readingTime: 32,
      file: "topics/04-competitive-landscape.html"
    }
  ],

  // ─── 英语内容 ─────────────────────────────────────────────
  // English versions of published topics
  englishTopics: [
    {
      id: "P1M1",
      slug: "en-phase1-profit-model",
      title: "Profit Model & Transformation",
      subtitle: "How SAP makes money: restructuring revenue from perpetual licenses to cloud subscriptions",
      summary: "Based on five years of financial data, this report analyzes SAP's revenue structure evolution, growth divergence within Cloud, and the three preconditions for the cloud transition value thesis to hold.",
      tags: ["Financials", "Cloud Transition", "Business Model"],
      status: "published",
      publishDate: "2026-05-14",
      readingTime: 18,
      file: "topics/en-phase1-profit-model.html"
    }
  ],

  // ─── 站点信息 ──────────────────────────────────────────────
  site: {
    name: "Dance Research",
    tagline: "独立研究 · 长期视角",
    copyright: "© 2026 Duan",
    license: "非商业用途可自由转载，需注明来源。"
  }
};
