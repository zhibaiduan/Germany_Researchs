/**
 * Shared script — runs on every page
 * Handles: nav injection, footer injection, TOC generation, scroll spy
 */

// ─── Language ─────────────────────────────────────────────────
// 'lang' stored in localStorage: 'zh' | 'en'. Default 'en'.

function getActiveLang() {
  return localStorage.getItem('lang') || 'en';
}

// Localise helper — picks obj[lang], falls back to obj['zh']
function loc(obj, lang) {
  return (obj && obj[lang]) ? obj[lang] : (obj && obj['zh']) ? obj['zh'] : obj;
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
  localStorage.setItem('lang', lang);

  // Update switcher state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Detect current route
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts[0] !== 'topics' || !parts[1]) {
    // On hub page — re-render hub + sidebar
    const view = document.getElementById('view');
    const sidebarMount = document.getElementById('sidebar-mount');
    if (view) view.innerHTML = renderHub(lang);
    if (sidebarMount) sidebarMount.innerHTML = renderSidebar(lang);
    return;
  }

  // On article page — navigate to language equivalent
  const currentSlug = parts[1];
  const isCurrentlyEn = currentSlug.startsWith('en-');
  const topic = RESEARCH_CONFIG.topics.find(t =>
    t.slug === currentSlug || t.enSlug === currentSlug
  );

  if (lang === 'en') {
    if (isCurrentlyEn) return;
    if (topic && topic.enSlug && (topic.availableLangs || []).includes('en')) {
      window.location.hash = '#/topics/' + topic.enSlug;
    } else {
      // No English version — revert button
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'zh');
      });
      localStorage.setItem('lang', 'zh');
      _showLangTooltip(
        document.querySelector('.lang-btn[data-lang="en"]'),
        'No English version available'
      );
    }
  } else {
    if (!isCurrentlyEn) return;
    const zhSlug = topic ? topic.slug : currentSlug.replace(/^en-/, '');
    window.location.hash = '#/topics/' + zhSlug;
  }
}

// UI strings
const UI = {
  zh: {
    overview: "研究概览",
    researchTopics: "专题研究",
    coreQuestions: "核心研究问题",
    status: { published: "已发布", draft: "草稿", "in-review": "审核中", archived: "已归档", coming: "即将发布" },
    tocLabel: "目录",
    loading: "加载中…",
    loadError: "无法加载文章内容。",
    loadErrorHint: "请通过本地服务器访问：",
    backHome: "← 返回首页",
    structureError: "文章结构异常，无法渲染。"
  },
  en: {
    overview: "Overview",
    researchTopics: "Research Topics",
    coreQuestions: "Core Research Questions",
    status: { published: "Published", draft: "Draft", "in-review": "In Review", archived: "Archived", coming: "Coming Soon" },
    tocLabel: "Contents",
    loading: "Loading…",
    loadError: "Unable to load article.",
    loadErrorHint: "Serve via local server:",
    backHome: "← Back to home",
    structureError: "Article structure error."
  }
};

// ─── Sidebar Toggle ───────────────────────────────────────────
function toggleSidebar() {
  const shell = document.getElementById('app-shell');
  const sidebar = document.getElementById('left-sidebar');
  if (!shell || !sidebar) return;
  const collapsed = shell.classList.toggle('sidebar-collapsed');
  sidebar.classList.toggle('collapsed', collapsed);
  localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0');
}

function initSidebarState() {
  const isMobile = window.innerWidth <= 768;
  const stored = localStorage.getItem('sidebar-collapsed');
  // Collapse by default on mobile; respect stored preference on desktop
  const collapsed = isMobile ? true : (stored === '1');
  if (collapsed) {
    document.getElementById('app-shell')?.classList.add('sidebar-collapsed');
    document.getElementById('left-sidebar')?.classList.add('collapsed');
  }
}

// ─── Nav & Footer ────────────────────────────────────────────
function renderNav() {
  const lang = getActiveLang();
  const siteName = RESEARCH_CONFIG?.site?.name || 'Research';
  return `
    <nav class="nav">
      <div class="nav-inner">
        <div class="nav-left-group">
          <button class="nav-sidebar-toggle" onclick="toggleSidebar()" title="Toggle sidebar" aria-label="Toggle sidebar">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="2.5" width="13" height="1.3" rx=".65" fill="currentColor"/>
              <rect x="1" y="6.85" width="9" height="1.3" rx=".65" fill="currentColor"/>
              <rect x="1" y="11.2" width="13" height="1.3" rx=".65" fill="currentColor"/>
            </svg>
          </button>
          <a href="#/" class="nav-collapsed-brand">${siteName}</a>
        </div>
        <div class="lang-switcher" role="group" aria-label="Language">
          <button class="lang-btn${lang === 'zh' ? ' active' : ''}" data-lang="zh" onclick="setLang('zh')" title="中文">🇨🇳</button>
          <button class="lang-btn${lang === 'en' ? ' active' : ''}" data-lang="en" onclick="setLang('en')" title="English">🇺🇸</button>
        </div>
      </div>
    </nav>`;
}

// ─── About Card (hub page) ────────────────────────────────────
function renderAboutCard(lang) {
  lang = lang || getActiveLang();
  const r = RESEARCH_CONFIG.researcher;
  const rl = loc(r, lang);
  const focusItems = (rl.focusItems || [])
    .map(item => `<li class="about-card-list-item">${item}</li>`)
    .join('');
  return `
    <section class="hub-about">
      <div class="about-card">
        <div class="about-card-left">
          <div class="about-card-label">${rl.aboutTitle}</div>
          <p class="about-card-para">${rl.intro}</p>
          <p class="about-card-focus-label">${rl.focusLabel}</p>
          <ul class="about-card-list">${focusItems}</ul>
        </div>
        <div class="about-card-sep"></div>
        <div class="about-card-right">
          <p class="about-card-core-label">${rl.coreLabel}</p>
          <p class="about-card-core-text">${rl.coreInsight}</p>
          <p class="about-card-para">${rl.aiNote}</p>
          <p class="about-card-disclaimer">${rl.disclaimer}</p>
        </div>
      </div>
    </section>`;
}

// ─── Footer (slim — copyright bar only) ──────────────────────
function renderFooter(lang) {
  lang = lang || getActiveLang();
  const site = RESEARCH_CONFIG.site;
  const sl = loc(site, lang);
  return `
    <footer class="page-footer">
      <div class="footer-bar">
        <div class="footer-bar-left">${sl.copyright} · ${sl.tagline}</div>
        <div class="footer-bar-right">${sl.license}</div>
      </div>
    </footer>`;
}

// ─── Left Sidebar Navigation ──────────────────────────────────
function renderSidebar(lang) {
  lang = lang || getActiveLang();
  const cfg = RESEARCH_CONFIG;
  const s = cfg.subject;

  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);
  const currentSlug = (parts[0] === 'topics' && parts[1]) ? parts[1] : null;
  const isHome = !currentSlug;

  const ui = UI[lang] || UI.zh;
  const homeItem = `
    <li class="sidebar-item${isHome ? ' active' : ''}">
      <a href="#/" class="sidebar-link">
        <span class="sidebar-item-title" style="padding-left:2px">${ui.overview}</span>
      </a>
    </li>`;

  const items = cfg.topics.map(t => {
    const tl = loc(t, lang);
    const sidebarLabel = t.sidebarTitle ? loc(t.sidebarTitle, lang) : tl.title;
    const slug = (lang === 'en' && t.enSlug && (t.availableLangs || []).includes('en')) ? t.enSlug : t.slug;
    const isActive = currentSlug === t.slug || currentSlug === t.enSlug;
    const inner = `
      <span class="sidebar-item-title">${sidebarLabel}</span>`;

    if (t.status === 'published') {
      return `<li class="sidebar-item published${isActive ? ' active' : ''}">
        <a href="#/topics/${slug}" class="sidebar-link">${inner}</a>
      </li>`;
    }
    return `<li class="sidebar-item ${t.status}">
      <span class="sidebar-link-disabled">${inner}</span>
    </li>`;
  }).join('');

  return `
    <div class="sidebar-nav-inner">
      <div class="sidebar-section-label">${s.name}</div>
      <ul class="sidebar-list">
        ${homeItem}
        ${items}
      </ul>
    </div>`;
}

// ─── Hub Page Renderer ────────────────────────────────────────
function renderHub(lang) {
  lang = lang || getActiveLang();
  const cfg = RESEARCH_CONFIG;
  const s = cfg.subject;
  const sl = loc(s, lang);          // localised subject content
  const ui = UI[lang] || UI.zh;

  const published = cfg.topics.filter(t => t.status === 'published').length;

  const questions = (sl.coreQuestions || []).map((q, i) =>
    `<div class="hub-question-item">
       <span class="hub-question-num">Q${i + 1}</span>
       <span class="hub-question-text">${q}</span>
     </div>`
  ).join('');

  const metaLabels = sl.metaLabels || {};

  const motivationParas = (sl.motivation || '').split('\n\n')
    .map(p => `<p class="hub-para hub-para-motivation">${p}</p>`).join('');

  return `
    <section class="hub-hero">
      <div class="hub-company-id">
        <div class="hub-logo">${s.logoText || s.shortName || s.name}</div>
        <div>
          <h1 class="hub-hero-name">${s.name}</h1>
          <div class="hub-hero-badges">
            ${[s.ticker, s.exchange, sl.sector]
              .filter(Boolean)
              .map(v => `<span class="hub-hero-badge">${v}</span>`).join('')}
          </div>
        </div>
      </div>

      <p class="hub-para">${sl.description}</p>
      ${motivationParas}

      <div class="hub-questions">
        <div class="hub-questions-label">${ui.coreQuestions}</div>
        ${questions}
      </div>

      <div class="hub-meta-row">
        ${[
          { label: metaLabels.founded,   value: s.founded },
          { label: metaLabels.hq,        value: s.hq },
          { label: metaLabels.employees, value: s.employees },
          { label: metaLabels.marketCap, value: sl.marketCap },
          { label: metaLabels.lastUpdated, value: s.lastUpdated },
        ].map(m => `
          <div class="hub-meta-item">
            <span class="hub-meta-label">${m.label || ''}</span>
            <span class="hub-meta-value">${m.value || ''}</span>
          </div>`).join('')}
      </div>
    </section>

    <section class="hub-topics">
      <div class="section-header">
        <span class="section-title">${ui.researchTopics}</span>
        <span class="section-count">${published} / ${cfg.topics.length}</span>
      </div>
      <div class="topics-grid">
        ${cfg.topics.map(t => {
          const tl = loc(t, lang);
          const slug = (lang === 'en' && t.enSlug && (t.availableLangs || []).includes('en')) ? t.enSlug : t.slug;
          const statusLabel = ui.status[t.status] || t.status;
          const isClickable = t.status === 'published';
          const El = isClickable ? 'a' : 'div';
          const readingTime = t.readingTimeByLang?.[lang] || t.readingTime?.[lang] || t.readingTime || '';
          return `
            <${El} ${isClickable ? `href="#/topics/${slug}"` : ''} class="topic-card ${t.status !== 'published' ? t.status : ''}">
              <div class="topic-card-top">
                <span class="topic-num">${t.id}</span>
                <span class="topic-status status-${t.status}">${statusLabel}</span>
              </div>
              <div class="topic-title">${tl.title}</div>
              <div class="topic-subtitle">${tl.subtitle}</div>
              <div class="topic-summary">${tl.summary}</div>
              <div class="topic-footer">
                <div class="topic-tags">${(tl.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                <div class="topic-read-meta">${readingTime ? `${readingTime} min` : ''}</div>
              </div>
            </${El}>`;
        }).join('')}
      </div>
    </section>

    ${renderAboutCard(lang)}
    ${renderFooter(lang)}`;
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
  const ui = UI[getActiveLang()] || UI.zh;
  hdr.textContent = ui.tocLabel;
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
    // Show nav title once the article h1 itself scrolls above the nav bar
    nav.classList.toggle('title-visible', articleTitle.getBoundingClientRect().bottom < 0);
  }
  window.addEventListener('scroll', check, { passive: true });
  scrollHandlers.push(check);
  check();
}

// ─── Init (for standalone topic HTML files) ───────────────────
document.addEventListener('DOMContentLoaded', async () => {
  if (typeof loadSiteContext === 'function' && !window.RESEARCH_CONFIG) {
    try {
      await loadSiteContext();
    } catch (err) {
      console.error(err);
      return;
    }
  }

  // Only run if not in SPA mode (no #view element)
  if (document.getElementById('view')) return;
  buildTOC();
  buildFloatingTOC();
  initNavTitle();
  initLightbox();
});

// ─── Lightbox ─────────────────────────────────────────────
function initLightbox() {
  // Create overlay once
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<button class="lightbox-close" aria-label="Close">✕</button><img />';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  // Bind all .article-figure img
  document.querySelectorAll('.article-figure img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  // Close on overlay click or button
  lb.addEventListener('click', e => { if (e.target !== lbImg) close(); });
  lb.querySelector('.lightbox-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
