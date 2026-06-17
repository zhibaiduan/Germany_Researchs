const fs = require('fs');

const sourcePath = '/Users/miumiu/Documents/Obsidian/小段想东想西/T-B2B-German/Enterprise AI/企业 AI 的战争地图：谁在争夺流程执行权.md';
const outputPath = 'topics/sap-ai-execution-layer.html';

let markdown = fs.readFileSync(sourcePath, 'utf8');
markdown = markdown.replace(/^---[\s\S]*?---\s*/, '');

const keySentences = [
  '所以，企业 AI 的价值不是平均分布的。',
  'Enterprise AI 的竞争，不是所有人打一场仗，而是很多场局部战役叠在一起。',
  '这才是最关键的一场。',
  '它打的是：谁能让 AI 在企业真实流程里触发动作、修改状态、推进审批、处理异常，并留下可审计的记录。',
  '主线仍然是：谁能被企业授权，在受控条件下执行高价值流程。',
  'Enterprise AI 最热闹的地方，是入口和发布会。',
  '但最值钱的地方，往往更安静：订单、发票、库存、合同、付款、员工、供应商、成本中心，以及这些对象背后的权限、审计、流程和责任。',
  '受控的企业流程执行权。'
];

const stageLabels = new Set([
  '第一类是个人效率。',
  '第二类是部门效率。',
  '第三类是流程自动化。',
  '第四类是核心业务执行。',
  '第五类是数据智能。',
  '第六类是治理安全。',
  '第一场，是 AI 工作入口战。',
  '第二场，是 Agent 构建平台战。',
  '第三场，是客户交互 agent 战。',
  '第四场，是数据语义战。',
  '第五场，是治理与审计战。',
  '第六场，是核心业务流程执行战。',
  '第七场，是 HCM 和组织智能战。'
]);

const summarySentences = new Set([
  '所以，企业 AI 的价值不是平均分布的。',
  'Enterprise AI 的竞争，不是所有人打一场仗，而是很多场局部战役叠在一起。',
  '这才是最关键的一场。',
  '主线仍然是：谁能被企业授权，在受控条件下执行高价值流程。'
]);

const playerNames = [
  'Microsoft',
  'SAP',
  'Salesforce',
  'ServiceNow',
  'Oracle',
  'Workday'
];

const codeCaptions = [
  '图：企业 AI 的六类切入口，从个人效率走向核心业务执行。',
  '图：六个 Enterprise AI 玩家原始地盘示意。',
  '图：Enterprise AI 玩家从各自根据地向流程执行权推进。',
  '图：战役关系图，总战役是高价值流程执行权。',
  '表：玩家在主战场和支撑战场上的资源条件。',
  '图：主战场、支撑战场与局部高价值战场分布。'
];

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(value) {
  let text = escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

  playerNames.forEach(name => {
    const escaped = escapeHtml(name);
    text = text.replace(new RegExp(`\\b${escaped}\\b`, 'g'), `<strong class="player-name">${escaped}</strong>`);
  });

  keySentences.forEach(sentence => {
    const escaped = escapeHtml(sentence);
    text = text.replace(escaped, `<strong class="key-strong">${escaped}</strong>`);
  });

  return text;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

function renderMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = [];
  let orderedList = [];
  let code = [];
  let inCode = false;
  let codeIndex = 0;
  let skipFirstH1 = true;

  function flushParagraph() {
    if (!paragraph.length) return;
    const joined = paragraph.join(' ').replace(/  /g, '<br>');
    if (stageLabels.has(joined)) {
      html.push(`<p class="stage-label">${inline(joined)}</p>`);
    } else if (summarySentences.has(joined)) {
      html.push(`<p class="stage-summary">${inline(joined)}</p>`);
    } else {
      html.push(`<p>${inline(joined)}</p>`);
    }
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push(`<ul>\n${list.map(item => `  <li>${inline(item)}</li>`).join('\n')}\n</ul>`);
    list = [];
  }

  function flushOrderedList() {
    if (!orderedList.length) return;
    html.push(`<ol>\n${orderedList.map(item => `  <li>${inline(item)}</li>`).join('\n')}\n</ol>`);
    orderedList = [];
  }

  function flushAll() {
    flushParagraph();
    flushList();
    flushOrderedList();
  }

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (inCode) {
      if (line.startsWith('```')) {
        codeIndex += 1;
        html.push(`<figure class="article-figure war-map-diagram">
  <div class="diagram-label">Figure ${String(codeIndex).padStart(2, '0')}</div>
  <pre><code>${escapeHtml(code.join('\n'))}</code></pre>
  <figcaption>${escapeHtml(codeCaptions[codeIndex - 1] || '图：文章中的结构关系图。')}</figcaption>
</figure>`);
        code = [];
        inCode = false;
      } else {
        code.push(raw.replace(/^\s{0,4}/, ''));
      }
      continue;
    }

    if (line.startsWith('```')) {
      flushAll();
      inCode = true;
      continue;
    }

    if (!line.trim()) {
      flushAll();
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level === 1 && skipFirstH1) {
        skipFirstH1 = false;
        continue;
      }
      const tag = level <= 2 ? 'h2' : 'h3';
      html.push(`<${tag} id="${slugify(text)}">${inline(text)}</${tag}>`);
      continue;
    }

    if (line.startsWith('> ')) {
      flushAll();
      html.push(`<blockquote class="key-quote"><p>${inline(line.slice(2).trim())}</p></blockquote>`);
      continue;
    }

    if (/^-\s+/.test(line)) {
      flushParagraph();
      flushOrderedList();
      list.push(line.replace(/^-\s+/, ''));
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      flushList();
      orderedList.push(line.replace(/^\d+\.\s+/, ''));
      continue;
    }

    paragraph.push(line.trim());
  }

  flushAll();
  return html.join('\n\n');
}

const articleBody = renderMarkdown(markdown);

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>企业 AI 的战争地图 — SAP Research</title>
  <link rel="stylesheet" href="../assets/style.css">
  <style>
    .key-strong {
      padding: 0 3px;
      border-radius: 3px;
      background: color-mix(in srgb, var(--accent-bg) 82%, transparent);
      color: color-mix(in srgb, var(--text-1) 70%, var(--accent));
      font-weight: 800;
    }
    .player-name {
      color: color-mix(in srgb, var(--text-1) 76%, var(--accent));
      font-weight: 800;
    }
    .stage-label {
      margin-top: 30px !important;
      margin-bottom: 10px !important;
      color: var(--accent);
      font-size: 17px !important;
      line-height: 1.45 !important;
      font-weight: 800;
    }
    .stage-label + p {
      margin-top: 0 !important;
    }
    .stage-summary {
      margin: 34px 0 52px !important;
      padding: 16px 20px;
      border-left: 3px solid var(--accent);
      border-radius: var(--radius);
      background: rgba(235,244,239,.64);
      color: var(--text-1);
      font-size: 17px !important;
      line-height: 1.72 !important;
      font-weight: 700;
    }
    .key-quote {
      border-left-color: var(--accent) !important;
      background: rgba(235,244,239,.58);
    }
    .war-map-diagram {
      width: min(980px, 100%);
      max-width: 100%;
      min-width: 0;
      margin: 34px 0 48px;
      padding: 18px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: rgba(255,255,255,.54);
      overflow: hidden;
    }
    .war-map-diagram pre {
      display: block;
      max-width: 100%;
      margin: 0;
      overflow-x: auto;
      color: var(--text-1);
      font-size: 14px;
      line-height: 1.65;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      white-space: pre;
    }
    .war-map-diagram code {
      display: block;
      width: max-content;
      min-width: 100%;
    }
    .war-map-diagram figcaption {
      margin-top: 12px;
      color: var(--text-3);
      font-size: var(--fs-annotation);
      line-height: 1.55;
    }
    .diagram-label {
      margin-bottom: 10px;
      color: var(--accent);
      font-size: var(--fs-annotation);
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    @media (max-width: 720px) {
      .article-content {
        width: 100%;
        max-width: 100%;
        min-width: 0;
      }
      .stage-label {
        font-size: 16px !important;
      }
      .stage-summary {
        padding: 14px 16px;
        font-size: 16px !important;
      }
      .war-map-diagram {
        padding: 14px;
      }
      .war-map-diagram pre {
        font-size: 12px;
      }
    }
  </style>
</head>
<body>

  <div id="nav-mount"></div>

  <div class="page-layout">

    <aside class="global-sidebar" id="sidebar-mount"></aside>

    <div class="page-content">
  <div class="article-wrap">

    <div class="breadcrumb">
      <a href="../index.html">SAP Research</a>
      <span class="breadcrumb-sep">›</span>
      <span>Enterprise AI 战争地图</span>
    </div>

    <header class="article-header">
      <div class="article-topic-label">专题 07 · Enterprise AI</div>
      <h1 class="article-title">企业 AI 的战争地图</h1>
      <p class="article-subtitle">谁在争夺流程执行权？</p>
      <div class="article-meta">
        <span class="article-meta-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          2026-06-12
        </span>
        <span class="article-meta-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          18 分钟阅读
        </span>
        <span class="tag">Enterprise AI</span>
        <span class="tag">流程执行权</span>
        <span class="tag">AI 战略</span>
      </div>
    </header>

    <div class="article-body">
      <div class="article-content">
${articleBody}

      </div>
      <aside class="toc-panel">
        <div class="toc-inner" id="toc"></div>
      </aside>
    </div>

  </div>
    </div>

  </div>

  <script src="../config.js?v=20260607-map-asset"></script>
  <script src="../assets/script.js?v=20260607-map-asset"></script>
</body>
</html>
`;

fs.writeFileSync(outputPath, html);
