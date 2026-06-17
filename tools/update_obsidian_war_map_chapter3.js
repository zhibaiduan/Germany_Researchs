const fs = require('fs');

const filePath = '/Users/miumiu/Documents/Obsidian/小段想东想西/T-B2B-German/Enterprise AI/企业 AI 的战争地图：谁在争夺流程执行权.md';

const text = fs.readFileSync(filePath, 'utf8');
const endMarker = '## 四、哪些战役已经打响，哪些会决定总战争';

const startMatch = text.match(/^## 三、.*$/m);
const start = startMatch ? startMatch.index : -1;
const end = text.indexOf(endMarker);

if (start === -1 || end === -1 || end <= start) {
  throw new Error('Unable to locate chapter 3 boundaries.');
}

const replacement = `## 三、六个玩家都想把 AI 变成什么？

知道六个玩家基本情况之后，我们可以暂时把分析师的笔放下来，换一种方式看它们。

想象这是一场企业 AI 赛前采访。六个选手已经站到场边，主持人问同一个问题：

> 接下来，你打算怎么打？

[一张漫画：六个企业软件玩家站在赛场入口，主持人举着话筒问“你打算如何行动？”]

先把沙盘摆出来。后面六个选手的发言，都可以放在这张图里理解：

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

这张沙盘有四层。

最外层是工作入口。这里决定 AI 能不能被人每天看见、使用和信任。Microsoft 最强，Salesforce 有 Slack，SAP 有 Joule，ServiceNow 有 Employee Center。

中层是 agent 构建与流程编排。这里决定企业能不能把 AI 从单个助手变成一组可部署、可管理、可扩展的 agent。

内层是业务流程与核心记录。这里开始接近真正的 system of record：ERP、CRM、HCM、ITSM、数据库和云应用。

最核心的地方，是受控流程执行权。也就是 AI 能不能在权限、审计和责任边界内，触发动作、修改状态、推进审批、处理异常。

接下来听六个玩家说话，就会更清楚：它们讲的发布会愿景，实际上都是从自己的位置出发，试图往这张沙盘的更深处走。

这个问题很有意思。因为发布会上的词通常都很大：Autonomous Enterprise、agent-first、AI Control Tower、Agentforce 360、Fusion Agentic Applications、Agent System of Record。它们听起来像六套不同的营销语言，但如果放回上一章的原始地盘里看，就会发现它们并不是随便喊出来的。

每家公司都在用 AI 重新解释自己的老位置。

**Microsoft 先上场。**

它大概会说：“我不急着和 SAP 争 ERP，也不急着和 Salesforce 争 CRM。我先站在员工每天工作的地方。你每天打开 Outlook、Teams、Word、Excel，开发者每天用 GitHub 和 VS Code，企业应用和数据跑在 Azure 上。那 AI 为什么要待在某个孤立系统里？Copilot 应该出现在工作发生的地方。Copilot Studio 和 Azure AI Foundry 让企业自己造 agent，Graph、Fabric、Work IQ / Microsoft IQ 把邮件、会议、文档、人员关系、业务数据和开发流程变成上下文。先让 AI 成为默认工作入口，后面的业务流程，自然可以通过连接器、数据平台和生态一点点接进来。”

这就是 Microsoft 的 agent-first 叙事。它说的是一个 AI 贴着人走的世界：人在哪里写、聊、开会、做表、写代码，AI 就在哪里出现。

**SAP 接过话筒。**

它会说：“企业 AI 不能只靠聪明聊天框。我的客户跑的是财务、采购、供应链、制造、库存和合规流程。一个总结会议的 AI 可以偶尔答偏；一个放行付款、修改库存、处理发票异常的 AI 不能只是‘差不多对’。所以我要讲 Autonomous Enterprise。Joule 是入口，Business Data Cloud 是受治理的数据底座，Knowledge Graph 给 agent 一张业务实体和流程关系图，Domain Models 让 AI 理解 SAP 里的业务对象，Joule Studio 让企业和伙伴构建 agent，Autonomous Suite 把 agent 放进 Finance、Spend、Supply Chain、HCM、CX 这些真实流程里。我要争的不是最热闹的聊天入口，而是 AI 能不能在受控条件下进入企业真正的流程执行。”

这很 SAP。它不会把 AI 讲成一个轻飘飘的助手，而是讲成一套受控自治的企业运行架构。

**Salesforce 会把话题拉回客户。**

它会说：“我最关心客户。销售怎么跟进线索，客服怎么解决问题，营销怎么触达客户，客户成功怎么续约，这些都在我的世界里。Agentforce 360 要把 humans、apps、agents、data 连在一起。Customer 360 是客户记录，Data 360 和 Intelligent Context 给 agent 上下文，Agentforce Builder 让团队构建 agent，Agent Script 让行为更可控，Agentforce Voice 把它带进电话和客服场景，Slack 则是人和 agent 一起工作的地方。你要最快看到 AI 的业务结果，就先看客户前台：少一个客服工单，多一次成交，多一次续约，这些都是业务部门听得懂的价值。”

Salesforce 讲的不是全企业自动驾驶，而是客户增长系统的 AI 化。它最自然的战场不是库存和制造，而是销售、客服、营销和客户成功。

**ServiceNow 的回答会更像一个控制室管理员。**

它会说：“你们都在造 agent，但企业真正会遇到的问题是：谁知道这些 agent 有多少？谁批准它们？谁测试它们？谁看得见它们做了什么？谁能在出问题时停掉它们？当模型、agent、数据源和 workflow 越来越多，企业不能让每个部门自己乱接工具，最后变成 shadow AI。所以我要做 AI Control Tower、Universal AI Gateway、Agent Registry、Agent Testing & Evaluation、Agent Observability。我的位置不是舞台中央那个最会表演的 agent，而是后台那间控制室：登记、调度、观察、审计，必要时按下暂停键。”

这也很 ServiceNow。它原本就做请求、工单、服务、审批、分派、升级和审计。到了 AI agent 时代，它只是把这套能力往上抬了一层：不只是管人和工单，也要管 agent 和 agent 触发的动作。

**Oracle 会把话题拉回全栈闭环。**

它会说：“AI 不应该只是外挂在企业应用旁边。它应该生在交易系统、数据库和云基础设施里面。Fusion Agentic Applications 里的 agent 可以访问企业数据、workflow、policy、approval hierarchy、permissions 和 transactional context，在 Finance、HR、Supply Chain、CX 等流程里围绕业务目标推进任务。Oracle Database、Fusion Apps、OCI、AI Agent Studio 都在同一套体系里。数据在这里，权限在这里，应用在这里，云也在这里；那 agent 最好也在这里。”

Oracle 的口吻会很工程化，也很全栈。它想证明的是：如果数据库、应用和云都在一个闭环里，AI 就可以更接近数据、更接近权限、更接近交易动作。

**Workday 最后出场。**

它会说：“我不需要覆盖企业的一切。我先把 people 和 money 管好。员工、岗位、技能、组织结构、薪酬、绩效、招聘、排班、离职，以及一部分财务流程，本来就是我的地盘。Illuminate 要把 HR、Finance、Planning 里的上下文变成 purpose-built agents。Agent System of Record 更进一步，把 agent 当成一种新的 workforce 来管理：它是谁，能做什么，访问什么数据，成本多少，ROI 如何，是否合规，什么时候应该下线。以后企业要管理的，不只是员工这支队伍，也包括 digital workforce 这支新队伍。”

Workday 的叙事不大而全，但很聚焦。它不假装自己是完整企业运行层，而是把人、组织、岗位、技能、薪酬、预算和 agent 放进同一套管理逻辑里。

六个选手讲完，差异就出来了。

Microsoft 说的是：我先占住工作入口，再往流程里走。

SAP 说的是：我掌握业务内核，所以我要把 AI 放进受控流程执行。

Salesforce 说的是：我先把客户前台和收入流程 AI 化。

ServiceNow 说的是：agent 多了以后，企业需要控制塔。

Oracle 说的是：AI 应该原生嵌在数据库、应用和云的闭环里。

Workday 说的是：未来企业要管理的不只是员工，还有数字劳动力。

如果把这些话翻译成战争地图，它们其实是六条不同的进攻箭头。

Microsoft 从外层入口往里打，想把个人效率和办公协同变成更深的业务流程入口。它的优势是扩散快，但卡点是入口不等于执行权。员工在 Teams 里问 Copilot，不代表 Microsoft 自动掌握采购、库存、付款和关账流程。

SAP 从内核往外打，想把 ERP 流程、业务语义和权限审计包装成 autonomous enterprise。它离高价值流程最近，但卡点是入口弱、体验重、迁云慢、客户定制复杂。

Salesforce 从客户流程往收入执行打，想把 CRM 场景里的部门效率升级成客户流程控制层。它最容易证明 ROI，但如果想进入完整收入执行，就必须和 ERP、财务、供应链系统更深连接。

ServiceNow 从 workflow 往企业流程控制层打，想让企业里不同 agent、不同服务请求、不同系统动作都经过它的调度和治理。它的机会是治理和编排，卡点是业务事实深度。

Oracle 从数据库、应用和云的闭环往 AI 执行打，想证明全栈一体化能让 AI 更安全、更接近数据、更容易落地。它的卡点是存量格局，尤其是 SAP 已经很深的 ERP 客户。

Workday 则守住 HCM 和 Finance 的局部高地，想证明人和组织数据本身就是一个足够深的 AI 战场。它的数据敏感、稳定、难替换，但采购、库存、制造、供应链、订单履约不是它最天然的地盘。

回到开头那张沙盘，我们就能看见：六家公司不是在同一条线上比赛，而是从不同入口、不同数据和不同流程位置，向更深的企业执行层推进。

Enterprise AI 的竞争，不是所有人打一场仗，而是很多场局部战役叠在一起。

`;

const updated = text.slice(0, start) + replacement + text.slice(end);
fs.writeFileSync(filePath, updated);

console.log(`Updated ${filePath}`);
