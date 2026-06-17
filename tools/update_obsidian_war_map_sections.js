const fs = require('fs');

const filePath = '/Users/miumiu/Documents/Obsidian/小段想东想西/T-B2B-German/Enterprise AI/企业 AI 的战争地图：谁在争夺流程执行权.md';

const text = fs.readFileSync(filePath, 'utf8');
const startMarker = '## 二、Enterprise AI的六个玩家';
const endMarker = '## 四、哪些战役已经打响，哪些会决定总战争';

const start = text.indexOf(startMarker);
const end = text.indexOf(endMarker);

if (start === -1 || end === -1 || end <= start) {
  throw new Error('Unable to locate section boundaries.');
}

const replacement = `## 二、六个玩家的原始地盘

理解完企业可能从哪些场景采用 AI，下一步是看玩家。

如果你不是企业软件行业里的人，面对 Enterprise AI 这个市场，第一反应很可能是：这里到底有哪些主要玩家？

这篇文章先选六个最重要的企业软件玩家：Microsoft、SAP、Salesforce、ServiceNow、Oracle、Workday。

它们不是所有玩家，也不覆盖所有 AI 公司。但如果我们想理解大型企业采用 AI 时的主战场，这六家公司基本代表了几个最关键的入口：办公协同、ERP、CRM、workflow、数据库/云应用、HCM。

这一章先不急着讲它们的 AI 战略。

它只回答一个更基础的问题：

> 这六家公司，原来分别站在哪里？

因为 Enterprise AI 的竞争不是从零开始。每家公司讲 AI 时，都会带着自己的老地盘、老客户、老数据、老流程和老短板上场。看不清原始地盘，就看不清后面的进攻方向。

Microsoft 像企业工作入口的总门厅。员工每天打开 Outlook、Teams、Word、Excel、PowerPoint，开发者用 GitHub 和 VS Code，很多企业的应用和数据也跑在 Azure 上。所以 Microsoft 的原始优势不是某一个业务流程，而是“人每天在哪里工作”：邮件、会议、文档、表格、协同关系和开发者生态。它的短板也在这里：Microsoft 很懂工作上下文，却不天然掌握深层业务事实。采购订单、库存状态、发票匹配、成本中心、供应商主数据，不一定在 Microsoft 手里。

SAP 像企业后场的总账本和流程总管。很多大企业的财务、采购、供应链、制造、库存事实都在 SAP 里。SAP 的原始优势不是入口，而是“真实业务世界的底账”：订单、物料、供应商、发票、成本中心、审批和审计。它的短板也明显：员工日常入口弱，体验重，迁云和流程标准化都很慢。

Salesforce 像企业前台的客户关系和收入流程指挥官。销售、客服、营销、客户成功，这些收入前台流程大量发生在 Salesforce 体系里。它最懂客户交互、销售服务数据和收入流程；但它离财务、库存、制造、供应链这些后场核心流程较远。

ServiceNow 像企业内部工单和流程调度中心。IT 工单、员工服务、安全事件、变更管理、跨部门 workflow，是它的强项。它不一定拥有核心交易记录，但它很懂“一个请求如何被分派、处理、升级、关闭和审计”。

Oracle 像数据库堡垒加全栈应用云。它长期拥有 Oracle Database，也有 Fusion Apps 和 OCI。它的逻辑是：数据库、企业应用、云基础设施都在自己体系里。它的优势是数据库、财务云、应用和云闭环；难点是，在 SAP 已经深度占据的大型 ERP 存量里，替换成本很高。

Workday 像人力和组织数据管家。它最强的是 HCM，也就是人力资本管理：招聘、入职、组织架构、薪酬、绩效、人才、排班、离职。后来它也扩展到部分财务管理。Workday 不一定能成为完整企业运行层，但在人、组织和部分财务场景里，它的数据很有价值。

介绍完它们之后，我们再把它们横向拉起来看，就会发现：它们并不是站在同一个起跑线上。

如果把六家公司的原始地盘画成一张图，大概是这样：

\`\`\`text
                   Microsoft
              工作入口 / 云 / 开发者

Salesforce                              ServiceNow
客户流程 / 收入前台                  工单 / 服务 / workflow

                     SAP
        ERP / 财务 / 供应链 / 制造核心流程

Oracle                                  Workday
数据库 / 云 / 应用闭环                人力 / 组织 / 财务局部
\`\`\`

这就是后续判断的起点：每家公司的 AI 战略，都在放大自己的原始优势，也都在试图跨过自己的原始短板。

## 三、六个玩家的进攻箭头

知道六个玩家原来站在哪里之后，下一步才是看它们往哪里打。

第二章是静态地形图：谁占着什么入口、什么系统、什么数据、什么流程。

第三章是动态进攻图：它们从自己的根据地出发，想把 AI 推向哪里，又会卡在哪里。

换句话说，这一章不再重复介绍“它们是谁”，而是问：

> 它们分别想从哪里出发，向哪一层企业 AI 战场推进？

Microsoft 的进攻方向，是从工作入口往业务流程里打。

它不会一开始就说自己比 SAP 更懂采购订单，也不会说自己比 Salesforce 更懂客户关系。它的打法是：先让 Copilot 出现在员工每天工作的地方，再用 Graph、Fabric、Copilot Studio、Azure AI Foundry 和各种连接器，把 AI 从邮件、会议、文档、表格，逐步带进企业流程。

这条路线的优势是扩散快。只要员工每天都在 Teams、Outlook、Excel 里工作，Microsoft 就有机会成为企业 AI 的默认入口。

但它的关键卡点是：入口不等于执行权。员工在 Teams 里问 Copilot，不代表 Microsoft 自动掌握采购、库存、付款和关账流程。它要进入高价值流程，必须依赖连接器、合作伙伴、客户数据治理，以及和 SAP、Salesforce、ServiceNow、Workday 这些 system of record 的关系。

所以 Microsoft 的战略不是从业务内核往外扩，而是从工作入口往里打。

SAP 的进攻方向，是从业务内核往 AI 执行层打。

SAP 不需要先证明自己能做一个聊天助手。它真正想证明的是：企业 AI 如果要进入财务、采购、供应链、制造、库存和合规流程，就必须理解 business context。Business Data Cloud、Knowledge Graph、Domain Models、Joule Studio、Autonomous Suite，这些东西本质上都在服务同一个目标：让 AI agent 不只是生成答案，而是理解业务对象、权限、流程和审计之后，再进入真实业务动作。

这条路线的优势是离高价值流程最近。SAP 原本就掌握订单、供应商、物料、发票、成本中心和审批记录。

但它的卡点也很清楚：入口弱、体验重、迁云慢、客户定制复杂。如果 SAP 不能让这些 AI 能力更容易被员工使用、更容易被伙伴实施，它就可能拥有最深的数据，却不一定拥有最自然的 AI 工作入口。

所以 SAP 的战略不是从入口往里打，而是从企业流程内核往外打。

Salesforce 的进攻方向，是从客户前台往收入流程执行打。

它最自然的战场是销售、客服、营销、客户成功。Agentforce、Data 360、Customer 360、Slack 这些能力连在一起，目标不是覆盖整个企业运行层，而是先把客户交互和收入流程变成 agent 能直接参与的工作场。

这条路线的优势是 ROI 清楚。客服降本、销售提效、营销转化、客户成功续约，这些都离业务部门的预算和业绩很近。

它的卡点是后场距离。客户问题常常会牵出库存、发货、开票、合同、付款和供应链。如果 Salesforce 的 agent 只停在前台，它能优化客户交互；但如果想进入完整收入执行，就必须和 ERP、财务、供应链系统更深连接。

所以 Salesforce 的战略，是从客户关系往收入流程控制层打。

ServiceNow 的进攻方向，是从 workflow 和治理往多 agent 控制层打。

它不一定拥有最深的核心交易数据，但它很懂企业里的请求、工单、服务、审批、分派、升级和审计。AI agent 越多，企业越会遇到一个新问题：谁知道这些 agent 有多少？谁批准它们？谁看它们做了什么？谁能在出问题时停掉它们？

这就是 ServiceNow 的机会。AI Control Tower、Agent Registry、Agent Testing & Evaluation、Agent Observability 这些叙事，本质上是在说：企业不能只有一堆会干活的 agent，还需要一套能编排、治理和追责的控制层。

它的卡点是业务事实深度。ServiceNow 能调度流程，但未必天然拥有每个行业、每个交易系统里的核心记录。它要赢，就必须证明自己不仅能管工单，也能管跨系统业务动作。

所以 ServiceNow 的战略，是从企业 workflow 往 AI 控制塔打。

Oracle 的进攻方向，是从数据库、应用和云闭环往原生 AI 执行打。

Oracle 的逻辑很直接：AI 不应该只是外挂在企业应用旁边，而应该生在交易系统、数据库和云基础设施里面。Fusion Agentic Applications、Oracle Database、OCI、AI Agent Studio 这些能力放在一起，目标是证明一个全栈闭环可以让 agent 更接近数据、更接近权限、更接近 workflow，也更容易衡量和治理。

这条路线的优势是闭环。数据库、企业应用、云基础设施都在自己体系里，AI 可以在数据所在的位置推理和执行。

但它的卡点是存量格局。很多大型企业的核心 ERP，尤其在制造、供应链和复杂财务场景里，已经深度跑在 SAP 上。Oracle 要打进这些核心流程，面对的是很高的替换成本和实施惯性。

所以 Oracle 的战略，是从全栈闭环往交易执行层打。

Workday 的进攻方向，是从人和组织数据守住 HCM 高地，再向部分财务流程延伸。

Workday 不需要假装自己覆盖企业的一切。它的关键地盘是 people 和 money：员工、岗位、技能、组织结构、薪酬、绩效、招聘、排班、离职，以及一部分财务管理流程。Illuminate 和 Agent System of Record 的意义在这里：它想把 AI agent 放进人、组织和财务语境里，甚至把 agent 当成一种新的 workforce 来管理。

这条路线的优势是数据敏感、稳定、难替换。人和组织数据一旦进入核心管理流程，企业不会轻易迁移。

它的卡点是上限。Workday 可以在人、组织和部分财务场景里形成很深的利润池，但它未必能成为完整企业运行层。采购、库存、制造、供应链、订单履约这些流程，不是它最天然的地盘。

所以 Workday 的战略，是守住 HCM 和组织智能这块局部高价值战场。

六个玩家的路线放到一起，差异就很清楚：

Microsoft 从外层入口往里打，想把个人效率和办公协同变成更深的业务流程入口。

SAP 从内核往外打，想把 ERP 流程、业务语义和权限审计包装成 autonomous enterprise。

Salesforce 从客户流程往收入执行打，想把 CRM 场景里的部门效率升级成客户流程控制层。

ServiceNow 从 workflow 往企业流程控制层打，想让企业里不同 agent、不同服务请求、不同系统动作都经过它的调度和治理。

Oracle 从数据库、应用和云的闭环往 AI 执行打，想证明全栈一体化能让 AI 更安全、更接近数据、更容易落地。

Workday 则守住 HCM 和 Finance 的局部高地，想证明人和组织数据本身就是一个足够深的 AI 战场。

把这些路线放到一张沙盘图里，可以想象成每个玩家都有自己的根据地，也都有自己的进攻箭头：

\`\`\`text
外层：工作入口
Microsoft Teams / Office / Copilot
Salesforce Slack
SAP Joule Work
ServiceNow Employee Center

        ↓ 向内打

中层：Agent 构建与流程编排
Copilot Studio / Agentforce / Joule Studio
ServiceNow AI Agents / Oracle AI Agent Studio

        ↓ 向高价值流程打

内层：业务流程与核心记录
SAP ERP / Oracle Fusion / Salesforce CRM / Workday HCM / ServiceNow ITSM

        ↓

核心：受控流程执行权
订单、库存、合同、发票、付款、员工、供应商、成本中心
\`\`\`

Enterprise AI 的竞争，不是所有人打一场仗，而是很多场局部战役叠在一起。

`;

const updated = text.slice(0, start) + replacement + text.slice(end);
fs.writeFileSync(filePath, updated);

console.log(`Updated ${filePath}`);
