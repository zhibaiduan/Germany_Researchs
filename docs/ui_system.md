# UI System — SAP Research

> 本文件是本项目唯一的 UI 权威定义。所有页面、组件的视觉与交互决策以此为准。
> 修改设计规范：先改此文件，再改代码。

---

## 一、设计语言

**定位**：学术读物感 × 独立研究员视角。克制、高信息密度、像一本精排的行业报告，而不是博客或营销页面。

**原则优先级**：
1. 信息层级清晰 — 每个页面有且只有一个核心目的
2. 阅读体验第一 — 长文可读性高于视觉炫技
3. 克制的视觉质感 — 用间距、字重、灰阶做层次，不依赖装饰

---

## 二、色彩 Token

```css
--bg:           #F2F5F1   /* 页面底色：浅绿灰，暖中性 */
--surface:      #FFFFFF   /* 卡片 / 面板 / sidebar 背景 */
--border:       #D9E2D6   /* 主边框 */
--border-light: #E4EBE2   /* 次级分割线 */

--text-1: #181C17         /* 正文主色：近黑 */
--text-2: #576052         /* 次级文字：中绿灰 */
--text-3: #8A9885         /* 辅助文字：浅绿灰（标签、注释）*/

--accent:       #2A6048   /* 主强调色：深绿（链接 active、左竖线、标记）*/
--accent-hover: #1E4A36   /* 强调色 hover 态 */
--accent-bg:    #EBF4EF   /* 强调色背景（callout、hover fill）*/
--accent-border:#B2D4C2   /* 强调色边框 */

--tag-bg:       #E8EDE6   /* 标签背景 */
--tag-text:     #475542   /* 标签文字 */

/* Footer 专用深色 */
--footer-bg:    #0D1A12
--footer-text:  #F0EBE3
--footer-muted: #8A8480
--footer-border:#1C2E22
--footer-label: #2A6048   /* 复用 accent */
```

**禁止**：在 Token 之外散落 hex 色值（footer 深色系除外，已定义为常量）。

---

## 三、字体

```
Sans:  Inter (300/400/500/600) — UI 文字、正文、标签
Serif: DM Serif Display (Regular/Italic) — 大标题、章节 heading、引用块
```

**使用规则**：
- 功能性文字（导航、标签、meta、注释）→ Inter
- 展示性标题、h2 章节标题、引用 → DM Serif Display
- 混合同段时：serif 负责气质，sans 负责可读性

---

## 四、间距与布局

- 基础单位：**8px**，所有 padding/gap/margin 为 4px 的倍数
- 圆角：`--radius: 6px`（小组件），`--radius-lg: 10px`（卡片、大面板）
- 最大宽度：`1120px`，水平 padding `32px`（移动端降至 `20px`）
- 阴影：`shadow-sm: 0 1px 4px rgba(0,0,0,.06)`，`shadow-md: 0 4px 16px rgba(0,0,0,.08)`

---

## 五、页面结构体系

本项目由两种页面类型构成：

### 5.1 封面页（index.html）

**目的**：说明这是一个什么研究项目、为什么值得读、读者能看到什么。像一本书的封面 + 目录页。

**整体布局：左右双栏**

```
┌──────────────────────────────────────────────────────────┐
│  Nav（sticky，全宽）                                      │
├─────────────────────────────┬────────────────────────────┤
│                             │                            │
│   Left: 封面主内容           │   Right: 书目侧边栏         │
│   max-width ~680px          │   width: 280px             │
│                             │   sticky，跟随滚动          │
│   · 公司标识 + 标题          │                            │
│   · 研究价值段落             │   · 系列概览（共N专题）      │
│   · 核心研究问题列表          │   · 每个专题条目：编号、      │
│   · meta 信息行              │     标题、状态标记           │
│                             │   · 点击跳转对应专题         │
│   ─── 分割线 ───             │                            │
│   专题卡片网格（2列）         │                            │
│                             │                            │
└─────────────────────────────┴────────────────────────────┘
│  Footer（全宽，深色背景）                                  │
└──────────────────────────────────────────────────────────┘
```

**左侧封面内容区（从上到下）**：
1. `hub-company-id`：公司 Logo 方块 + 公司名 + 分类徽章
2. `hub-description`：公司简介段落（约 3–4 句，说明规模、地位）
3. `hub-motivation`：研究价值段落（为什么研究这家公司）
4. `hub-questions`：核心研究问题列表（带序号，竖排，醒目）
5. `hub-meta-row`：创始时间 / 总部 / 市值 / 研究开始时间等 meta
6. `hub-topics`：专题卡片网格（2列）

**右侧书目侧边栏**：
- sticky，top = nav-h + 24px
- 标题：`CONTENTS` 小标题
- 条目列表：编号 · 标题 · 状态徽章（已发布 / 草稿 / 即将）
- 点击已发布条目：跳转对应 HTML
- 当前无法跳转的：视觉降权（opacity 0.5，cursor default）
- 底部：研究时间段标注

---

### 5.2 专题文章页（topics/*.html）

**目的**：承载单篇深度研究报告。像一本书的某一章，支持长文阅读。

**整体布局：左右双栏**

```
┌──────────────────────────────────────────────────────────┐
│  Nav（sticky，全宽）                                      │
├──────────────────────────────────────────────────────────┤
│  面包屑导航（首页 › 当前专题）                             │
├─────────────────────────┬────────────────────────────────┤
│  Article Header（全宽）  │                                │
│  · 专题标签              │                                │
│  · 大标题（serif）       │                                │
│  · 副标题（serif）       │                                │
│  · meta（日期、阅读时长）│                                │
├─────────────────────────┴────────────────────────────────┤
│                                         ┌────────────────┤
│   Main Content（正文）                   │ TOC Sidebar    │
│   ~740px                                │ 220px, sticky  │
│                                         │                │
│   h2 → serif，带顶部分割线              │ · 章节标题列表  │
│   h3 → sans，全大写，轻色               │ · scroll spy   │
│   p  → Inter 15.5px, 1.85行高           │ · active 高亮  │
│   blockquote / callout / table          │                │
│                                         └────────────────┤
├──────────────────────────────────────────────────────────┤
│  Article End（参考资料、延伸阅读）                         │
├──────────────────────────────────────────────────────────┤
│  Footer                                                   │
└──────────────────────────────────────────────────────────┘
```

---

## 六、组件规范

### 6.1 Navigation（所有页共用）

- sticky top，高度 `60px`
- 背景：`rgba(242,245,241,.94)` + `backdrop-filter: blur(12px)`（磨砂效果）
- 底部：`1px solid var(--border)`
- Logo 区：方块 logo-mark（28×28，accent 绿，圆角6px）+ 站点名称
- 链接：`text-2` 色，hover → `text-1`，active → `text-1` + `font-weight: 500`

### 6.2 专题卡片（topic-card）

```
状态：default / hover / draft（不可点，opacity .7）/ coming（不可点，opacity .5）

结构：
  ┌─ 编号（accent 绿，tabular-nums） ──── 状态徽章 ─┐
  │  标题（18px, 600, letter-spacing -.02em）       │
  │  副标题（13px, text-3, 斜体）                    │
  │  摘要（13.5px, text-2, 1.6行高）                 │
  ├──────────────────────────────────────────────────┤
  │  标签列表                          阅读时长       │
  └──────────────────────────────────────────────────┘

hover：border-color → accent-border，shadow-md，translateY(-2px)
transition：150ms ease
```

### 6.3 书目侧边栏条目

```
结构：
  ─── CONTENTS ───────（10px, 600, uppercase, letter-spacing .1em, text-3）

  [01]  盈利模式及其变迁        ● 已发布
  [02]  公司全景               ● 已发布
  [03]  商业模式解构            ◐ 草稿
  [04]  技术架构深解            ○ 即将

状态图标：● 发布 / ◐ 草稿 / ○ 即将（或用色块替代）
active（当前页）：accent 色，左侧 2px 竖线
hover（可跳转）：text-1
```

### 6.4 核心研究问题列表（hub-questions）

```
── 核心研究问题 ──（同 section-title 样式）

Q1  SAP 的护城河来自哪里？
Q2  云转型战略的真实进展…
…

每条：编号（accent 绿，monospace）+ 问题文字（text-1，15px）
左侧 2px accent 色竖线整体框起来，背景 accent-bg，圆角 radius
```

### 6.5 Callout 块

```
左侧 3px accent 竖线
背景：surface + border
label：10.5px / 700 / uppercase / accent（如 KEY INSIGHT / 注意 / 数据来源）
正文：14px / text-2 / 1.65行高 / sans
```

### 6.6 引用块（blockquote）

```
左侧 3px accent 竖线
背景：accent-bg
正文：serif，斜体，15px，text-2
```

### 6.7 数据表格（data-table）

```
表头：11px / 600 / uppercase / text-3 / 底部 border
单元格：13.5px / text-2 / padding 10px 12px
行 hover：accent-bg 填充
最后一行无底边框
```

### 6.8 状态徽章

| 状态 | 文字 | 背景 | 边框 | 前景 |
|---|---|---|---|---|
| published（已发布）| `已发布` | `#EAF5F0` | `#BFE0D0` | `#2E7D52` |
| draft（草稿）| `草稿` | `tag-bg` | `border` | `text-3` |
| coming（即将）| `即将发布` | `#EFF4FB` | `#C2D3EC` | `#5E7FAA` |

共同：`10.5px / 600 / uppercase / letter-spacing .06em / border-radius 20px / padding 2px 8px`

### 6.9 Footer

- 背景：`#0D1A12`（项目内唯一深色区域）
- 三栏布局（1.4fr / 1fr / 1fr），gap 56px
- 三栏固定为：关于研究者 / 研究方法论 / 免责声明
- footer-bar（底部栏）：版权 + 转载说明，两端对齐

---

## 七、排版规范

| 元素 | 字体 | 大小 | 行高 | 颜色 |
|---|---|---|---|---|
| 页面大标题（hub-hero-name）| Serif | 32px | 1.15 | text-1 |
| 文章大标题（article-title）| Serif | 40px | 1.15 | text-1 |
| 文章副标题（article-subtitle）| Serif | 17px | 1.55 | text-2 |
| 章节 h2 | Serif | 26px | 1.25 | text-1 |
| 章节 h3 | Sans | 15px / 600 / uppercase | - | text-2 |
| 正文 p | Sans | 15.5px | 1.85 | text-1 |
| 卡片标题 | Sans | 18px / 600 | 1.3 | text-1 |
| 标签 / meta 小字 | Sans | 11–12px | - | text-3 |
| section-title | Sans | 13px / 600 / uppercase | - | text-3 |

---

## 八、响应式断点

| 断点 | 变化 |
|---|---|
| `< 900px` | 封面：书目侧边栏收起；文章：TOC 侧栏隐藏；双栏→单栏 |
| `< 600px` | Nav links 隐藏；hub-hero padding 降至 40px/20px；标题缩小 |

---

## 九、交互规范

- **过渡时长**：`150ms ease`（统一，不用更长）
- **卡片 hover**：`translateY(-2px)` + `shadow-md` + `border-color → accent-border`
- **链接 hover**：仅颜色变化，无下划线（除非是纯文字链接段落内）
- **TOC scroll spy**：active item → `color: accent` + `border-color: accent` + `font-weight: 500`
- **不可交互状态**：`opacity .5–.7` + `pointer-events: none`，不用禁用色

---

## 十、禁止事项

- 不在 JSX/HTML 内硬编码中文 copy（统一由 `RESEARCH_CONFIG` 驱动）
- 不在样式文件内散落魔法数字（提取为 token 或注释说明来源）
- 不加 `!important`
- 不自造色值（必须用 token）
- 不做无来源的动画（如 bounce、flicker 等）
- Footer 深色区不延伸到其他区域
