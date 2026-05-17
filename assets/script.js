/**
 * Shared script — runs on every page
 * Handles: nav injection, footer injection, TOC generation, scroll spy
 */

// ─── Language Token ──────────────────────────────────────────
// Stored in localStorage under key 'lang' ('zh' | 'en').
// Active language is inferred from the current hash when on an article;
// falls back to the stored token (default: 'zh').

function getLangFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);
  if (parts[0] === 'topics' && parts[1]) {
    return parts[1].startsWith('en-') ? 'en' : 'zh';
  }
  return localStorage.getItem('lang') || 'zh';
}

function _showLangTooltip(btn, msg) {
  const old = document.getElementById('lang-tooltip');
  if (old) old.remove();
  const tip = document.createElement('div');
  tip.id = 'lang-tooltip';
  tip.className = 'lang-tooltip';
  tip.textContent = msg;
  document.body.appendChild(tip);
  const r = btn.getBoundingClientRect();
  tip.style.top  = (r.bottom + 8) + 'px';
  tip.style.left = (r.left + r.width / 2) + 'px';
  requestAnimationFrame(() => tip.classList.add('visible'));
  setTimeout(() => {
    tip.classList.remove('visible');
    setTimeout(() => tip.remove(), 200);
  }, 2200);
}

function setLang(lang) {
  // Toggle active class directly — avoids re-render timing issue
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Route to equivalent article (only when on a topic page)
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts[0] !== 'topics' || !parts[1]) {
    // On home: persist preference, no navigation needed
    localStorage.setItem('lang', lang);
    return;
  }

  const slug = parts[1];

  if (lang === 'en') {
    if (slug.startsWith('en-')) return; // already English
    const enSlug = 'en-' + slug;
    const exists = (RESEARCH_CONFIG.englishTopics || [])
      .find(t => t.slug === enSlug && t.status === 'published');
    if (exists) {
      localStorage.setItem('lang', 'en');
      window.location.hash = '#/topics/' + enSlug;
    } else {
      // Revert active state — no English version available
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'zh');
      });
      _showLangTooltip(
        document.querySelector('.lang-btn[data-lang="en"]'),
        '没有英文版本'
      );
    }
  } else {
    if (!slug.startsWith('en-')) return; // already Chinese
    const zhSlug = slug.slice(3);
    const exists = RESEARCH_CONFIG.topics
      .find(t => t.slug === zhSlug && t.status === 'published');
    if (exists) {
      localStorage.setItem('lang', 'zh');
      window.location.hash = '#/topics/' + zhSlug;
    } else {
      // Revert active state — no Chinese version available
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'en');
      });
      _showLangTooltip(
        document.querySelector('.lang-btn[data-lang="zh"]'),
        '没有中文版本'
      );
    }
  }
}

// ─── Nav & Footer ────────────────────────────────────────────
function renderNav() {
  const cfg = RESEARCH_CONFIG;
  const lang = getLangFromHash();
  return `
    <nav class="nav">
      <div class="nav-inner">
        <a href="#/" class="nav-logo">
          <span>${cfg.site.name}</span>
        </a>
        <div class="lang-switcher" role="group" aria-label="Language">
          <button class="lang-btn${lang === 'zh' ? ' active' : ''}" data-lang="zh" onclick="setLang('zh')" title="中文">🇨🇳</button>
          <button class="lang-btn${lang === 'en' ? ' active' : ''}" data-lang="en" onclick="setLang('en')" title="English">🇺🇸</button>
        </div>
      </div>
    </nav>`;
}

function renderFooter() {
  const cfg = RESEARCH_CONFIG;
  const r = cfg.researcher;

  const methodShort = r.methodology.split('\n\n')[0];

  return `
    <footer class="page-footer">
      <div class="footer-body">

        <div class="footer-col">
          <div class="footer-col-label">关于研究者</div>
          <div class="footer-col-title">${r.name} · ${r.title}</div>
          <div class="footer-col-body"><p>${r.bio}</p></div>
        </div>

        <div class="footer-col">
          <div class="footer-col-label">研究方法论</div>
          <div class="footer-col-body"><p>${methodShort}</p></div>
        </div>

        <div class="footer-col">
          <div class="footer-col-label">免责声明</div>
          <div class="footer-col-body"><p>${r.disclaimer}</p></div>
        </div>

      </div>
      <div class="footer-bar">
        <div class="footer-bar-left">${cfg.site.copyright} · ${cfg.site.tagline}</div>
        <div class="footer-bar-right">${cfg.site.license}</div>
      </div>
    </footer>`;
}

// ─── Hub: Core Questions ──────────────────────────────────────
function renderQuestions(questions) {
  if (!questions || !questions.length) return '';
  const items = questions.map((q, i) =>
    `<div class="hub-question-item">
       <span class="hub-question-num">Q${i + 1}</span>
       <span class="hub-question-text">${q}</span>
     </div>`
  ).join('');
  return `<div class="hub-questions-label">核心研究问题</div>${items}`;
}

// ─── Global Sidebar ───────────────────────────────────────────
function renderSidebar() {
  const cfg = RESEARCH_CONFIG;
  const s = cfg.subject;
  const total = cfg.topics.length;
  const published = cfg.topics.filter(t => t.status === 'published').length;

  // Active detection via hash
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);
  const currentSlug = (parts[0] === 'topics' && parts[1]) ? parts[1] : null;
  const isHome = !currentSlug;

  const statusDot = { published: 'dot-published', draft: 'dot-draft', coming: 'dot-coming' };

  const homeItem = `
    <li class="sidebar-item${isHome ? ' active' : ''}">
      <a href="#/" class="sidebar-link">
        <span class="sidebar-num" style="color:var(--text-3)">○</span>
        <span class="sidebar-title-text">研究概览</span>
      </a>
    </li>`;

  const items = cfg.topics.map(t => {
    const idDisplay = String(t.id).length <= 2 ? String(t.id).padStart(2, '0') : t.id;
    const isActive = currentSlug === t.slug;
    const dot = `<span class="sidebar-dot ${statusDot[t.status]}"></span>`;
    const inner = `
      <span class="sidebar-num">${idDisplay}</span>
      <span class="sidebar-title-text">${t.title}</span>
      ${dot}`;

    if (t.status === 'published') {
      return `<li class="sidebar-item published${isActive ? ' active' : ''}">
        <a href="#/topics/${t.slug}">${inner}</a>
      </li>`;
    }
    return `<li class="sidebar-item ${t.status}">
      <span class="sidebar-link-disabled">${inner}</span>
    </li>`;
  }).join('');

  const enTopics = cfg.englishTopics || [];
  const enItems = enTopics.map(t => {
    const idDisplay = String(t.id).length <= 2 ? String(t.id).padStart(2, '0') : t.id;
    const isActive = currentSlug === t.slug;
    const dot = `<span class="sidebar-dot ${statusDot[t.status]}"></span>`;
    const inner = `
      <span class="sidebar-num">${idDisplay}</span>
      <span class="sidebar-title-text">${t.title}</span>
      ${dot}`;
    if (t.status === 'published') {
      return `<li class="sidebar-item published${isActive ? ' active' : ''}">
        <a href="#/topics/${t.slug}">${inner}</a>
      </li>`;
    }
    return `<li class="sidebar-item ${t.status}">
      <span class="sidebar-link-disabled">${inner}</span>
    </li>`;
  }).join('');

  const enSection = enTopics.length ? `
      <div class="sidebar-divider"></div>
      <div class="sidebar-header" style="margin-top:8px">English Content</div>
      <ul class="sidebar-list">
        ${enItems}
      </ul>` : '';

  return `
    <div class="sidebar-inner">
      <div class="sidebar-header">Contents</div>
      <div class="sidebar-series">${s.name}</div>
      <div class="sidebar-divider"></div>
      <ul class="sidebar-list">
        ${homeItem}
        ${items}
      </ul>
      ${enSection}
      <div class="sidebar-divider"></div>
      <div class="sidebar-period">
        已发布 ${published} / ${total} 专题<br>
        研究周期 ${s.startDate} 起
      </div>
    </div>`;
}

// ─── Hub Page Renderer ────────────────────────────────────────
function renderHub() {
  const cfg = RESEARCH_CONFIG;
  const s = cfg.subject;

  const published = cfg.topics.filter(t => t.status === 'published').length;

  return `
    <section class="hub-hero">
      <div class="hub-company-id">
        <div class="hub-logo">SAP</div>
        <div>
          <h1 class="hub-hero-name">${s.name}</h1>
          <div class="hub-hero-badges">
            ${[s.ticker, s.exchange, s.sector.split(' / ')[0]]
              .map(v => `<span class="hub-hero-badge">${v}</span>`).join('')}
          </div>
        </div>
      </div>

      <p class="hub-para">${s.description}</p>
      <p class="hub-para hub-para-motivation">${s.motivation}</p>

      <div class="hub-questions">${renderQuestions(s.coreQuestions)}</div>

      <div class="hub-meta-row">
        ${[
          { label: '成立年份', value: s.founded },
          { label: '总部',     value: s.hq },
          { label: '员工规模', value: s.employees },
          { label: '市值',     value: s.marketCap },
          { label: '最近更新', value: s.lastUpdated },
        ].map(m => `
          <div class="hub-meta-item">
            <span class="hub-meta-label">${m.label}</span>
            <span class="hub-meta-value">${m.value}</span>
          </div>`).join('')}
      </div>
    </section>

    <section class="hub-topics">
      <div class="section-header">
        <span class="section-title">专题研究</span>
        <span class="section-count">${published} / ${cfg.topics.length}</span>
      </div>
      <div class="topics-grid">
        ${cfg.topics.map(t => {
          const statusLabel = { published: '已发布', draft: '草稿', coming: '即将发布' }[t.status];
          const isClickable = t.status === 'published';
          const El = isClickable ? 'a' : 'div';
          const idDisplay = String(t.id).length <= 2 ? String(t.id).padStart(2, '0') : t.id;
          return `
            <${El} ${isClickable ? `href="#/topics/${t.slug}"` : ''} class="topic-card ${t.status !== 'published' ? t.status : ''}">
              <div class="topic-card-top">
                <span class="topic-num">${idDisplay}</span>
                <span class="topic-status status-${t.status}">${statusLabel}</span>
              </div>
              <div class="topic-title">${t.title}</div>
              <div class="topic-subtitle">${t.subtitle}</div>
              <div class="topic-summary">${t.summary}</div>
              <div class="topic-footer">
                <div class="topic-tags">${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                <div class="topic-read-meta">${t.readingTime} min</div>
              </div>
            </${El}>`;
        }).join('')}
      </div>
    </section>

    ${renderFooter()}`;
}

// ─── TOC Builder (legacy, for standalone pages) ───────────────
function buildTOC() {
  const content = document.querySelector('.article-content');
  const tocList = document.querySelector('.toc-list');
  if (!content || !tocList) return;

  const headings = content.querySelectorAll('h2, h3');
  if (!headings.length) return;

  const items = [];
  headings.forEach((h, i) => {
    if (!h.id) h.id = `section-${i}`;
    const isH3 = h.tagName === 'H3';
    items.push(`
      <li class="toc-item ${isH3 ? 'h3' : ''}" data-id="${h.id}">
        <a href="#${h.id}">${h.textContent}</a>
      </li>`);
  });
  tocList.innerHTML = items.join('');

  initScrollSpy();
}

// ─── Scroll Spy (legacy) ──────────────────────────────────────
function initScrollSpy() {
  const tocItems = document.querySelectorAll('.toc-item');
  if (!tocItems.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocItems.forEach(item => item.classList.remove('active'));
        const active = document.querySelector(`.toc-item[data-id="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, {
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  });

  document.querySelectorAll('.article-content h2, .article-content h3')
    .forEach(h => observer.observe(h));
}

// ─── Floating TOC ─────────────────────────────────────────────
// scrollHandlers: array to push scroll listeners into (for SPA cleanup)
// onObserver: callback(observer) to store the IntersectionObserver (for SPA cleanup)
function buildFloatingTOC(scrollHandlers = [], onObserver = null) {
  const content = document.querySelector('.article-content');
  const tocInner = document.querySelector('.toc-inner');
  if (!content || !tocInner) return;

  const headings = content.querySelectorAll('h2, h3');
  if (!headings.length) return;

  tocInner.innerHTML = '';

  const hdr = document.createElement('div');
  hdr.className = 'toc-float-header';
  hdr.textContent = '目录';
  tocInner.appendChild(hdr);

  const floatItems = [];

  headings.forEach((h, i) => {
    if (!h.id) h.id = `section-${i}`;
    const isH3 = h.tagName === 'H3';

    const a = document.createElement('a');
    a.className = `toc-float-item${isH3 ? ' h3' : ''}`;
    a.href = `#${h.id}`;
    a.dataset.id = h.id;

    const dot = document.createElement('span');
    dot.className = 'toc-float-dot';
    const dotInner = document.createElement('span');
    dotInner.className = 'toc-float-dot-inner';
    dot.appendChild(dotInner);

    const text = document.createElement('span');
    text.className = 'toc-float-text';
    text.textContent = h.textContent;

    a.appendChild(dot);
    a.appendChild(text);
    tocInner.appendChild(a);
    floatItems.push(a);
  });

  // Scroll spy
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        floatItems.forEach(item => item.classList.remove('active'));
        const active = floatItems.find(item => item.dataset.id === entry.target.id);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

  headings.forEach(h => spy.observe(h));
  if (onObserver) onObserver(spy);

  // Scroll dimming
  const panel = document.querySelector('.toc-panel');
  if (panel) {
    let timer;
    const dimHandler = () => {
      panel.classList.add('scroll-dimmed');
      clearTimeout(timer);
      timer = setTimeout(() => panel.classList.remove('scroll-dimmed'), 600);
    };
    window.addEventListener('scroll', dimHandler, { passive: true });
    scrollHandlers.push(dimHandler);
  }
}

// ─── Nav: Sticky Article Title ────────────────────────────────
// scrollHandlers: array to push scroll listeners into (for SPA cleanup)
function initNavTitle(scrollHandlers = []) {
  const articleTitle = document.querySelector('.article-title');
  const nav = document.querySelector('.nav');
  const navInner = document.querySelector('.nav-inner');
  const articleHeader = document.querySelector('.article-header');
  if (!articleTitle || !nav || !navInner || !articleHeader) return;

  const titleEl = document.createElement('span');
  titleEl.className = 'nav-center-title';
  titleEl.textContent = articleTitle.textContent;
  navInner.appendChild(titleEl);

  function check() {
    nav.classList.toggle('title-visible', articleHeader.getBoundingClientRect().bottom < 0);
  }
  window.addEventListener('scroll', check, { passive: true });
  scrollHandlers.push(check);
  check();
}

// ─── Init (for standalone topic HTML files) ───────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Only run if not in SPA mode (no #view element)
  if (document.getElementById('view')) return;
  buildTOC();
  buildFloatingTOC();
  initNavTitle();
});
