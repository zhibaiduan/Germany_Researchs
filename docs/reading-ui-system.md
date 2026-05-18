# Reading-First UI System
> 一套用于「阅读型研究站点」的可复用 UI 设计规范。
> 定位：学术读物感 × 独立研究员视角。克制、高信息密度、像一本精排的行业报告。

---

## 一、设计语言

**核心定位**：阅读优先，信息密度高，克制而不简陋。

**三条不可妥协的原则**：
1. **信息层级清晰** — 每个页面有且只有一个核心目的，设计必须使其显而易见
2. **阅读体验第一** — 长文可读性高于视觉炫技，行高/字号/字重是核心武器
3. **克制的视觉质感** — 用间距、字重、灰阶做层次，不依赖装饰元素

**气质参照**：精排的行业报告书，不是博客，不是营销页面。

---

## 二、色彩 Token

```css
/* ── 页面底色 / 容器 ── */
--bg:           #F2F5F1;   /* 页面底色：浅绿灰，暖中性，不刺眼 */
--surface:      #FFFFFF;   /* 卡片 / 面板 / sidebar 背景 */
--border:       #D9E2D6;   /* 主边框 */
--border-light: #E4EBE2;   /* 次级分割线 */

/* ── 文字层次（三级） ── */
--text-1: #181C17;         /* 正文主色：近黑，高对比 */
--text-2: #576052;         /* 次级文字：中绿灰，正文辅助 */
--text-3: #8A9885;         /* 辅助文字：浅绿灰（标签、注释、meta）*/

/* ── 强调色系 ── */
--accent:       #2A6048;   /* 主强调：深绿（链接 active、左竖线、标记）*/
--accent-hover: #1E4A36;   /* 强调 hover 态 */
--accent-bg:    #EBF4EF;   /* 强调背景（callout、hover fill）*/
--accent-border:#B2D4C2;   /* 强调边框 */

/* ── 标签 ── */
--tag-bg:       #E8EDE6;   /* 标签背景 */
--tag-text:     #475542;   /* 标签文字 */

/* ── Footer 深色区（仅 footer 使用）── */
--footer-bg:    #0D1A12;
--footer-text:  #F0EBE3;
--footer-muted: #8A8480;
--footer-border:#1C2E22;
--footer-bar:   #445840;   /* footer bar 文字 */
```

**色彩规律**：整个系统只用一个色相（绿色），通过明度/饱和度变化构建层次。

**状态徽章专用色**：
| 状态 | 背景 | 边框 | 文字 |
|---|---|---|---|
| 已发布 | `#EAF5F0` | `#BFE0D0` | `#2E7D52` |
| 草稿 | `var(--tag-bg)` | `var(--border)` | `var(--text-3)` |
| 即将 | `#EFF4FB` | `#C2D3EC` | `#5E7FAA` |

---

## 三、字体系统

```css
--font-sans:  'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-serif: 'DM Serif Display', Georgia, serif;
```

**使用规则**：
- **Sans（Inter）** → 功能性文字：导航、正文段落、标签、meta、注释、表格
- **Serif（DM Serif Display）** → 展示性标题：页面大标题、章节 h2、引用块
- 混用原则：serif 负责气质，sans 负责可读性

**字号标尺**（8 级）：
```css
--fs-annotation: 12px;   /* 标签、注释、表头、footnote */
--fs-ui:         14px;   /* 导航、表格、TOC、meta、面包屑 */
--fs-body:       16px;   /* 正文段落、h3 */
--fs-heading-sm: 18px;   /* 卡片标题、文章副标题 */
--fs-heading:    24px;   /* h2 章节标题 */
--fs-heading-lg: 32px;   /* 页面英雄标题 */
--fs-display:    40px;   /* 文章主标题 */
--fs-stat:       28px;   /* 大数字、数据可视化 */
```

---

## 四、间距与布局

```css
--page-gutter: 32px;     /* 水平内边距，移动端降至 20px */
--radius:      6px;      /* 小组件圆角 */
--radius-lg:   10px;     /* 卡片、大面板圆角 */
--shadow-sm:   0 1px 4px rgba(0,0,0,.06);
--shadow-md:   0 4px 16px rgba(0,0,0,.08);
--nav-h:       60px;     /* 导航栏高度 */
```

- **基础单位：8px**，所有 padding/gap/margin 为 4px 的倍数
- **最大宽度：1120px**，居中对齐
- **栅格**：2 列卡片网格（封面），4px/8px 系统

---

## 五、页面结构体系

### 5.1 封面/目录页（Hub Page）

```
┌──────────────────────────────────────────────────┐
│  Nav（sticky，全宽，60px，磨砂效果）               │
├──────────────────────────────────┬───────────────┤
│  Left: 主内容                    │ Right: 书目栏  │
│  flex: 1                        │ 260px sticky   │
│                                  │                │
│  · 品牌标识 + 大标题（serif）     │ · CONTENTS 标签│
│  · 描述段落（text-2，1.8行高）   │ · 编号 + 标题  │
│  · 研究问题列表（accent callout）│ · 状态徽章     │
│  · meta 信息行                   │ · 点击跳转     │
│  ─── divider ───                │                │
│  · 内容卡片网格（2列）            │                │
├──────────────────────────────────┴───────────────┤
│  Footer（全宽，深色背景）                          │
└──────────────────────────────────────────────────┘
```

### 5.2 深度文章页（Article Page）

```
┌──────────────────────────────────────────────────┐
│  Nav（sticky）                                    │
│  ↳ 文章标题在滚动到正文后从 Nav 中心淡入显示       │
├──────────────────────────────────────────────────┤
│  面包屑（12px, text-3）                           │
├──────────────────────────────────────────────────┤
│  Article Header（全宽）                           │
│  · 专题标签（12px, uppercase, accent）            │
│  · 大标题（40px, serif）                          │
│  · 副标题（18px, serif, text-2）                  │
│  · meta（日期、阅读时长，12px, text-3）           │
├─────────────────────────┬────────────────────────┤
│  正文（flex: 1, ~740px） │ TOC（200px, sticky）    │
│                          │ · 章节列表              │
│  h2: serif, 24px        │ · scroll spy 高亮       │
│  h3: sans, 16px, caps   │ · 滚动时 dimmed 效果    │
│  p:  sans, 16px, 1.85   │                        │
│  blockquote: 居中引用    │                        │
├──────────────────────────┴────────────────────────┤
│  Article End（参考资料、延伸阅读）                 │
├──────────────────────────────────────────────────┤
│  Footer                                           │
└──────────────────────────────────────────────────┘
```

---

## 六、核心组件规范

### Nav（导航栏）
- `position: sticky; top: 0; height: 60px`
- `background: rgba(242,245,241,.94); backdrop-filter: blur(12px)`
- `border-bottom: 1px solid var(--border)`
- Logo 方块：28×28，accent 绿，border-radius 6px，白色字
- 链接：text-2 → hover text-1 → active text-1 + weight 500
- 文章页特性：滚过标题后，文章名从 nav 中心淡入（translateY + opacity，200ms）

### 卡片（Card）
```
default:  border 1px solid --border, radius-lg, surface 背景
hover:    border-color → accent-border, shadow-md, translateY(-2px)
draft:    opacity .7, pointer-events none
coming:   opacity .5, pointer-events none
transition: 150ms ease（border、shadow、transform 统一）
```

### Callout 块
```
border-left: 3px solid var(--accent)
border-radius: 0 radius-lg radius-lg 0
background: var(--surface)
border: 1px solid var(--border)
padding: 18px 20px

label: 12px / 700 / uppercase / letter-spacing .1em / accent
body:  14px / text-2 / 1.65行高 / sans
```

### 引用块（Blockquote）
```
居中布局，上下 border 而非左竖线
max-width: 520px; margin: 52px auto; padding: 36px 0
正文: serif, italic, 21px, 1.65行高, text-1
```

### 数据表格（Table）
```
表头: 12px / 600 / uppercase / text-3 / 底部 border
单元格: 14px / text-2 / padding 10px 12px
行 hover: accent-bg 填充
最后一行无底边框
```

### TOC 侧栏
```
width: 200px; position: sticky; top: calc(nav-h + 24px)
条目: 12px / text-3，left border 2px solid --border
active: color accent, border-color accent, font-weight 500
hover: color text-2, border-color text-3
滚动时整体 opacity 降至 0.35（scroll-dimmed 状态）
```

### 状态徽章
```
共同属性: 12px / 600 / border-radius 20px / padding 2px 8px
（已发布 / 草稿 / 即将 颜色见色彩 Token 表）
```

### Footer（深色区）
```
background: #0D1A12（仅此区域使用深色）
三栏 grid: 1.4fr 1fr 1fr，gap 56px
padding: 56px 32px 40px
footer-bar: 底部细栏，两端对齐版权信息
```

---

## 七、排版规范（完整对照表）

| 元素 | 字体 | 大小 | 行高 | 字重 | 颜色 |
|---|---|---|---|---|---|
| 页面大标题 | Serif | 32px | 1.15 | 400 | text-1 |
| 文章主标题 | Serif | 40px | 1.15 | 400 | text-1 |
| 文章副标题 | Serif | 18px | 1.55 | 400 | text-2 |
| h2 章节 | Serif | 24px | 1.25 | 400 | text-1 |
| h3 子节 | Sans | 16px | - | 600 / uppercase | text-2 |
| 正文段落 | Sans | 16px | 1.85 | 400 | text-1 |
| 引用 | Serif | 21px | 1.65 | 400 / italic | text-1 |
| 卡片标题 | Sans | 18px | 1.3 | 600 | text-1 |
| 导航 / 表格 | Sans | 14px | - | 400~500 | text-2 |
| 标签 / meta | Sans | 12px | - | 500~600 | text-3 |
| Section 标题 | Sans | 14px | - | 600 / uppercase | text-3 |

---

## 八、交互规范

| 行为 | 规格 |
|---|---|
| 所有过渡时长 | `150ms ease`，不超过 200ms |
| 卡片 hover | `translateY(-2px)` + `shadow-md` + `border-color: accent-border` |
| 链接 hover | 仅颜色变化，无下划线（正文内纯文字链接除外）|
| TOC active | `color: accent` + `border-color: accent` + `font-weight: 500` |
| 不可交互 | `opacity .5–.7` + `pointer-events: none`，不用禁用灰 |
| Nav 标题 | `opacity 0 → 1` + `translateY(5px) → 0`，200ms ease |
| TOC 滚动 | 快速滚动时 panel opacity → 0.35，停止后恢复（300ms ease）|

---

## 九、响应式断点

| 断点 | 变化 |
|---|---|
| `< 960px` | 卡片网格 2列→1列；文章 TOC 侧栏隐藏；双栏→单栏 |
| `< 768px` | `--page-gutter` 降至 20px |
| `< 600px` | Nav links 隐藏；大标题缩小（32px→24px, 40px→32px）|

---

## 十、设计禁令

- **禁止** 在 Token 之外散落 hex 色值
- **禁止** `!important`
- **禁止** 无来源的装饰动画（bounce、flicker 等）
- **禁止** 在模板/组件内硬编码文案 copy（统一由数据配置驱动）
- **禁止** Footer 深色延伸到其他区域
- **禁止** 样式文件内的魔法数字（必须提取为 token 或注释说明来源）
- **禁止** 超过 200ms 的普通 UI 过渡（加载动画除外）

---

## 十一、可复用的设计决策要点

以下是本系统中**最容易被忽略但最有价值**的设计判断，直接影响「阅读型」网站的质感：

1. **背景不用纯白**：用 `#F2F5F1`（浅绿灰）作底色，卡片/面板用白色，形成自然层次，纸张感更强
2. **三级文字灰**：text-1/2/3 三层，文字层次不靠字号，靠颜色，更克制
3. **accent 色只用一个色相**：从深（`#2A6048`）到浅（`#EBF4EF`），整站统一，不散乱
4. **h3 全大写**：`text-transform: uppercase`，用于正文子节标题，视觉权重低但区分明显
5. **正文行高 1.85**：比常规 1.6 高，长文阅读疲劳感降低
6. **卡片 hover 上浮 -2px**：幅度极小，克制而有反馈感
7. **Nav 磨砂效果**：`backdrop-filter: blur(12px)` + 半透明背景，背景内容隐约可见
8. **引用块居中而非左竖线**：大段引用用上下 border 居中展示，比左竖线更有仪式感
9. **TOC 滚动时 dimmed**：快速滚动时 TOC opacity 降低，减少视觉干扰，停下来才看清
10. **Footer 是唯一深色区**：整站只有一处深色，对比强烈，形成强收尾感
