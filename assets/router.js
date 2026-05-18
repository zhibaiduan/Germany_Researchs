/**
 * Hash-based SPA Router
 * Routes: #/ → home, #/topics/:slug → article
 */

let _scrollHandlers = [];
let _tocObserver = null;

function cleanupView() {
  _scrollHandlers.forEach(fn => window.removeEventListener('scroll', fn));
  _scrollHandlers = [];

  if (_tocObserver) {
    _tocObserver.disconnect();
    _tocObserver = null;
  }

  document.querySelectorAll('.nav-center-title').forEach(el => el.remove());
  document.querySelector('.nav')?.classList.remove('title-visible');
  document.querySelectorAll('style[data-page]').forEach(el => el.remove());
}

const Router = {
  async init() {
    if (typeof loadSiteContext === 'function') {
      await loadSiteContext();
    }

    const lang = getActiveLang();
    document.getElementById('nav-mount').innerHTML = renderNav();
    document.getElementById('sidebar-mount').innerHTML = renderSidebar(lang);

    initSidebarState();

    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },

  resolve() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);
    const lang = getActiveLang();

    if (parts[0] === 'topics' && parts[1]) {
      document.getElementById('nav-mount').innerHTML = renderNav();
      cleanupView();
      window.scrollTo(0, 0);
      this.showArticle(parts[1], lang);
    } else if (parts.length === 0 || !hash) {
      document.getElementById('nav-mount').innerHTML = renderNav();
      cleanupView();
      window.scrollTo(0, 0);
      this.showHome(lang);
    }
    // In-page anchors — browser handles natively
  },

  showHome(lang) {
    lang = lang || getActiveLang();
    document.getElementById('view').innerHTML = renderHub(lang);
    document.getElementById('sidebar-mount').innerHTML = renderSidebar(lang);
  },

  async showArticle(slug, lang) {
    lang = lang || getActiveLang();
    const ui = UI[lang] || UI.zh;
    const view = document.getElementById('view');

    view.innerHTML = `<div class="view-loading">${ui.loading}</div>`;

    let html;
    try {
      const res = await fetch(`topics/${slug}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      html = await res.text();
    } catch (e) {
      view.innerHTML = `
        <div class="view-error">
          <p>${ui.loadError}</p>
          <p style="color:var(--text-3);font-size:13px;margin-top:8px;">
            ${ui.loadErrorHint}<br>
            <code>python3 -m http.server 8080</code><br>
            then open <code>http://localhost:8080</code>
          </p>
          <a href="#/" style="margin-top:16px;display:inline-block;">${ui.backHome}</a>
        </div>`;
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Inject page-specific <style> blocks
    doc.querySelectorAll('style').forEach(styleEl => {
      const clone = document.createElement('style');
      clone.setAttribute('data-page', slug);
      clone.textContent = styleEl.textContent;
      document.head.appendChild(clone);
    });

    const wrap = doc.querySelector('.article-wrap');
    if (!wrap) {
      view.innerHTML = `<div class="view-error">${ui.structureError}<br><a href="#/">${ui.backHome}</a></div>`;
      return;
    }

    // Fix breadcrumb links; open external links in new tab
    wrap.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (href === '../index.html' || href === './index.html' || href === 'index.html') {
        a.setAttribute('href', '#/');
      } else if (href && href.startsWith('http')) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });

    view.innerHTML = wrap.outerHTML;

    // Re-execute any inline scripts
    view.querySelectorAll('script').forEach(old => {
      const s = document.createElement('script');
      old.getAttributeNames().forEach(a => s.setAttribute(a, old.getAttribute(a)));
      s.textContent = old.textContent;
      old.replaceWith(s);
    });

    // Update sidebar active state (highlight current article)
    document.getElementById('sidebar-mount').innerHTML = renderSidebar(lang);

    requestAnimationFrame(() => {
      buildFloatingTOC(_scrollHandlers, obs => { _tocObserver = obs; });
      initNavTitle(_scrollHandlers);
    });
  }
};

Router.init().catch(err => {
  console.error(err);
  const view = document.getElementById('view');
  if (view) {
    view.innerHTML = '<div class="view-error">Unable to load site configuration.</div>';
  }
});
