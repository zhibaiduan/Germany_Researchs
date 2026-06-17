const fs = require('fs');
const path = require('path');

const [,, sourcePath, outputPath, metadataPath] = process.argv;

if (!sourcePath || !outputPath) {
  console.error('Usage: node tools/render_markdown_article.js <source.md> <output.html>');
  process.exit(1);
}

let markdown = fs.readFileSync(sourcePath, 'utf8');
markdown = markdown.replace(/^---[\s\S]*?---\s*/, '');
const isEnglishArticle = /(^|\/)en\.md$/.test(sourcePath);

const defaultMetadata = {
  topicLabel: '专题 06 · Autonomous Enterprise',
  title: 'SAP 的公司级 AI 自动驾驶',
  subtitle: 'Autonomous Enterprise 到底是什么？',
  date: '2026-06-07',
  readingTime: '9 分钟阅读',
  tags: ['Autonomous Enterprise', 'Business AI', 'Joule'],
  breadcrumb: '自主企业'
};

const metadata = metadataPath
  ? { ...defaultMetadata, ...JSON.parse(fs.readFileSync(metadataPath, 'utf8')) }
  : defaultMetadata;

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(value) {
  let text = escapeHtml(value);
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/“([^”]+)”/g, '“$1”');
  return text;
}

function slugify(text, used) {
  const ascii = text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
  let slug = ascii || `section-${used.size + 1}`;
  let candidate = slug;
  let i = 2;
  while (used.has(candidate)) {
    candidate = `${slug}-${i}`;
    i += 1;
  }
  used.add(candidate);
  return candidate;
}

function renderTable(rows) {
  const cells = rows.map(row => row.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim()));
  const head = cells[0] || [];
  const body = cells.slice(2);
  const tableClass = head.length >= 2 && head.length <= 3 ? ' class="article-comparison-table"' : '';
  return `<table${tableClass}>
  <thead><tr>${head.map(cell => `<th>${inline(cell)}</th>`).join('')}</tr></thead>
  <tbody>
    ${body.map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('\n    ')}
  </tbody>
</table>`;
}

function renderReferenceTable(rows) {
  const cells = rows.map(row => row.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim()));
  const head = cells[0] || [];
  const body = cells.slice(2);
  const renderSourceCell = cell => inline(cell).replace(
    /<a href="([^"]+)">/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">'
  );

  return `<div class="article-end">
  <div class="article-end-section">
    <div class="article-end-label">信息来源与可信度评估</div>
    <table class="data-table">
      <thead><tr>${head.map(cell => `<th>${inline(cell)}</th>`).join('')}</tr></thead>
      <tbody>
        ${body.map(row => `<tr>${row.map((cell, index) => `<td>${index === 0 ? renderSourceCell(cell) : inline(cell)}</td>`).join('')}</tr>`).join('\n        ')}
      </tbody>
    </table>
  </div>
</div>`;
}

function renderCodeBlock(lines, index) {
  if (sourcePath.includes('enterprise-ai-war-map-germany')) {
    return renderEnterpriseAiFigure(index, lines);
  }

  return `<figure class="article-code-figure">
  <div class="article-code-label">Figure ${String(index).padStart(2, '0')}</div>
  <pre><code>${escapeHtml(lines.join('\n'))}</code></pre>
</figure>`;
}

function renderEnterpriseAiFigure(index, lines) {
  const fallback = `<figure class="article-code-figure">
  <div class="article-code-label">Figure ${String(index).padStart(2, '0')}</div>
  <pre><code>${escapeHtml(lines.join('\n'))}</code></pre>
</figure>`;

  const svgWrap = (title, caption, viewBox, body) => `<figure class="sketch-figure">
  <div class="sketch-label">Figure ${String(index).padStart(2, '0')} · ${title}</div>
  <figcaption>${caption}</figcaption>
  <svg class="sketch-canvas" viewBox="${viewBox}" role="img" aria-label="${escapeHtml(caption)}">
    <defs>
      <marker id="arrow-${index}" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"></path>
      </marker>
      <filter id="paper-shadow-${index}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.8" flood-color="#181C17" flood-opacity=".12"></feDropShadow>
      </filter>
    </defs>
${body}
  </svg>
</figure>`;

  const textLines = (x, y, lines, cls = 'sketch-text') => `<text x="${x}" y="${y}" class="${cls}">${lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : 17}">${line}</tspan>`).join('')}</text>`;
  const node = (x, y, w, h, title, body, tone = 'green', big = false) => `
    <g class="sketch-node ${tone}" filter="url(#paper-shadow-${index})">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9"></rect>
      <path class="sketch-rough" d="M${x + 4} ${y + 5} C${x + w * .35} ${y - 2}, ${x + w * .65} ${y + 7}, ${x + w - 5} ${y + 4}"></path>
      <text x="${x + 16}" y="${y + 28}" class="${big ? 'sketch-title big' : 'sketch-title'}">${title}</text>
      ${body ? textLines(x + 16, y + 52, body, 'sketch-text') : ''}
    </g>`;
  const arrow = (x1, y1, x2, y2, tone = 'green', dashed = false, curve = 0) => {
    const d = curve ? `M${x1} ${y1} C${x1 + curve} ${y1}, ${x2 - curve} ${y2}, ${x2} ${y2}` : `M${x1} ${y1} L${x2} ${y2}`;
    return `<path class="sketch-arrow ${tone}${dashed ? ' dashed' : ''}" d="${d}" marker-end="url(#arrow-${index})"></path>`;
  };

  if (index === 1) {
    return `<figure class="article-image-figure">
  <figcaption>Figure: six scenarios of enterprise using AI</figcaption>
  <img src="../assets/images/enterprise-ai-six-scenarios.png" alt="The Six Scenarios of Enterprise AI diagram">
</figure>`;
  }

  if (index === 2) {
    return `<figure class="article-image-figure">
  <figcaption>Figure 02 · Player Positioning</figcaption>
  <img src="../assets/images/enterprise-ai-player-positioning.svg" alt="Where are these six enterprise AI players positioned">
</figure>`;
  }

  if (index === 3) {
    const scenarioLabel = isEnglishArticle ? 'Step 1 · Scenario Value' : 'Step 1 · 场景价值';
    const playerLabel = isEnglishArticle ? 'Step 2 · Player Positioning' : 'Step 2 · 玩家位置';
    return `<figure class="article-image-figure value-matrix-figure">
  <figcaption>Figure 03 · Value Matrix</figcaption>
  <div class="value-matrix-tabs">
    <input type="radio" name="value-matrix-view" id="value-matrix-scenarios" checked>
    <input type="radio" name="value-matrix-view" id="value-matrix-players">
    <div class="value-matrix-stage">
      <div class="value-matrix-track">
        <div class="value-matrix-slide">
          <img src="../assets/images/enterprise-ai-value-scenarios.svg" alt="The value of six enterprise AI scenarios mapped by profit pool and switching cost">
        </div>
        <div class="value-matrix-slide">
          <img src="../assets/images/enterprise-ai-value-players.svg" alt="Enterprise AI players mapped by profit pool and switching cost">
        </div>
      </div>
      <label class="value-matrix-nav value-nav-prev" for="value-matrix-scenarios" aria-label="Show scenario value view">‹</label>
      <label class="value-matrix-nav value-nav-next" for="value-matrix-players" aria-label="Show player position view">›</label>
    </div>
    <div class="value-matrix-tabbar" aria-label="Value matrix views">
      <label for="value-matrix-scenarios">${scenarioLabel}</label>
      <label for="value-matrix-players">${playerLabel}</label>
    </div>
  </div>
</figure>`;
  }

  if (index === 4) {
    return `<figure class="article-image-figure">
  <figcaption>Figure 04 · Strategic Card Table</figcaption>
  <img src="../assets/images/enterprise-ai-card-game-summary.svg" alt="Strategic card table summary for enterprise AI players">
</figure>`;
  }

  if (index === 5) {
    const finalMapCopy = isEnglishArticle ? {
      step1: '<strong>Step 1.</strong> First, split the market: enterprise AI is not one entry-point market, but four execution positions plus two foundations.',
      step2: '<strong>Step 2.</strong> Then place the players: SAP, Microsoft, and ServiceNow do not start from the same track. Each expands outward from its existing system advantage.',
      step3: '<strong>Step 3.</strong> Judge value: long-term commercial value depends on the product of profit pool and moat. The upper-right corner is the area to watch.',
      step4: '<strong>Step 4.</strong> Return to the strategic hand: the closer a position is to core execution, the more valuable it is, and the more it depends on authorization, governance, audit, and compliance.',
      label1: '1 Market Structure',
      label2: '2 Player Position',
      label3: '3 Value Logic',
      label4: '4 Strategic Hand'
    } : {
      step1: '<strong>Step 1.</strong> 先拆市场：企业 AI 不是一个入口市场，而是四个执行位置加两个底座。',
      step2: '<strong>Step 2.</strong> 再看玩家：SAP、Microsoft、ServiceNow 不是同赛道起跑，而是从各自系统优势向外推。',
      step3: '<strong>Step 3.</strong> 判断价值：长期商业价值取决于利润空间和护城河的乘积，右上角最值得追踪。',
      step4: '<strong>Step 4.</strong> 回到牌局：越接近核心执行，越值钱，也越依赖授权、治理、审计和合规。',
      label1: '1 市场结构',
      label2: '2 玩家位置',
      label3: '3 价值判断',
      label4: '4 牌局结论'
    };
    return `<figure class="article-image-figure final-map-deck">
  <figcaption>Figure 05 · Final Reasoning Map</figcaption>
  <div class="final-map-tabs">
    <input type="radio" name="final-map-view" id="final-map-step-1" checked>
    <input type="radio" name="final-map-view" id="final-map-step-2">
    <input type="radio" name="final-map-view" id="final-map-step-3">
    <input type="radio" name="final-map-view" id="final-map-step-4">
    <div class="final-map-stage">
      <section class="final-map-slide final-step-1">
        <img src="../assets/images/enterprise-ai-six-scenarios.png" alt="The six scenarios of enterprise AI">
        <p>${finalMapCopy.step1}</p>
      </section>
      <section class="final-map-slide final-step-2">
        <img src="../assets/images/enterprise-ai-player-positioning.svg" alt="Enterprise AI player positioning map">
        <p>${finalMapCopy.step2}</p>
      </section>
      <section class="final-map-slide final-step-3">
        <img src="../assets/images/enterprise-ai-value-players.svg" alt="Enterprise AI value matrix by players">
        <p>${finalMapCopy.step3}</p>
      </section>
      <section class="final-map-slide final-step-4">
        <img src="../assets/images/enterprise-ai-card-game-summary.svg" alt="Strategic card table summary for enterprise AI players">
        <p>${finalMapCopy.step4}</p>
      </section>
    </div>
    <div class="final-map-tabbar" aria-label="Final reasoning map views">
      <label for="final-map-step-1">${finalMapCopy.label1}</label>
      <label for="final-map-step-2">${finalMapCopy.label2}</label>
      <label for="final-map-step-3">${finalMapCopy.label3}</label>
      <label for="final-map-step-4">${finalMapCopy.label4}</label>
    </div>
  </div>
</figure>`;
  }

  return fallback;
}

function renderConclusionList(items) {
  const rows = items.map((item, index) => {
    const code = String(index + 1).padStart(2, '0');
    return `  <div class="conclusion-item">
    <div class="conclusion-code">${code}</div>
    <div class="conclusion-text">${inline(item)}</div>
  </div>`;
  }).join('\n');
  return `<div class="conclusion-list">
${rows}
</div>`;
}

function renderMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const usedIds = new Set();
  const html = [];
  let paragraph = [];
  let list = [];
  let orderedList = [];
  let table = [];
  let code = [];
  let inCode = false;
  let codeIndex = 0;
  let skipFirstH1 = true;
  let currentHeading = '';

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push(`<ul>\n${list.map(item => `  <li>${inline(item)}</li>`).join('\n')}\n</ul>`);
    list = [];
  }

  function flushOrderedList() {
    if (!orderedList.length) return;
    if (currentHeading === '核心结论' || currentHeading === 'Takeaways') {
      html.push(renderConclusionList(orderedList));
    } else {
      html.push(`<ol>\n${orderedList.map(item => `  <li>${inline(item)}</li>`).join('\n')}\n</ol>`);
    }
    orderedList = [];
  }

  function flushTable() {
    if (!table.length) return;
    html.push(currentHeading === 'References' ? renderReferenceTable(table) : renderTable(table));
    table = [];
  }

  function flushAll() {
    flushParagraph();
    flushList();
    flushOrderedList();
    flushTable();
  }

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (inCode) {
      if (line.startsWith('```')) {
        codeIndex += 1;
        html.push(renderCodeBlock(code, codeIndex));
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
      if (currentHeading === 'Takeaways' && orderedList.length) {
        flushParagraph();
        flushList();
        flushTable();
        continue;
      }
      flushAll();
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushAll();
      html.push('<div class="article-section-divider" aria-hidden="true"></div>');
      continue;
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      flushParagraph();
      flushList();
      flushOrderedList();
      table.push(line);
      continue;
    }

    flushTable();

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      flushOrderedList();
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level === 1 && skipFirstH1) {
        skipFirstH1 = false;
        continue;
      }
      const tag = level <= 2 ? 'h2' : 'h3';
      const id = slugify(text, usedIds);
      currentHeading = text;
      if (text === 'References') {
        continue;
      }
      html.push(`<${tag} id="${id}">${inline(text)}</${tag}>`);
      continue;
    }

    if (line.startsWith('> ')) {
      flushParagraph();
      flushList();
      flushOrderedList();
      const quoteText = line.slice(2).trim();
      const normalizedQuote = quoteText.replace(/^\*+/, '');
      if (normalizedQuote.startsWith('判断：') || normalizedQuote.startsWith('Judgment:')) {
        html.push(`<p>${inline(quoteText)}</p>`);
      } else {
        html.push(`<blockquote><p>${inline(quoteText)}</p></blockquote>`);
      }
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

    if (orderedList.length && /^\s{3,}\S/.test(raw)) {
      orderedList[orderedList.length - 1] += `<br>${line.trim()}`;
      continue;
    }

    paragraph.push(line.trim());
  }

  if (inCode) {
    codeIndex += 1;
    html.push(renderCodeBlock(code, codeIndex));
  }

  flushAll();
  return html.join('\n\n');
}

const articleBody = renderMarkdown(markdown);
const tagHtml = metadata.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('\n        ');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metadata.title)} · SAP Research</title>
  <link rel="stylesheet" href="../assets/style.css">
  <style>
    .conclusion-list {
      border-left: 2px solid var(--accent);
      margin: 28px 0 44px;
      padding: 2px 0 2px 30px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .conclusion-item {
      display: grid;
      grid-template-columns: 42px minmax(0, 1fr);
      gap: 22px;
      align-items: start;
    }
    .conclusion-code {
      color: var(--accent);
      font-family: var(--font-sans);
      font-size: 16px;
      font-weight: 700;
      letter-spacing: .04em;
      line-height: 1.75;
    }
    .conclusion-text {
      color: var(--text-1);
      font-size: var(--fs-body);
      line-height: 1.78;
    }
    .conclusion-text strong {
      font-weight: 700;
      color: var(--text-1);
    }
    .article-section-divider {
      width: 64px;
      height: 1px;
      margin: 100px auto;
      background: linear-gradient(
        90deg,
        color-mix(in srgb, var(--accent) 0%, transparent),
        color-mix(in srgb, var(--accent) 80%, transparent) 50%,
        color-mix(in srgb, var(--accent) 0%, transparent)
      );
    }
    .article-code-figure {
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
    .article-code-figure pre {
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
    .article-code-figure code {
      display: block;
      width: max-content;
      min-width: 100%;
    }
    .article-code-label {
      margin-bottom: 10px;
      color: var(--accent);
      font-size: var(--fs-annotation);
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .article-image-figure {
      width: min(980px, 100%);
      margin: 34px 0 52px;
      padding: 0;
      border: 0;
      border-radius: 0;
      background: transparent;
    }
    .article-image-figure figcaption {
      margin: 0 0 12px;
      color: var(--accent);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .article-image-figure img {
      width: 100%;
      height: auto;
      border-radius: 0;
      display: block;
    }
    .value-matrix-tabs {
      width: 100%;
    }
    .value-matrix-tabs input {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      opacity: 0;
      pointer-events: none;
    }
    .value-matrix-stage {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .value-matrix-track {
      display: flex;
      width: 200%;
      transition: transform .28s ease;
    }
    .value-matrix-slide {
      flex: 0 0 50%;
      min-width: 0;
    }
    .article-image-figure .value-matrix-slide img {
      display: block;
      width: 100%;
      height: auto;
    }
    #value-matrix-players:checked ~ .value-matrix-stage .value-matrix-track {
      transform: translateX(-50%);
    }
    .value-matrix-nav {
      position: absolute;
      top: 50%;
      z-index: 2;
      display: none;
      align-items: center;
      justify-content: center;
      inline-size: 34px;
      block-size: 42px;
      border: 1px solid rgba(45, 95, 73, .2);
      border-radius: 999px;
      color: var(--accent);
      background: rgba(255, 255, 255, .82);
      box-shadow: 0 6px 18px rgba(34, 55, 45, .08);
      font-size: 30px;
      font-weight: 700;
      line-height: 1;
      transform: translateY(-50%);
      cursor: pointer;
      user-select: none;
    }
    .value-nav-prev {
      left: 12px;
    }
    .value-nav-next {
      right: 12px;
    }
    #value-matrix-scenarios:checked ~ .value-matrix-stage .value-nav-next,
    #value-matrix-players:checked ~ .value-matrix-stage .value-nav-prev {
      display: flex;
    }
    .value-matrix-tabbar {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
    }
    .value-matrix-tabbar label {
      min-width: 132px;
      padding: 7px 14px;
      border: 1px solid rgba(45, 95, 73, .18);
      border-radius: 999px;
      color: var(--text-2);
      background: rgba(255, 255, 255, .62);
      font-size: var(--fs-ui);
      font-weight: 700;
      line-height: 1.2;
      text-align: center;
      cursor: pointer;
      transition: background .18s ease, border-color .18s ease, color .18s ease;
    }
    #value-matrix-scenarios:checked ~ .value-matrix-tabbar label[for="value-matrix-scenarios"],
    #value-matrix-players:checked ~ .value-matrix-tabbar label[for="value-matrix-players"] {
      border-color: rgba(45, 95, 73, .42);
      color: var(--accent);
      background: rgba(231, 241, 235, .86);
    }
    .final-map-tabs input {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      opacity: 0;
      pointer-events: none;
    }
    .final-map-stage {
      width: 100%;
    }
    .final-map-slide {
      display: none;
    }
    #final-map-step-1:checked ~ .final-map-stage .final-step-1,
    #final-map-step-2:checked ~ .final-map-stage .final-step-2,
    #final-map-step-3:checked ~ .final-map-stage .final-step-3,
    #final-map-step-4:checked ~ .final-map-stage .final-step-4 {
      display: block;
    }
    .article-image-figure .final-map-slide img {
      width: 100%;
      height: auto;
      display: block;
    }
    .final-map-slide p {
      margin: 12px 0 0;
      color: var(--text-2);
      font-size: var(--fs-ui);
      line-height: 1.65;
    }
    .final-map-slide p strong {
      color: var(--accent);
    }
    .final-map-tabbar {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      margin-top: 14px;
    }
    .final-map-tabbar label {
      padding: 8px 10px;
      border: 1px solid rgba(45, 95, 73, .18);
      border-radius: 999px;
      color: var(--text-2);
      background: rgba(255, 255, 255, .62);
      font-size: var(--fs-ui);
      font-weight: 700;
      line-height: 1.2;
      text-align: center;
      cursor: pointer;
      transition: background .18s ease, border-color .18s ease, color .18s ease;
    }
    #final-map-step-1:checked ~ .final-map-tabbar label[for="final-map-step-1"],
    #final-map-step-2:checked ~ .final-map-tabbar label[for="final-map-step-2"],
    #final-map-step-3:checked ~ .final-map-tabbar label[for="final-map-step-3"],
    #final-map-step-4:checked ~ .final-map-tabbar label[for="final-map-step-4"] {
      border-color: rgba(45, 95, 73, .42);
      color: var(--accent);
      background: rgba(231, 241, 235, .86);
    }
    @media (max-width: 640px) {
      .final-map-tabbar {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .logic-figure {
      width: min(980px, 100%);
      margin: 34px 0 52px;
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background:
        radial-gradient(circle at 50% 28%, rgba(255,255,255,.82), transparent 42%),
        linear-gradient(135deg, rgba(255,255,255,.68), rgba(232,238,231,.42));
    }
    .logic-label {
      margin-bottom: 8px;
      color: var(--accent);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
    .logic-figure figcaption {
      margin: 0 0 14px;
      color: var(--text-2);
      font-size: var(--fs-ui);
      line-height: 1.6;
    }
    .logic-canvas {
      position: relative;
      height: 640px;
      border-radius: var(--radius);
      background: transparent;
      overflow: hidden;
    }
    .logic-image-title {
      position: absolute;
      top: 18px;
      left: 0;
      right: 0;
      z-index: 3;
      color: var(--accent);
      font-size: 19px;
      font-weight: 700;
      letter-spacing: .02em;
      text-align: center;
    }
    .logic-lines {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
    }
    .logic-line {
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: .7;
    }
    .logic-line.dashed {
      stroke-dasharray: 8 8;
    }
    .logic-line.faint {
      opacity: .24;
      stroke-width: 1.7;
    }
    .logic-line.green { color: #2A6048; }
    .logic-line.blue { color: #537791; }
    .logic-line.brown { color: #8E735B; }
    .logic-line.red { color: #A76F63; }
    .logic-line.support { color: rgba(24,28,23,.50); stroke-width: 1.45; }
    .logic-line.progression { color: rgba(24,28,23,.58); stroke-width: 1.5; }
    .logic-line.feedback { color: rgba(24,28,23,.48); stroke-width: 1.4; }
    .logic-line.risk { color: rgba(24,28,23,.62); stroke-width: 1.55; }
    .logic-node {
      position: absolute;
      left: var(--x);
      top: var(--y);
      z-index: 2;
      width: var(--w);
      min-height: var(--h);
      padding: 12px 14px;
      border: 1px solid rgba(24,28,23,.16);
      border-radius: 10px;
      background: rgba(255,255,255,.74);
      box-shadow: none;
      color: var(--text-1);
    }
    .logic-node::before {
      content: none;
    }
    .logic-node strong,
    .logic-node span,
    .logic-node small,
    .logic-node em {
      display: block;
    }
    .logic-node strong {
      color: var(--text-1);
      font-size: 17px;
      line-height: 1.2;
      font-weight: 700;
    }
    .logic-stage strong {
      font-size: 16px;
    }
    .logic-node span {
      margin-top: 6px;
      color: var(--text-2);
      font-size: 12px;
      line-height: 1.35;
    }
    .logic-node small {
      margin-top: 3px;
      color: var(--text-2);
      font-size: 11px;
      line-height: 1.35;
    }
    .logic-node em {
      position: absolute;
      right: 12px;
      top: 12px;
      color: currentColor;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
    }
    .logic-kicker {
      color: var(--text-3);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .09em;
      line-height: 1.2;
      text-transform: uppercase;
    }
    .logic-low {
      color: #5B55A6;
      background: rgba(255,255,255,.76);
      border-color: rgba(91,85,166,.42);
    }
    .logic-mid,
    .logic-data {
      color: #537791;
      background: rgba(255,255,255,.76);
      border-color: rgba(83,119,145,.42);
    }
    .logic-high {
      color: #8E4D3B;
      background: rgba(255,255,255,.76);
      border-color: rgba(142,77,59,.40);
    }
    .logic-core,
    .logic-governance {
      color: #8E4D3B;
      background: rgba(255,255,255,.76);
      border-color: rgba(142,77,59,.40);
    }
    .logic-axis-label {
      position: absolute;
      left: 0;
      right: 0;
      top: 210px;
      z-index: 2;
      color: var(--text-2);
      font-size: 13px;
      font-weight: 650;
      text-align: center;
    }
    .risk-low {
      color: #5B55A6;
      background: rgba(247,246,255,.72);
      border-color: rgba(91,85,166,.42);
    }
    .risk-high {
      color: #8E4D3B;
      background: rgba(255,246,241,.72);
      border-color: rgba(142,77,59,.40);
    }
    .logic-governance {
      color: rgba(24,28,23,.58);
      background: rgba(255,255,255,.76);
      border-color: rgba(24,28,23,.32);
    }
    .logic-legend {
      position: absolute;
      left: 120px;
      right: 120px;
      bottom: 26px;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 26px;
      color: var(--text-2);
      font-size: 12px;
      font-weight: 650;
    }
    .logic-legend span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
    }
    .legend-line {
      display: inline-block;
      width: 28px;
      height: 0;
      border-top: 1.5px solid rgba(24,28,23,.56);
    }
    .legend-line.dashed {
      border-top-style: dashed;
    }
    .legend-swatch {
      width: 12px;
      height: 12px;
      border-radius: 3px;
      display: inline-block;
    }
    .legend-swatch.low {
      background: rgba(247,246,255,.9);
      border: 1px solid rgba(91,85,166,.30);
    }
    .legend-swatch.high {
      background: rgba(255,246,241,.9);
      border: 1px solid rgba(142,77,59,.28);
    }
    .logic-risk-axis-label {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 32px;
      z-index: 2;
      color: var(--text-2);
      font-size: 13px;
      font-weight: 650;
      text-align: center;
    }
    .sketch-figure {
      width: min(980px, 100%);
      margin: 34px 0 52px;
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: rgba(255,255,255,.48);
    }
    .sketch-label {
      margin-bottom: 8px;
      color: var(--accent);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
    .sketch-figure figcaption {
      margin: 0 0 14px;
      color: var(--text-2);
      font-size: var(--fs-ui);
      line-height: 1.6;
    }
    .sketch-canvas {
      display: block;
      width: 100%;
      height: auto;
      border: 1px solid var(--border-light);
      border-radius: var(--radius);
      background:
        radial-gradient(circle at 50% 28%, rgba(255,255,255,.82), transparent 42%),
        linear-gradient(135deg, rgba(255,255,255,.68), rgba(232,238,231,.42));
      overflow: visible;
    }
    .sketch-bg {
      fill: rgba(255,255,255,.18);
      stroke: rgba(42,96,72,.12);
      stroke-width: 1.3;
    }
    .sketch-node rect {
      stroke-width: 1.7;
      fill: rgba(255,255,255,.72);
    }
    .sketch-node.green rect { stroke: #2A6048; fill: rgba(42,96,72,.12); }
    .sketch-node.blue rect { stroke: #537791; fill: rgba(83,119,145,.14); }
    .sketch-node.brown rect { stroke: #8E735B; fill: rgba(142,115,91,.16); }
    .sketch-node.red rect { stroke: #A76F63; fill: rgba(167,111,99,.14); }
    .sketch-node.olive rect { stroke: #628458; fill: rgba(98,132,88,.14); }
    .sketch-rough {
      fill: none;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      opacity: .85;
    }
    .sketch-node.green { color: #2A6048; }
    .sketch-node.blue { color: #537791; }
    .sketch-node.brown { color: #8E735B; }
    .sketch-node.red { color: #A76F63; }
    .sketch-node.olive { color: #628458; }
    .sketch-title {
      fill: var(--text-1);
      font-family: var(--font-sans);
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0;
    }
    .sketch-title.big {
      font-size: 22px;
    }
    .sketch-text {
      fill: var(--text-2);
      font-family: var(--font-sans);
      font-size: 15px;
      line-height: 1.45;
    }
    .sketch-note,
    .sketch-band {
      fill: var(--text-2);
      font-family: var(--font-sans);
      font-size: 15px;
      font-weight: 650;
    }
    .sketch-band {
      fill: var(--accent);
      letter-spacing: .02em;
    }
    .sketch-arrow,
    .sketch-band-line,
    .sketch-axis {
      fill: none;
      stroke: currentColor;
      stroke-width: 2.4;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: .72;
    }
    .sketch-arrow.dashed,
    .sketch-band-line {
      stroke-dasharray: 8 8;
    }
    .sketch-arrow.green,
    .sketch-band-line.green { color: #2A6048; }
    .sketch-arrow.blue,
    .sketch-band-line.blue { color: #537791; }
    .sketch-arrow.brown,
    .sketch-band-line.brown { color: #8E735B; }
    .sketch-arrow.red,
    .sketch-band-line.red { color: #A76F63; }
    .sketch-grid {
      fill: none;
      stroke: rgba(42,96,72,.14);
      stroke-width: 1;
    }
    .sketch-axis {
      color: rgba(24,28,23,.58);
      stroke-width: 2;
    }
    .sketch-emphasis {
      fill: rgba(142,115,91,.05);
      stroke: rgba(142,115,91,.36);
      stroke-width: 2;
      stroke-dasharray: 10 8;
    }
    .ai-figure {
      --ai-bg: var(--bg);
      --ai-green: #2A6048;
      --ai-bluegrey: #537791;
      --ai-brown: #8E735B;
      --ai-olive: #628458;
      --ai-red: #A76F63;
      --ai-ink: var(--text-1);
      --ai-muted: var(--text-2);
      --ai-soft: var(--text-3);
      --ai-line: var(--border);
      width: min(980px, 100%);
      margin: 34px 0 52px;
      padding: 22px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background:
        radial-gradient(circle at 50% 28%, rgba(255,255,255,.78), transparent 42%),
        linear-gradient(135deg, rgba(255,255,255,.64), rgba(232,238,231,.46));
      color: var(--ai-ink);
      overflow: hidden;
    }
    .ai-figure-meta {
      margin-bottom: 8px;
      color: var(--accent);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
    .ai-figure figcaption {
      margin: 0 0 20px;
      color: var(--ai-muted);
      font-size: 14px;
      line-height: 1.55;
    }
    .ai-layer {
      padding: 18px 20px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: rgba(255,255,255,.52);
    }
    .ai-layer.compact {
      padding: 14px 16px;
    }
    .ai-layer-data {
      border-color: color-mix(in srgb, var(--ai-bluegrey) 36%, var(--border));
      background: rgba(83,119,145,.11);
    }
    .ai-layer-governance {
      border-color: color-mix(in srgb, var(--ai-red) 38%, var(--border));
      background: rgba(167,111,99,.11);
    }
    .ai-layer-kicker {
      margin-bottom: 4px;
      color: var(--ai-muted);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .ai-layer-title {
      color: var(--ai-ink);
      font-size: 18px;
      font-weight: 700;
      line-height: 1.25;
    }
    .ai-layer-body {
      margin-top: 5px;
      color: var(--ai-muted);
      font-size: 13px;
      line-height: 1.55;
    }
    .ai-stage-track {
      position: relative;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
      margin: 22px 0;
    }
    .ai-stage-track::before,
    .final-flow::before {
      content: "";
      position: absolute;
      left: 10%;
      right: 10%;
      top: 50%;
      height: 2px;
      background: linear-gradient(90deg, var(--ai-green), var(--ai-bluegrey), var(--ai-brown), var(--ai-red));
      transform: translateY(-50%);
      z-index: 0;
    }
    .ai-stage {
      position: relative;
      z-index: 1;
      min-height: 154px;
      padding: 16px;
      border: 1px solid rgba(24,28,23,.16);
      border-radius: var(--radius);
      background: rgba(255,255,255,.56);
      box-shadow: var(--shadow-sm);
    }
    .ai-stage-label {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: color-mix(in srgb, var(--stage-color, var(--accent)) 14%, white);
      color: var(--stage-color, var(--accent));
      font-size: 12px;
      font-weight: 700;
    }
    .ai-stage-title {
      margin-top: 16px;
      font-size: 17px;
      font-weight: 700;
      line-height: 1.25;
    }
    .ai-stage-body {
      margin-top: 8px;
      color: var(--ai-muted);
      font-size: 13px;
      line-height: 1.5;
    }
    .risk-low { --stage-color: var(--ai-green); }
    .risk-mid { --stage-color: var(--ai-bluegrey); }
    .risk-high { --stage-color: var(--ai-brown); }
    .risk-critical { --stage-color: var(--ai-red); }
    .ai-player-grid {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 12px;
      margin: 18px 0;
    }
    .ai-player {
      position: relative;
      padding: 16px;
      border: 1px solid rgba(24,28,23,.16);
      border-radius: var(--radius);
      background: rgba(255,255,255,.56);
      box-shadow: var(--shadow-sm);
      min-height: 150px;
    }
    .ai-player::before {
      content: "";
      display: block;
      width: 30px;
      height: 4px;
      margin-bottom: 14px;
      border-radius: 999px;
      background: var(--player-color, var(--accent));
    }
    .ai-player-name {
      font-size: 16px;
      font-weight: 700;
      line-height: 1.25;
      word-break: break-word;
    }
    .ai-player-role {
      margin-top: 5px;
      color: var(--player-color, var(--accent));
      font-size: 12px;
      font-weight: 700;
      line-height: 1.35;
    }
    .ai-player-body {
      margin-top: 9px;
      color: var(--ai-muted);
      font-size: 12px;
      line-height: 1.5;
    }
    .microsoft { --player-color: var(--ai-bluegrey); }
    .servicenow { --player-color: var(--ai-green); }
    .sap { --player-color: var(--ai-brown); }
    .salesforce { --player-color: #2A7A70; }
    .workday { --player-color: var(--ai-olive); }
    .oracle { --player-color: var(--ai-red); }
    .matrix {
      position: relative;
      padding: 38px 18px 18px 52px;
    }
    .matrix-grid {
      position: relative;
      min-height: 520px;
      border-left: 1px solid rgba(24,28,23,.32);
      border-bottom: 1px solid rgba(24,28,23,.32);
      background:
        linear-gradient(90deg, rgba(42,96,72,.10) 1px, transparent 1px),
        linear-gradient(180deg, rgba(42,96,72,.10) 1px, transparent 1px),
        rgba(255,255,255,.34);
      background-size: 25% 100%, 100% 25%, auto;
    }
    .matrix-axis {
      position: absolute;
      color: var(--ai-muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .02em;
    }
    .matrix-axis-x {
      right: 18px;
      top: 8px;
    }
    .matrix-axis-y {
      left: -42px;
      top: 250px;
      transform: rotate(-90deg);
      transform-origin: left top;
    }
    .matrix-card {
      position: absolute;
      left: var(--x);
      top: var(--y);
      width: min(178px, 28%);
      padding: 13px;
      border: 1px solid rgba(24,28,23,.16);
      border-top: 4px solid var(--player-color, var(--accent));
      border-radius: var(--radius);
      background: rgba(255,255,255,.72);
      transform: translate(-50%, -50%);
      box-shadow: var(--shadow-sm);
    }
    .matrix-card.highlight {
      border-color: color-mix(in srgb, var(--ai-brown) 45%, var(--border));
      box-shadow: var(--shadow-md);
    }
    .matrix-card strong,
    .matrix-card span,
    .matrix-card em {
      display: block;
    }
    .matrix-card strong {
      font-size: 15px;
      line-height: 1.25;
    }
    .matrix-card span {
      margin-top: 3px;
      color: var(--player-color, var(--accent));
      font-size: 12px;
      font-weight: 700;
      line-height: 1.35;
    }
    .matrix-card em {
      margin-top: 7px;
      color: var(--ai-muted);
      font-size: 12px;
      font-style: normal;
      line-height: 1.45;
    }
    .matrix-corner {
      margin-top: 12px;
      color: var(--accent);
      font-size: 13px;
      font-weight: 700;
      text-align: right;
    }
    .card-table {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: rgba(255,255,255,.50);
    }
    .card-table-head,
    .card-table-row {
      display: grid;
      grid-template-columns: .8fr 1.2fr 1.7fr 1.7fr 1.6fr;
      min-width: 820px;
    }
    .card-table-head {
      background: rgba(42,96,72,.10);
      color: var(--ai-muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .04em;
    }
    .card-table-head span,
    .card-table-row div {
      padding: 14px;
      border-right: 1px solid var(--ai-line);
    }
    .card-table-head span:last-child,
    .card-table-row div:last-child {
      border-right: 0;
    }
    .card-table-row {
      border-top: 1px solid var(--ai-line);
      color: var(--ai-muted);
      font-size: 13px;
      line-height: 1.5;
    }
    .card-table-row div:first-child,
    .card-table-row div:nth-child(2) {
      color: var(--ai-ink);
      font-weight: 700;
    }
    .final-flow {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
      margin: 22px 0 18px;
    }
    .final-flow .ai-player {
      z-index: 1;
      min-height: 180px;
    }
    .final-flow .highlight {
      border-color: color-mix(in srgb, var(--ai-brown) 42%, var(--border));
      box-shadow: 0 10px 24px rgba(15,23,42,.08);
    }
    .final-secondary {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 18px;
    }
    .final-secondary span {
      padding: 8px 10px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--tag-bg);
      color: var(--ai-muted);
      font-size: 12px;
      font-weight: 650;
    }
    .article-comparison-table {
      width: 100%;
      margin: 34px 0 42px;
      border-collapse: collapse;
      table-layout: fixed;
      font-family: var(--font-sans);
    }
    .article-comparison-table thead {
      border-bottom: 1px solid color-mix(in srgb, var(--text-1) 22%, transparent);
    }
    .article-comparison-table th {
      padding: 0 28px 16px 0;
      color: var(--text-1);
      font-size: 15px;
      font-weight: 700;
      line-height: 1.45;
      text-align: left;
      letter-spacing: 0;
    }
    .article-comparison-table td {
      padding: 18px 28px 18px 0;
      border-bottom: 1px solid color-mix(in srgb, var(--text-2) 18%, transparent);
      color: var(--text-1);
      font-size: 16px;
      line-height: 1.65;
      vertical-align: top;
    }
    .article-comparison-table tbody tr:last-child td {
      border-bottom-color: color-mix(in srgb, var(--text-1) 22%, transparent);
    }
    .article-comparison-table th:first-child,
    .article-comparison-table td:first-child {
      width: 36%;
      color: color-mix(in srgb, var(--text-1) 78%, var(--accent));
      font-weight: 650;
    }
    .article-comparison-table th:first-child {
      font-weight: 700;
    }
    .article-comparison-table th:last-child,
    .article-comparison-table td:last-child {
      padding-right: 0;
    }
    .article-comparison-table th:nth-child(1):nth-last-child(3),
    .article-comparison-table th:nth-child(1):nth-last-child(3) ~ th,
    .article-comparison-table td:nth-child(1):nth-last-child(3),
    .article-comparison-table td:nth-child(1):nth-last-child(3) ~ td {
      width: auto;
    }
    .article-comparison-table th:nth-child(1):nth-last-child(3),
    .article-comparison-table td:nth-child(1):nth-last-child(3) {
      width: 27%;
    }
    .article-comparison-table th:nth-child(2):nth-last-child(2),
    .article-comparison-table td:nth-child(2):nth-last-child(2) {
      width: 36%;
    }
    .article-comparison-table th:nth-child(3):nth-last-child(1),
    .article-comparison-table td:nth-child(3):nth-last-child(1) {
      width: 37%;
    }
    @media (max-width: 720px) {
      .conclusion-list {
        padding-left: 18px;
        gap: 22px;
      }
      .conclusion-item {
        grid-template-columns: 34px minmax(0, 1fr);
        gap: 14px;
      }
      .conclusion-code {
        font-size: 14px;
      }
      .article-section-divider {
        width: 48px;
        margin: 100px auto;
      }
      .article-comparison-table {
        margin: 28px 0 36px;
      }
      .article-code-figure {
        padding: 14px;
      }
      .article-code-figure pre {
        font-size: 12px;
      }
      .logic-canvas {
        height: auto;
        min-height: 760px;
        padding: 14px;
        display: grid;
        gap: 12px;
      }
      .logic-lines,
      .logic-axis {
        display: none;
      }
      .logic-node {
        position: relative;
        left: auto;
        top: auto;
        width: 100%;
        min-height: auto;
      }
      .ai-figure {
        padding: 16px;
      }
      .ai-stage-track,
      .ai-player-grid,
      .final-flow {
        grid-template-columns: 1fr;
      }
      .ai-stage-track::before,
      .final-flow::before {
        left: 26px;
        right: auto;
        top: 20px;
        bottom: 20px;
        width: 2px;
        height: auto;
        background: linear-gradient(180deg, var(--ai-green), var(--ai-bluegrey), var(--ai-brown), var(--ai-red));
        transform: none;
      }
      .ai-stage {
        min-height: auto;
        padding-left: 58px;
      }
      .ai-stage-label {
        position: absolute;
        left: 14px;
        top: 16px;
      }
      .ai-player {
        min-height: auto;
      }
      .matrix {
        padding: 34px 0 0 0;
      }
      .matrix-grid {
        min-height: 620px;
      }
      .matrix-axis-y {
        left: -8px;
        top: 360px;
      }
      .matrix-axis-x {
        right: 0;
      }
      .matrix-card {
        width: 70%;
      }
      .matrix-card.microsoft { --x: 48% !important; --y: 58% !important; }
      .matrix-card.servicenow { --x: 52% !important; --y: 38% !important; }
      .matrix-card.sap { --x: 58% !important; --y: 17% !important; }
      .matrix-card.salesforce { --x: 55% !important; --y: 76% !important; }
      .matrix-card.workday { --x: 50% !important; --y: 92% !important; }
      .article-comparison-table th,
      .article-comparison-table td {
        padding-right: 16px;
      }
      .article-comparison-table th {
        font-size: 14px;
        padding-bottom: 14px;
      }
      .article-comparison-table td {
        padding-top: 16px;
        padding-bottom: 16px;
        font-size: 15px;
      }
      .article-comparison-table th:first-child,
      .article-comparison-table td:first-child {
        width: 38%;
      }
      .article-comparison-table th:nth-child(1):nth-last-child(3),
      .article-comparison-table td:nth-child(1):nth-last-child(3) {
        width: 30%;
      }
      .article-comparison-table th:nth-child(2):nth-last-child(2),
      .article-comparison-table td:nth-child(2):nth-last-child(2) {
        width: 34%;
      }
      .article-comparison-table th:nth-child(3):nth-last-child(1),
      .article-comparison-table td:nth-child(3):nth-last-child(1) {
        width: 36%;
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
      <span>${escapeHtml(metadata.breadcrumb)}</span>
    </div>

    <header class="article-header">
      <div class="article-topic-label">${escapeHtml(metadata.topicLabel)}</div>
      <h1 class="article-title">${escapeHtml(metadata.title)}</h1>
      ${metadata.subtitle ? `<p class="article-subtitle">${escapeHtml(metadata.subtitle)}</p>` : ''}
      <div class="article-meta">
        <span class="article-meta-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${escapeHtml(metadata.date)}
        </span>
        <span class="article-meta-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${escapeHtml(metadata.readingTime)}
        </span>
        ${tagHtml}
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
