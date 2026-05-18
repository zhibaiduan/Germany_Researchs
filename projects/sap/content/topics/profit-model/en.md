# SAP 公司研究 · 主题 1：盈利结构、客户迁移与 AI/Data 战略转型

状态：截至 2026-05-14
主要口径：SAP 2025 Integrated Report / Form 20-F

---

## 这篇报告想回答什么

一句话：**SAP 的钱从哪来、去哪了，公司正在往哪走，客户跟上了多少？**

这个问题可以拆成四层，也是这篇报告的行文顺序：

1. **事实层**：收入、成本、利润、地区分布，现状是什么样的？
2. **变化层**：为什么会变成这样——SAP 主动改，还是被迫改？
3. **客户层**：客户到底跟不跟？迁移顺不顺利？
4. **判断层**：SAP 能不能从 cloud ERP 公司变成 enterprise AI + data platform 公司？

为什么要研究 SAP？不只是因为它是家大公司。SAP 是德国乃至欧洲 B2B 软件生态的底层基础设施。它往哪走，咨询公司、系统集成商、垂直 SaaS、AI 初创、数据平台的机会和威胁就往哪倾斜。理解 SAP，是理解整个德国 B2B 软件生态的前提。

---

## 核心结论（先说结论，细节后面有）

1. **收入中心已经转移。** 2025 年 Cloud 占 SAP 总收入 57.1%，Software License 只剩 2.7%。这不是趋势，是已经发生的结构性迁移。

2. **传统 support 还在流血，但没有崩。** 2025 年 Software Support 仍贡献 28.6% 收入，但已从 2023 年的 EUR 11.496B 降到 EUR 10.525B。SAP 用 cloud 增长接住了这个缺口，目前接得住。

3. **SAP 的目标不是"卖云"，而是控制企业的流程、数据和 AI 执行层。** Cloud ERP Suite、Business Data Cloud、BTP、Joule——这四个产品组合放在一起，才能理解 SAP 想成为什么。

4. **客户迁移从来不是 SAP 单方面说了算。** DACH 大企业对 public cloud 有很实际的顾虑，不是技术问题，是流程、定制、合规和成本问题。SAP 的迁移叙事比实际执行更顺。

5. **第一阶段转型成立，第二阶段没有被证明。** 财务数字支持 SAP 云转型的叙事。但 AI/Data 产品的真实收入贡献，SAP 至今没有单独披露，这件事值得持续追踪。

---

## 一、事实层：SAP 的钱从哪里来、花到哪里去

### 1.1 收入结构：Cloud 已是主收入来源，这是结论不是预测

单位：EUR 百万
来源：[SAP 2025 Integrated Report, Income Statement](https://www.sap.com/integrated-reports/2025/en/datahub/financial-data.html)

| 收入类型 | 2023 | 占比 | 2024 | 占比 | 2025 | 占比 | 2023-2025 变化 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Cloud | 13,664 | 43.8% | 17,141 | 50.2% | 21,023 | 57.1% | +53.9% |
| Software licenses | 1,764 | 5.7% | 1,399 | 4.1% | 990 | 2.7% | -43.9% |
| Software support | 11,496 | 36.8% | 11,290 | 33.0% | 10,525 | 28.6% | -8.4% |
| Services | 4,283 | 13.7% | 4,346 | 12.7% | 4,262 | 11.6% | -0.5% |
| **Total revenue** | **31,207** | **100%** | **34,176** | **100%** | **36,800** | **100%** | **+17.9%** |

三年时间，Cloud 从 43.8% 涨到 57.1%，License 从 5.7% 跌到 2.7%——License 基本边缘化了。Support 仍是第二大收入，但下滑趋势清晰，不可逆。Services 基本平稳，它的角色更接近迁移和实施支撑，不是利润引擎。

### 1.2 Cloud 内部结构：增长几乎全靠 Cloud ERP Suite

来源：[SAP Five-Year Summary 2025](https://www.sap.com/integrated-reports/2025/en/datahub/financial-data/five-year-summary.html)

| Cloud 类型 | 2023 | 2024 | 2025 | 2025 占 Cloud |
|---|---:|---:|---:|---:|
| Cloud ERP Suite | 10,626 | 14,165 | 18,119 | 86.2% |
| 其他 Cloud | 3,038 | 2,976 | 2,904 | 13.8% |
| **Cloud 合计** | **13,664** | **17,141** | **21,023** | **100%** |

这组数字很关键。SAP 的云增长不是靠一堆零散 SaaS 产品堆出来的，86.2% 来自 Cloud ERP Suite。

Cloud ERP Suite 的口径比 S/4HANA Cloud 宽：按 SAP 官方披露，它包括 S/4HANA Cloud、BTP、部分 HR/payroll、spend management、commerce、business process transformation 和 working capital management。来源：[SAP Form 20-F 2025](https://www.sec.gov/Archives/edgar/data/1000184/000110465926020058/sap-20251231x20f.htm)

说白了，SAP 的云增长高度集中在围绕 ERP 展开的核心业务套件，护城河还在，不是靠外围产品撑起来的。

### 1.3 地区结构：面子上是三足鼎立，实际上两个超级市场说了算

单位：EUR 百万
来源：[SAP Form 20-F 2025, Revenue by Region](https://www.sec.gov/Archives/edgar/data/1000184/000110465926020058/sap-20251231x20f.htm)

| 地区 | 2023 | 占比 | 2024 | 占比 | 2025 | 占比 | 2023-2025 变化 |
|---|---:|---:|---:|---:|---:|---:|---:|
| EMEA | 14,004 | 44.9% | 15,575 | 45.6% | 17,025 | 46.3% | +21.6% |
| Americas | 12,762 | 40.9% | 13,808 | 40.4% | 14,499 | 39.4% | +13.6% |
| APJ | 4,441 | 14.2% | 4,793 | 14.0% | 5,276 | 14.3% | +18.8% |
| **Total** | **31,207** | **100%** | **34,176** | **100%** | **36,800** | **100%** | **+17.9%** |

核心国家：

| 国家 | 2023 | 2024 | 2025 | 地位 |
|---|---:|---:|---:|---|
| 德国 | 4,921 | 5,359 | 5,828 | 占 EMEA 34% |
| 美国 | 10,204 | 11,056 | 11,537 | 占 Americas 80% |
| 日本 | 1,243 | 1,388 | 1,569 | 占 APJ 30% |

美国单一市场收入接近德国两倍——**美国是 SAP 最大的商业市场，不是德国。** 从收入体量来看，SAP 更是一家在美国做生意的公司，只是总部在德国。

### 1.4 地区云化率：美国跑最快，欧洲更保守

单位：EUR 百万
来源：[SAP Form 20-F 2025, Revenue by Region](https://www.sec.gov/Archives/edgar/data/1000184/000110465926020058/sap-20251231x20f.htm)

| 地区 | 总收入 | Cloud | Cloud 占地区收入 | Software licenses + support | Services |
|---|---:|---:|---:|---:|---:|
| EMEA | 17,025 | 8,876 | 52.1% | 6,137 | 2,012 |
| Americas | 14,499 | 9,075 | 62.6% | 3,669 | 1,755 |
| APJ | 5,276 | 3,072 | 58.2% | 1,709 | 495 |
| **Total** | **36,800** | **21,023** | **57.1%** | **11,515** | **4,262** |

2023-2025 Cloud 收入 by 地区：

| 地区 | 2023 Cloud | 2024 Cloud | 2025 Cloud | 2023-2025 增长 |
|---|---:|---:|---:|---:|
| EMEA | 5,241 | 6,892 | 8,876 | +69.4% |
| Americas | 6,642 | 7,872 | 9,075 | +36.6% |
| APJ | 1,781 | 2,377 | 3,072 | +72.5% |

Americas 云化率最高（62.6%），绝对额最大。EMEA 增速快，但传统 license/support 占比仍然偏高。APJ 增速最猛，但基数小。

为什么欧洲客户云化慢？不是"不懂云"，而是 ERP 管的是财务、生产、采购、供应链、税务、库存这些真实核心流程。很多大型企业的 SAP 系统经过十几年深度定制，和工厂、仓库、银行、税务、供应商系统紧密交织。迁到标准化 public cloud，实际上意味着重写流程、接口、权限、报表和组织习惯。**这不是技术问题，是组织问题，代价高昂，不是一个 migration workshop 能解决的。**

### 1.5 成本和利润：License/Support 毛利最高，Services 是成本洼地

单位：EUR 百万
来源：[SAP 2025 Integrated Report, Income Statement](https://www.sap.com/integrated-reports/2025/en/datahub/financial-data.html)

| 成本类型 | 2023 | 2024 | 2025 | 对应业务 | 2025 毛利率 |
|---|---:|---:|---:|---|---:|
| Cost of cloud | 3,884 | 4,660 | 5,480 | Cloud | 73.9% |
| Cost of software licenses and support | 1,383 | 1,262 | 1,313 | License + support | 88.6% |
| Cost of services | 3,407 | 3,321 | 3,193 | Services | 25.1% |
| **Total cost of revenue** | **8,674** | **9,243** | **9,986** | 全部业务 | **72.9% 总毛利率** |

License/Support 毛利 88.6%，是现金牛，但正在萎缩。Cloud 毛利 73.9%，已经进入规模化盈利阶段，不是靠烧钱拉增长。Services 毛利只有 25.1%，属于必要成本，不是 SAP 挣钱的地方。

### 1.6 经营费用：Sales & Marketing 最重，R&D 稳定投入

单位：EUR 百万
来源：[SAP 2025 Integrated Report, Income Statement](https://www.sap.com/integrated-reports/2025/en/datahub/financial-data.html)

| 支出类型 | 2023 | 2024 | 2025 | 2025 占总收入 |
|---|---:|---:|---:|---:|
| Research and development | 6,324 | 6,514 | 6,633 | 18.0% |
| Sales and marketing | 8,828 | 9,090 | 8,879 | 24.1% |
| General and administration | 1,364 | 1,435 | 1,633 | 4.4% |
| Restructuring | 215 | 3,144 | 3 | 0.0% |
| Other operating expense, net | 4 | 85 | 49 | 0.1% |
| **Subtotal, excluding cost of revenue** | **16,735** | **20,268** | **17,197** | **46.7%** |
| **Total operating expenses, including cost of revenue** | **25,408** | **29,511** | **27,183** | **73.9%** |

Sales & Marketing 占收入 24.1%，是最大费用项——企业软件的销售从来不便宜，大客户维护、迁移推进、合同谈判都是真实成本。R&D 稳定在 18% 左右，支撑 Cloud、AI、Data 的产品投入。2024 年 restructuring 异常高（EUR 3.144B），2025 年基本归零，这直接推动了 2025 年 operating profit 改善到 EUR 9.617B，operating margin 约 26.1%。

---

## 二、变化层：为什么会变成这样

数字说明了"发生了什么"，这部分回答"为什么会这样"。

### 2.1 SAP 主动做的三件事

**第一，把增长引擎从 License 切换到 Cloud ERP Suite。**

License 收入从 2023 年 EUR 1.764B 跌到 2025 年 EUR 0.990B，而 Cloud ERP Suite 从 EUR 10.626B 涨到 EUR 18.119B。这不是市场自然演化，是 SAP 主动把销售资源、产品创新和客户迁移路径全都压在云上的结果。

**第二，用 RISE / GROW / Business Suite 设计了一套迁移漏斗。**

这三个产品不是平行关系，而是一套完整的客户进入逻辑：

- **RISE with SAP**：给已有 SAP on-prem 系统的大型复杂客户，主要走 private cloud，降低迁移阻力。
- **GROW with SAP**：给新客户或流程相对标准化的成长型企业，public cloud，上线更快。
- **SAP Business Suite**：SAP 希望客户最终落脚的产品版图——Cloud ERP + 周边业务应用 + Business Data Cloud + BTP + Business AI / Joule。

RISE 和 GROW 是入口路径，Business Suite 是终态目标。

**第三，围绕 AI 和 Data 开始重组产品架构。**

SAP 推出 Business Data Cloud，与 Databricks 合作；2026 年完成 Reltio 收购，宣布收购 Dremio 和 Prior Labs。

这背后的逻辑是：企业 AI 要真正落地，不能靠通用聊天机器人，必须理解企业真实业务数据和流程。一个 AI agent 要处理采购、库存、现金流、供应链问题，前提是知道客户、订单、供应商、发票、库存、员工、成本中心这些业务对象之间的关系。SAP 掌握这些数据，这是它的核心赌注。

产品分层大致如下：

- **应用层**：Cloud ERP、SuccessFactors、Ariba、Concur、Commerce、Supply Chain
- **数据层**：Business Data Cloud、Reltio、Dremio、Databricks 合作
- **平台层**：BTP，负责集成、扩展、自动化和 AI 接入
- **AI 层**：Joule、Business AI、AI agents

相关来源：

- [SAP completes Reltio acquisition](https://news.sap.com/2026/05/sap-completes-acquisition-of-reltio/)
- [SAP to acquire Dremio](https://news.sap.com/2026/05/sap-to-acquire-dremio-unify-sap-and-non-sap-data-power-agentic-ai/)
- [SAP to acquire Prior Labs](https://news.sap.com/2026/05/sap-to-acquire-prior-labs-establish-frontier-ai-lab-europe/)

### 2.2 外部压力：不是生存危机，是控制点竞争

SAP 的外部压力不是"明天会被替代"那种紧迫感。它的 ERP 深度嵌入大型企业核心流程，切换成本极高，传统 support 和 cloud subscription 仍提供很强的现金流。

真正的压力更长远：**如果 SAP 不把客户带到 cloud、data 和 AI 平台上，它会逐渐失去未来企业软件的控制点。** 钱还在，但话语权在缩小。

| 外因 | 影响程度 | 对 SAP 的具体影响 |
|---|---|---|
| 旧 ERP 客户进入换代周期 | 高 | 直接推动客户从旧 SAP Business Suite / ECC 迁向 S/4HANA 和 cloud，是当前收入结构变化的重要触发因素 |
| AI 需要云和数据底座 | 高 | 决定 SAP 能否在 AI 时代继续掌握企业流程和数据入口 |
| 竞争者蚕食外围模块 | 中高 | Workday、Salesforce、ServiceNow、Microsoft、Databricks、Snowflake 等会削弱 SAP 在 HR、CRM、workflow、data platform、AI layer 的控制点 |
| 资本市场偏好可预测收入 | 中 | 强化 SAP 转向 cloud subscription 的动力，但不是客户侧直接压力 |

**旧 ERP 换代窗口是最直接的迁移驱动力。** SAP Business Suite 7 主流维护到 2027 年底，extended maintenance 到 2030 年底。来源：[SAP maintenance strategy](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html) 这给 SAP 了一个明确的时间窗口：旧系统维护期限临近，客户被推着从 license/support 模式迁向 S/4HANA 和 cloud subscription。

**AI 对数据底座的需求，是 SAP 的长期竞争力赌局。** 如果 Joule、AI agents、Business AI 要成为真正的增长点，客户数据就必须在可治理、可调用的云平台上。否则 SAP 仍是后台 ERP，但 AI 入口、数据分析入口和业务自动化入口会被别人拿走。

**订阅化也让资本市场满意。** SAP 2025 年 "more predictable revenue" 占比达到 86%，高于 2021 年的 75%。来源：[SAP Five-Year Summary](https://www.sap.com/integrated-reports/2025/en/datahub/financial-data/five-year-summary.html) 稳定现金流对估值有直接支撑，这也强化了 SAP 持续推进订阅化的动力。

**关键在于**：SAP 的转型既是主动进攻，也是防守护城河。短期最直接的压力来自旧 ERP 换代周期；长期最重要的压力是 AI 时代企业数据和流程控制权的争夺。

---

## 三、客户层：迁移到底顺不顺利

SAP 的云化不是单向推进，而是一场和客户之间的持续谈判。客户承认 SAP 重要，但不会无条件跟着 SAP 的节奏走。

### 3.1 DSAG 数据说明了什么

DSAG 2026 年的调研数据是理解客户真实态度最好的窗口：

- 43% 的受访企业计划增加 SAP 投资，26% 持平，28% 减少
- 36% 认为 SAP 对未来方向的重要性上升，48% 认为不变，16% 认为下降
- 对 SAP 新 Business Suite 愿景，35% 表示强或很强地纳入投资规划，**62% 表示较少或没有纳入**
- S/4HANA 投资偏好：on-prem 高/中等投资计划 42%，private cloud / RISE 22%，public cloud / GROW 只有 6%

来源：[DSAG Investment Report 2026](https://dsag.de/presse/dsag-investment-report-2026-companies-are-investing-more-selectively-ai-is-becoming-established-cloud-computing-is-being-put-to-the-test/)

读完这组数字，结论很清楚：SAP 仍是大型企业核心流程的基础设施，没有人真的想换掉它，但客户对 SAP 的新产品和迁云节奏保持着相当程度的观望。62% 的客户没有把 SAP Business Suite 愿景纳入投资规划，public cloud / GROW 偏好只有 6%——这不是小数字，这是 SAP 整个第二阶段叙事面对的现实摩擦。

客户顾虑可以归成四个问题，每一个都是真实的：

1. 迁到 cloud 后，原有深度定制、接口和行业流程能保留多少？
2. AI/data 新产品能带来可量化的 ROI 吗？
3. 长期订阅合同的总成本，算清楚了吗？
4. 进入 SAP cloud 生态后，未来的议价权和退出选项是什么？

### 3.2 SAP 的迁移策略：激励 + 压力双轨并行

SAP 没有只靠说服，它同时在推两件事：让云看起来更值，让留在旧模式里更难受。

**激励侧：**

- RISE 降低大型老客户从 on-prem 迁移的阻力，GROW 给标准化客户更快上线的路径
- Business Suite 把 Cloud ERP、BDC、BTP、Joule 包装成统一的产品叙事
- 新能力——Joule、Business AI、Business Data Cloud——越来越多地只在 cloud 体系里提供
- LeanIX 补迁移理解，WalkMe 补用户采用，Reltio 补主数据，Dremio 补数据湖仓，Prior Labs 补结构化数据 AI 能力

**压力侧：**

- SAP Business Suite 7 主流维护 2027 年底截止，extended 到 2030 年底
- 产品创新重心持续压在 cloud、BDC、Business AI 上，旧系统创新窗口在关闭
- 销售、合同、投资者叙事都在强化 cloud subscription 方向
- 咨询公司、系统集成商、实施伙伴也在跟着重组资源配置

说白了，SAP 在重塑客户的选项空间：留在旧系统，能用，但拿不到新东西；迁到 cloud，才能进入新的产品、数据和 AI 体系。**这不是一道技术题，是一道关于未来十年谁掌控企业核心系统的政治题。**

### 3.3 商业模式变化：从买断到长期订阅

传统模式下，客户买 software license，每年付 support/maintenance，一次性交易，后续绑定靠惯性。云模式下，按订阅周期、用户类型、使用范围、产品包和附加能力持续付费。SAP S/4HANA Cloud 常用 FUE（Full Usage Equivalent）作为计费单位。来源：[SAP S/4HANA Cloud Service Use Descriptions](https://www.sap.com/docs/download/agreements/product-policy/css/service-specifications/sap-s4hana-cloud-service-use-descriptions-english-v1-2020.pdf)

对 SAP 的好处显而易见：收入更可预测，客户绑定更深，BTP、BDC、AI agents 可以作为持续扩展的付费层。

对客户来说，担心也很实际：

- 长期订阅总成本是否高于原来的 license/support？
- 一旦迁入 SAP cloud，议价权是否实质性下降？
- AI/data 能力会不会变成新的付费层，逐年加码？
- 退出成本和供应商锁定是否比以前更强？

这些不是理论担忧，是有历史根据的商业担忧。企业不会因为 SAP 的销售叙事说"未来都在云端"就签十年合同。

### 3.4 阶段判断：财务转型顺利，客户迁移没那么顺

财务层面，SAP 应对得不错：

- Cloud 收入 2023-2025 增长 53.9%
- Cloud ERP Suite 已占 Cloud 收入 86.2%
- Cloud gross margin 2025 年约 73.9%
- Software license 下滑，但被 Cloud 增长覆盖
- 2025 operating profit 大幅改善至 EUR 9.617B

客户侧的摩擦还在：

- DACH 大企业仍明显偏好 on-prem 或 private cloud，而非 public cloud
- 迁移成本、合同复杂度、功能完整性、定制系统改造，每一项都是真实阻力
- AI/Data 产品的真实收入贡献，SAP 没有单独披露

> 更准确的判断是：SAP 的财务转型顺利，客户迁移体验不完全顺利；收入结构已经变了，但客户心智和系统架构还在过渡期。

---

## 四、判断层：SAP 在 AI/Data 时代能走多远

不要只问"cloud 收入有没有涨"。更重要的问题是：SAP 能不能从 cloud ERP 公司进一步变成 enterprise AI + data platform 公司？这是两回事。

### 4.1 SAP 想控制的四个层面

SAP 现在的野心，不是从 license 公司变成 subscription 公司那么简单。它要的是：从 **ERP 软件供应商** 变成 **企业流程 + 数据 + AI 执行层平台**。

四个控制点：

1. **流程控制点**：SAP 已经深度嵌入企业财务、采购、供应链、生产、库存、人力等核心流程，这是现实，不是愿景。
2. **数据控制点**：通过 Business Data Cloud，把 SAP 和非 SAP 数据整理成可治理、可理解、可调用的业务数据层。
3. **平台控制点**：BTP 承担集成、扩展、自动化和 AI 接入。
4. **AI 执行控制点**：Joule、Business AI、AI agents，把 AI 从"回答问题"推进到"理解业务流程并执行动作"。

这个逻辑的核心在于：企业 AI 最缺的不是模型，而是可靠的业务上下文、干净的数据、权限体系、流程约束和可执行入口。SAP 掌握了很多大型企业最核心的业务流程和历史数据——这不是 OpenAI 能快速复制的东西。

SAP 的战略赌注是：**不和通用大模型公司正面竞争，而是成为企业 AI 落地时连接流程、数据、权限和执行的业务层。** 这个位置如果能拿到，价值极高。

### 4.2 好信号与坏信号

**支持这个方向的信号：**

- Cloud 转型在财务上已经成立，云收入是第一大收入来源，不是假设
- Cloud ERP Suite 占 Cloud 收入 86.2%，增长围绕核心业务套件，护城河还在
- Software license 下滑没有拖垮总收入，增量覆盖了存量萎缩
- Cloud 毛利率 73.9%，规模化盈利阶段，不靠烧钱
- LeanIX、WalkMe、Reltio、Dremio、Prior Labs——这些收购不是随机的，指向了一条完整的 AI/data 能力补全路径
- 大型企业客户基础仍是高壁垒，核心 ERP 真的很难被快速替代

**让人存疑的地方：**

- DACH 大企业对 public cloud 阻力仍然真实，不会短期消解
- 标准化 public cloud 和大企业深度定制之间的张力，SAP 没有完全解决
- AI/Data 产品收入贡献没有单独披露，目前更多是下一阶段增长假设，不是已验证的数字
- Microsoft、Databricks、Snowflake、ServiceNow、Salesforce、Workday、Oracle 都在同一条赛道上争控制点，竞争不是理论风险
- Cloud ERP、BTP、Business Data Cloud、Joule、SuccessFactors、Ariba、Concur——产品版图很大，真正整合成低摩擦的客户体验，难度极高

### 4.3 最终判断

> SAP 的第一阶段转型——从 license/support 向 cloud subscription——已经大概率完成，财务数字可以支撑这个结论。第二阶段——从 cloud ERP 变成 enterprise AI + data platform——方向没有错，但还没有被实际数字验证。

SAP 在 AI 时代最大的竞争力来自它对企业核心流程和业务数据的控制；最大的风险也来自同一个地方——这些流程和系统太复杂，导致客户迁移慢、标准化难、AI/data 产品落地周期长。

因此，SAP 未来几年的关键考题不是"能不能发布更多 AI 功能"，而是 **Cloud ERP Suite、Business Data Cloud、BTP 和 Joule 能不能真正组合成一个客户愿意迁移、愿意持续付费、能够产生可量化业务结果的统一平台。** 这是判断 SAP 第二阶段转型成不成立的真实标准。

---

## 信息来源与可信度评估

| 来源 | 用途 | 可信度 | 评价 |
|---|---|---:|---|
| [SAP Integrated Report 2025](https://www.sap.com/integrated-reports/2025/en/datahub/financial-data.html) | 收入、成本、利润 | ★★★★★ | 官方审计财报，核心数据源 |
| [SAP Form 20-F 2025](https://www.sec.gov/Archives/edgar/data/1000184/000110465926020058/sap-20251231x20f.htm) | 地区收入、业务解释 | ★★★★★ | SEC 文件，最适合引用 |
| [SAP Five-Year Summary](https://www.sap.com/integrated-reports/2025/en/datahub/financial-data/five-year-summary.html) | 2021-2025 趋势 | ★★★★★ | 官方长期趋势数据 |
| [SAP maintenance strategy](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html) | ECC/Business Suite 维护期限 | ★★★★★ | 官方维护政策 |
| [DSAG Investment Report 2026](https://dsag.de/presse/dsag-investment-report-2026-companies-are-investing-more-selectively-ai-is-becoming-established-cloud-computing-is-being-put-to-the-test/) | 客户侧阻力与投资意愿 | ★★★★★ | 德语区 SAP 用户协会，客户视角强 |
| [SAP S/4HANA Cloud Service Use Descriptions](https://www.sap.com/docs/download/agreements/product-policy/css/service-specifications/sap-s4hana-cloud-service-use-descriptions-english-v1-2020.pdf) | FUE 定价口径 | ★★★★☆ | 官方服务说明，用于理解订阅计费单位 |
| [SAP Reltio announcement](https://news.sap.com/2026/05/sap-completes-acquisition-of-reltio/) | 数据平台收购动作 | ★★★★★ | 官方新闻 |
| [SAP Dremio announcement](https://news.sap.com/2026/05/sap-to-acquire-dremio-unify-sap-and-non-sap-data-power-agentic-ai/) | 数据湖仓收购动作 | ★★★★★ | 官方新闻，注意交易仍待批准 |
| [SAP Prior Labs announcement](https://news.sap.com/2026/05/sap-to-acquire-prior-labs-establish-frontier-ai-lab-europe/) | AI/TFM 收购动作 | ★★★★★ | 官方新闻，注意交易仍待批准 |
