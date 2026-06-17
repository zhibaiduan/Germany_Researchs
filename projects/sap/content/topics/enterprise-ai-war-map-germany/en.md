---
title: "SAP, Microsoft, and ServiceNow Are All Building Enterprise AI: A Map of What They Are Really Competing For"
短标题: "AI War Map · Germany"
description: "A Germany-focused map of enterprise AI competition across personal assistants, departmental tasks, process orchestration, core execution, data intelligence, and governance."
type: ""
status: published
category: "AI War Map · Germany"
tags:
  - Enterprise AI
  - Germany
  - Execution Control
created: 2026-06-12
---

# SAP, Microsoft, and ServiceNow Are All Building Enterprise AI: A Map of What They Are Really Competing For

At the beginning of 2026, several enterprise software conferences suddenly seemed to tell the same story.

SAP talked about the Autonomous Enterprise. Microsoft talked about Copilot and agents. ServiceNow talked about an AI Control Tower. Salesforce talked about Agentforce. Oracle and Workday were also embedding AI agents deeper into their enterprise applications.

If you only listen to the vocabulary, they all appear to be saying the same thing: enterprises will have more AI, work will become more automated, and business processes will become smarter.

But are they really talking about the same thing?

Is a Copilot that summarizes a meeting the same kind of AI as an SAP agent that handles a procurement exception?

Do a customer service agent, an HR agent, a finance closing agent, and a cross-system workflow agent carry the same value, risk, and control logic?

This article is not another list of product announcements. It is trying to answer a more basic question:

> When all these major vendors say they are building enterprise AI, what position are they trying to occupy inside the enterprise? Which positions are more likely to create value? Which ones are closer to long-term commercial control? Who is sitting at the stronger table?

To answer that, we will follow a chain of reasoning:

1. **Start from demand.** What are the common entry points for enterprise AI?
2. **Place the players on the map.** Where does each vendor naturally stand?
3. **Judge the value of each position.** Which positions matter more in the current AI competition?
4. **Analyze the strategic hand.** If each vendor's AI narrative is to become real, what resources does it need? What cards does it already hold? Which missing cards are in someone else's hand? Which parts are feasible, which require specific conditions, and which are genuinely difficult?
5. **Turn it into a final map.** Where is enterprise AI actually being contested, which players occupy each area, and how can this map help you evaluate any new enterprise AI narrative?

The point is not to tell you who has already won. The point is to give you a tool for judging the next enterprise AI story you hear.


## 1. The Main Entry Points for Enterprise AI

Enterprises do not "adopt AI" in the abstract. The real situation is always more specific: someone uses AI in email, someone uses AI in customer service, someone experiments with AI in finance. All of these are called enterprise AI, but their risk levels are completely different.

That risk level determines the entry requirements, implementation speed, and long-term value of each position.

### Start With Risk

We can arrange the depth of AI's contact with enterprise work into four positions, from lowest to highest risk.

**Position 1: Helping one person work.**

The risk is close to zero.

You sit in front of a computer writing emails, joining meetings, drafting documents, organizing spreadsheets, or looking up information. AI sits beside you as a tool. It drafts, summarizes, extracts, and organizes. You remain the main actor and decision-maker. If AI writes something wrong, you edit it.

**Position 2: Helping one department work.**

The risk is low and measurable.

AI enters sales, customer service, HR, or finance. It helps customer service reply automatically, helps sales generate follow-up suggestions, helps HR screen resumes, and helps finance detect anomalies. AI performs repetitive work inside one department and mainly handles that department's own data. If it makes a mistake, the error is usually contained within that department.

**Position 3: Coordinating across departments.**

The risk is medium.

An order gets stuck. AI needs to check customer information in CRM, inventory in ERP, credit limits in finance, and delivery status in logistics. Then it needs to decide who should handle the issue, whether it should be escalated, and whether an approval process should be triggered.

At this point, AI is working across systems. It passes signals and coordinates processes. If it fails, the result is often an efficiency loss, such as an order that remains unresolved. But it has not yet directly changed the real state of business data.

**Position 4: Directly touching core transaction data.**

This is the highest-risk position.

AI is no longer just suggesting or coordinating. It starts to execute actions: creating purchase orders, releasing payments, matching invoices, adjusting inventory, or updating employee master data.

These actions directly change the operating state of the enterprise. If something goes wrong, money may leave the company, goods may be shipped incorrectly, or the audit may fail. **This is not a user experience problem. It is an operational incident.**

### To Go Deeper, AI Needs Two Additional Conditions

**The first condition: AI needs to understand the enterprise's data language.**

When AI enters cross-department coordination and core transactions, it cannot read data from only one system.

It needs to understand that an "account" in CRM, a "customer" in ERP, and a "debtor" in finance may refer to the same business object.

It also needs to connect data from multiple systems, such as inventory trends, supplier risk, and order anomalies, and then generate forecasts or analysis.

This is the **data intelligence layer**. It does two things:

- **Master data alignment, or the semantic layer:** helping AI understand the enterprise's data language and establish shared business meaning across systems.
- **Prediction and insight, or the analytics layer:** aggregating cross-system data for dashboards, anomaly detection, and trend forecasting.

This layer does not directly create the value of AI action. But it gives other agents, such as process orchestration agents and core execution agents, the data foundation they need. **Without this layer, AI is blind in cross-system scenarios.**

**The second condition: the enterprise must dare to let AI act.**

When AI moves from suggestion to execution, the enterprise has to answer several questions. Who authorized it? What data can it access? What action did it perform? Who is accountable if something goes wrong? How can it be stopped?

This is the **governance and security layer**: permissions, approvals, audit trails, rollback, accountability, and compliance. It is not one specific AI use case. It is the entry requirement for any AI that wants to move into execution.

### The Complete Enterprise AI Map

```text
                    +----------------------+
                    | Data Intelligence    |
                    | Semantic alignment   |
                    | + predictive insight |
                    | Context for all      |
                    | execution layers     |
                    +----------+-----------+
                               |
Personal Assistant -> Departmental Tasks -> Process Orchestration -> Core Execution
                               |
                    +----------+-----------+
                    | Governance & Security|
                    | Permissions, audit,  |
                    | compliance, rollback |
                    +----------------------+
```

The meaning of this map is simple: **enterprise AI is not one market. It is four execution positions plus two foundational layers. Each position has a different value logic, and each foundation requires different capabilities. They should not be discussed as one thing.**


## 2. Who Are the Players, and Where Do They Stand?

Now that we have the map, we can place the players inside it.

### The Main Players

In the German enterprise software market, six major vendors are especially worth watching in the AI narrative: **SAP, Microsoft, ServiceNow, Salesforce, Oracle, and Workday**.

They are not moving in the same direction, and they are not fighting for exactly the same thing. So we need one distinction first.

### Platform Players vs. Scenario Players

**Platform players** are not merely trying to optimize one department with AI. They want to become enterprise AI infrastructure. They want to control where AI runs, who governs it, and what it is allowed to execute. **If their systems are removed, core business processes may get stuck.**

**Scenario players** use AI to improve efficiency in a specific business area, such as customer revenue, human capital management, or a particular business domain. **If their systems are removed, the enterprise can still operate, but efficiency declines.**

Because this article asks who is competing for process execution rights, platform players are the main characters. Scenario players still matter, but we can locate them more quickly.

### The Three Platform Players

**SAP: starting from core execution.**

SAP's AI narrative is built around the **Autonomous Enterprise**. It uses **Joule**, **Knowledge Graph**, and **Business Semantics** to support controlled process execution.

If we map these terms to SAP's native position, the picture becomes clear. SAP's native position is ERP: procurement, finance, supply chain, manufacturing, and inventory.

SAP's original advantage is not the entry point, nor usage frequency. Its advantage is that it holds many of the enterprise's core transaction facts. Where is the order? How much inventory is available? Who is the supplier? SAP is often the default answer.

In plain language, SAP's AI narrative says: let AI directly touch these core business objects under controlled conditions.

On the four-layer map, SAP's main battlefield is **core execution**, while it also extends upward into the **data intelligence layer**. The governance and security layer is also natural for SAP, because ERP permissions and audit controls have accumulated over decades.

**Microsoft: starting from the entry point.**

Microsoft's AI narrative is built around **Copilot**: **Microsoft 365 Copilot**, **Copilot Studio**, **Copilot for Sales and Service**, and the cross-data intelligence layer called **Microsoft IQ**.

Its native position is the work entry point: Outlook, Teams, Office, Azure, and Entra. When employees start their day, they usually do not open a business system first. They open the Microsoft suite. Microsoft's greatest asset is not the depth of a business process. It is **where people work every day**.

In plain language: Microsoft wants AI to become the default work interface for employees.

On the four-layer map, Microsoft's main battlefield is the **personal assistant** layer. It expands into **departmental tasks** and also reaches upward into the **data intelligence layer**. Governance and security are also strengths, built on Entra identity and permission infrastructure.

Microsoft's advantage is that the entry barrier at the interface layer is almost zero. But to move to the right side of the map, it needs to connect with business systems such as SAP and ServiceNow. **It is farther away from core execution than SAP is.**

**ServiceNow: starting from process orchestration.**

ServiceNow's AI narrative is built around the **AI Control Tower**. Its core claim is that when an enterprise has dozens or hundreds of AI agents, it needs one place to create, approve, monitor, audit, and shut them down. The message is not simply "we can also build agents." It is "someone needs to manage all these agents."

Its native position is ITSM and employee services. When a ticket comes in, who handles it, who approves it, who escalates it, and who closes it? These are ServiceNow's familiar workflows.

ServiceNow does not own the core transaction records. But it understands **how a request moves through different systems inside an enterprise**.

On the four-layer map, ServiceNow's main battlefield is **process orchestration**, and it extends upward into **governance and security**. The more agents exist, the more valuable its position becomes.

**Oracle also stands on the core execution side**, but it takes a different route. Through **Fusion Agentic Applications**, Oracle connects database, application cloud, and OCI into a full-stack AI agent story. Strategically, this directly competes with SAP's route.

But in large German enterprises, SAP's ERP installed base is very deep. Oracle's core execution narrative is more naturally realized inside its own application cloud customer base. In Germany, it is strategically a platform player, but its practical influence is constrained by the installed base.

### Locating the Scenario Players

**Salesforce** enters from **departmental tasks**, especially sales, service, and marketing. Its core narrative is **Agentforce** plus **Data Cloud**. In plain language: create visible ROI in the customer front office. Its ceiling is constrained by the difficulty of connecting to back-office transactions such as orders, inventory, and refunds.

**Workday** also enters from **departmental tasks**, especially HCM. Its core narrative is **Illuminate** plus **Agent System of Record**. In plain language: optimize AI around people and organizational data. In large German enterprises, it is often covered or constrained by SAP SuccessFactors.

All six players appear on the final map, each occupying a different position:

```text
                         Data Intelligence
                       /        |          \

Personal Assistant -> Departmental Tasks -> Process Orchestration -> Core Execution
       ^                    ^                    ^                    ^
   Microsoft            Salesforce          ServiceNow              SAP
                        Workday                                    Oracle
                              ^
                    Governance & Security
                    Microsoft / ServiceNow
```

Microsoft stands on the left at the work entry point. Salesforce and Workday stand in departmental task layers. ServiceNow sits in process orchestration and extends into governance. SAP and Oracle stand on the right at core execution. They do not start from the same place, but all of them are using AI to push their original position further.


## 3. How Do We Judge Which Position Is More Valuable?

Once the map and the players are in place, how do we compare the value of their positions?

### We Need a Better Framework

If we rank them by "who monetizes first," we fall into a trap. The entry layer spreads fastest and can generate short-term revenue quickly. The core execution layer scales much more slowly. Ranking by short-term ROI can misread the long-term structure.

Looking at "who is most irreplaceable" is closer to the truth, but it misses another key factor: **even if you are important, how much is the enterprise willing to pay you?**

The value of a position ultimately depends on the product of two things:

### Profit Pool x Switching Cost

**Profit pool:** How much is an enterprise willing to pay for AI in this position?

- Directly connected to sales performance: the enterprise is willing to pay more.
- Improves personal productivity but does not directly tie to performance: the enterprise may pay, but not much.
- Solves must-have problems such as compliance and audit: the enterprise is willing to pay, but budgets may be constrained.

**Switching cost, or difficulty of replacement:** How hard is it for someone else to replace you?

- Data exclusivity, integration depth, migration cost, ecosystem lock-in, and accumulated trust.

So the matrix has two layers.

First, place the six positions from the first map into the matrix: personal assistants, departmental tasks, process orchestration, core execution, data intelligence, and governance and security.

Second, place the players on the same matrix. A company is not strong or weak in the abstract. It is strong because it occupies a position with a specific profit pool and replacement barrier.

```text
value-matrix-tabs
```

**The upper-right corner, where profit pool is large and moat is deep, has the highest long-term commercial value.**

### Position by Position

**SAP, in core execution**

- Profit pool: high. Enterprises already pay heavily for ERP, and AI execution can be added as a premium layer. But implementation cost is also high.
- Moat: extremely high. ERP replacement cost is enormous, business semantics are hard to replicate, and trust is accumulated over decades.
- Conclusion: one of the highest long-term commercial value positions, but monetization will take time.

**Microsoft, at the entry layer**

- Profit pool: uncertain. Copilot pricing is still being tested in the market. There is more than a year of commercial data, but the sustainability of enterprise renewal rates and pricing premium is not fully transparent. The entry point has scale, but unit price may be compressed.
- Moat: medium to high. Office and Teams are deeply embedded in work habits. GitHub, VS Code, and Copilot Studio create a strong developer ecosystem at the entry and departmental task layers, allowing employees and IT teams to deploy prebuilt agent templates quickly. But this ecosystem advantage weakens in process orchestration and core execution, because enterprises will not let community-built agents touch payments and inventory.
- Conclusion: fastest to diffuse, but its profit pool and moat are weaker than the execution layer. Its real advantage is that it can try to move rightward.

**ServiceNow, in process orchestration and governance**

- Profit pool: medium to high. ITSM and workflow are already part of enterprise budgets. Agent governance is becoming a must-have.
- Moat: medium to high. Workflow integrations are deep, and the real moat is that the more agents an enterprise has, the more it needs a control plane. Demand density is rising.
- Conclusion: the player whose position is rising the fastest.

**Salesforce, as a scenario player in customer revenue**

- Profit pool: very high. Sales AI is directly tied to revenue, making this a high-cash-flow position.
- Moat: high. CRM data accumulation and sales process integration are deeply embedded.
- Conclusion: extremely valuable on its own battlefield, but it needs to connect to the back office to enter the larger map.

**Workday, as a scenario player in HCM**

- Profit pool: high. HCM is a core system and contains sensitive data.
- Moat: high. Organizational data is sensitive, and replacement cost is high.
- Conclusion: a high-value local player, very stable within its own domain.


## 4. Can Their Narratives Actually Become Real?

With the map and position valuation in place, we can move to the final layer: **when each vendor's AI narrative is placed against the market and competitors' moves, which parts are feasible, which require specific conditions, and which may not hold?**

### SAP: Trying to Become the Controlled Core Execution Layer

**Narrative:** Autonomous Enterprise. Let AI touch core business objects such as orders, invoices, and inventory under controlled conditions.

**Cards SAP holds and cards SAP lacks:**

- Holds: core transaction data, including orders, invoices, inventory, and suppliers. This is the scarcest asset.
- Holds: enterprise semantic layer through Knowledge Graph, understanding relationships among business objects.
- Holds: governance and audit infrastructure, plus customer trust.
- Lacks: the daily employee entry point, which is in **Microsoft's** hands.
- Lacks: cross-system connection power. The front office sits with **Salesforce**, and workflow sits with **ServiceNow**.
- Lacks: a culture of fast iteration.

**Feasibility:**

- **Feasible:** the baseline of "AI touching core business objects" is realistic. No other company can replace SAP's core transaction data in many enterprises.
- **Conditional:** becoming the default enterprise AI execution layer requires SAP to fill gaps in entry point and cross-system connectivity. It can do this through open APIs, deep integrations, and acquisitions, but it will take time.
- **Difficult:** for enterprises that are not strongly bound to SAP, SAP needs to borrow Microsoft's entry point to reach users. Employees will not naturally open SAP just to use AI. But among SAP installed-base customers, especially large German enterprises, employees using AI through Fiori, SAP Start, or Joule is a real scenario. The entry problem matters less inside the installed base, but it is a structural obstacle for new customer acquisition.

> **Judgment: the core base is solid (high), but expansion is limited by speed and entry-point dependency (medium-low).**

### Microsoft: Trying to Become the Default AI Entry Point and Horizontal Agent Platform

**Narrative:** Copilot. Make AI the employee's work interface, and use Copilot Studio to become the enterprise agent platform.

**Cards Microsoft holds and cards Microsoft lacks:**

- Holds: employee usage frequency. People work every day in Outlook, Teams, and Office.
- Holds: identity security through Entra, cloud through Azure, and a developer ecosystem through GitHub, VS Code, and Copilot Studio.
- Holds: data platforms such as Fabric and Purview, plus pricing leverage through Office 365 subscriptions.
- Lacks: core business facts, which are in **SAP's** hands.
- Lacks: process execution governance authority, where **ServiceNow** is strong.
- Lacks: deep semantics in specific business domains, especially where **SAP** dominates.

**Microsoft's developer ecosystem deserves its own note.**

GitHub, VS Code, and Copilot Studio cover not only enterprise IT departments, but also independent developers around the world. At the entry and departmental task layers, this is a moat other vendors cannot easily match.

The advantage is concrete: employees can find agent templates themselves, and IT departments can quickly deploy preconfigured workflows.

But once we move into process orchestration and core execution, the value of the third-party ecosystem declines sharply. Enterprises will not allow community-developed agents to touch payments and inventory.

**Feasibility:**

- **Feasible:** AI becoming the default work entry point is almost certain. The entry barrier at the interface layer is close to zero.
- **Conditional:** becoming a horizontal agent platform depends on whether Microsoft can connect deeply to SAP and ServiceNow data and processes. Microsoft can borrow data through APIs and integrations, but whether the other side wants to open up is the real question. SAP has little incentive to let Microsoft become its AI entry point.
- **Difficult:** giving AI execution authority over core transaction data. There is not yet a public customer case showing Microsoft agents directly operating core financial or supply chain processes. This gap may gradually narrow through deeper partnerships, and SAP and Microsoft have explored agent-to-agent interoperability. But we should not assume the gap will close automatically, because SAP has limited incentive to open execution authority. If core facts and permissions remain with SAP, Microsoft's agent platform is an interface built on someone else's foundation. The entry point has value, but the entry point is not control.

> **Judgment: the entry point will work (high), the agent platform depends on integration depth (medium), and execution authority is still unproven (low to medium, depending on partnership depth). The profit pool remains uncertain.**

### ServiceNow: Trying to Become the Control Tower for Agent Governance

**Narrative:** AI Control Tower. When enterprises have dozens or hundreds of agents, someone needs to create, approve, monitor, audit, and shut them down.

**Cards ServiceNow holds and cards ServiceNow lacks:**

- Holds: the full request-to-approval-to-audit chain, naturally suited to managing agents.
- Holds: ITSM, employee services, and cross-system workflow visibility.
- Holds: a position that becomes more valuable as the number of agents grows.
- Lacks: core transaction records, which are in **SAP's** hands.
- Lacks: user stickiness at the entry layer.
- Lacks: definition of agent identity, roles, and budget, an area **Workday** is also contesting. Public information on Workday is still limited, so this judgment has medium confidence and should be tracked.

**Feasibility:**

- **Feasible:** managing agents. When an enterprise moves from 10 agents to 1,000 agents, someone has to govern them. This is a real need.
- **Conditional:** cross-system agent governance requires deep connection to SAP's core transaction data. This depends on how open SAP is willing to be.
- **Difficult:** competing with Workday for the right to define agent identity. Workday's Agent System of Record extends HCM logic into agents. If it succeeds, the two companies will directly compete over who decides what an agent is allowed to do.

Among the three platform players, ServiceNow has the clearest short-term path over the next two to three years. It does not need to take cards away from someone else. It only needs the trend of agent governance becoming a must-have to become real.

But over a five-year horizon, the certainty of this trend declines, because Workday and Microsoft may enter the same market in parallel.

ServiceNow's core challenge is not whether the narrative can work. It is **whether ServiceNow can define the governance layer standard before Workday or Microsoft absorbs part of the market**.

> **Judgment: the short-term path is clear (high), long-term uncertainty rises (medium), dependency on SAP openness is material (medium), and Workday is also contesting the space (medium). The position is clearly rising.**

### Strategic Hand Summary

```text
Player       Narrative             Key cards held       Missing cards held by       Feasibility
SAP          Controlled core        Core transaction     Entry point: Microsoft      Core base is solid
             execution              data                 Front office: Salesforce    Expansion limited by speed
                                    Business semantics   Workflow: ServiceNow        Entry issue matters less
                                    Governance base                                 for installed-base customers
                                                                                    but is structural for new ones

Microsoft    Default AI entry       Employee frequency   Core data: SAP              Entry point will work
             point + agent          Identity/cloud/      Business semantics: SAP     Agent platform depends on
             platform               ecosystem            Governance: ServiceNow      integration depth
                                    Data platforms                                  Execution authority unproven
                                                                                    Developer ecosystem strongest
                                                                                    in entry and departmental layers

ServiceNow   Agent governance       Workflow chain       Transaction data: SAP       Clearest short-term path
             control tower          Approval/audit       Identity definition:        Long-term uncertainty rises
                                                         Workday
```

There is one structural tension running through the whole map: **the more valuable the core execution position is, the harder it is to obtain execution authorization.** This is why Microsoft moves fastest but is more fragile, while SAP moves slowest but is more deeply anchored. Do not use "who runs first" to judge "who can run to the end."

There is also a Germany-specific factor: **the EU AI Act will be implemented in stages from August 2026**, creating explicit compliance requirements for high-risk AI execution scenarios.

This will raise the entry barrier for the execution layer. In the short term, it favors SAP, because its compliance system is the most mature. In the medium term, it favors ServiceNow, because governance platforms become more important. It has less direct impact on Microsoft's entry layer.


## 5. The Final Map

Pulling the threads together, the final map should be read in four steps:

1. Enterprise AI is not one market. It is multiple execution positions layered on top of one another.
2. Players do not start from the same place. They expand outward from their native advantages.
3. Use **profit pool x switching cost** to judge which position has more long-term value.
4. Return to the strategic hand: who holds which cards, who is missing which cards, who needs authorization from others, and who benefits from higher regulatory barriers?

```text
final-reasoning-deck
```

This map also includes Salesforce in customer revenue processes, Workday in HCM, and Oracle as a full-stack alternative route whose influence in Germany is constrained by SAP's installed base.

They have extremely high value in their own domains, but they are not competing for the whole-enterprise control plane in the same way.

### How to Use This Map

When you see any new enterprise AI narrative, ask five questions:

1. **Locate it:** Which layer of the four-position map does it occupy?
2. **Assess the profit pool:** How much is the enterprise willing to pay for this scenario?
3. **Assess switching cost:** How much data, process, permission structure, integration, and organizational habit would need to move in order to replace this vendor?
4. **Judge extensibility:** Can it naturally extend into a more valuable position? Pay attention to the domain of the moat. Being strong in one layer does not mean being strong in another.
5. **Check the strategic hand:** What needs to be true for the narrative to become real? What does the company already have? Which missing cards are in someone else's hand? Which parts are feasible, which require specific conditions, and which may not hold?

This map is not a collection of information. It is a judgment tool.


## Takeaways

1. **Enterprise AI is not one market.** Personal assistants, departmental tasks, process orchestration, core execution, data intelligence, and governance and security all have different risk levels, value logic, implementation speeds, and moats.

2. **Players do not start from the same place.** SAP starts from core execution, Microsoft from the work entry point, and ServiceNow from process orchestration. Their AI narratives use AI to push their original strengths outward. Each narrative has roots in official language: Autonomous Enterprise, Copilot, and AI Control Tower.

3. **The value standard is profit pool x switching cost.** How much can this position earn, and how hard is it to replace? By that standard, SAP and Salesforce both have very high long-term value in their respective positions, but they are competing for different things.

4. **The key finding from the strategic hand analysis:** SAP has the most stable core base. Its entry-point weakness matters less among installed-base customers, but it is a structural obstacle for new customers. Microsoft's entry point will work, but execution authority remains unproven, its profit pool is still being tested, and its developer ecosystem is strongest in entry and departmental layers rather than execution. ServiceNow has the clearest short-term path, but long-term uncertainty rises as Workday and Microsoft enter the governance space. The EU AI Act will further raise the barrier for execution-layer AI. The more valuable the execution position is, the harder it is to obtain authorization.

5. **Several open questions are worth tracking:** the boundary between Workday and ServiceNow in agent management, where public information remains limited and confidence is medium; whether data platform companies will capture the data intelligence layer; and how much pricing power the entry layer truly has.

6. **In the end, do not watch conference volume. Watch system position:** who holds business facts, who understands business semantics, who enterprises are willing to pay a premium, who can be authorized to execute, and whose missing cards are in someone else's hand. These factors determine who really has a seat at the table.
