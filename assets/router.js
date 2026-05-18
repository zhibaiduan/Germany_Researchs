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
  init() {
    document.getElementById('nav-mount').innerHTML = renderNav();
    document.getElementById('sidebar-mount').innerHTML = renderSidebar();

    // Restore sidebar open/collapsed state from localStorage
    initSidebarState();

    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },

  resolve() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);

    if (parts[0] === 'topics' && parts[1]) {
      document.getElementById('nav-mount').innerHTML = renderNav();
      cleanupView();
      window.scrollTo(0, 0);
      this.showArticle(parts[1]);
    } else if (parts.length === 0 || !hash) {
      document.getElementById('nav-mount').innerHTML = renderNav();
      cleanupView();
      window.scrollTo(0, 0);
      this.showHome();
    }
    // In-page anchors (e.g. #section-2) — browser handles natively
    // Do NOT re-render nav: it would destroy the injected .nav-center-title
  },

  showHome() {
    document.getElementById('view').innerHTML = renderHub();
    // Update sidebar active state (highlight overview item)
    document.getElementById('sidebar-mount').innerHTML = renderSidebar();
  },

  async showArticle(slug) {
    const view = document.getElementById('view');

    view.innerHTML = `<div class="view-loading">加载中…</div>`;

    let html;
    try {
      const res = await fetch(`topics/${slug}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      html = await res.text();
    } catch (e) {
      view.innerHTML = `
        <div class="view-error">
          <p>无法加载文章内容。</p>
          <p style="color:var(--text-3);font-size:13px;margin-top:8px;">
            请通过本地服务器访问（而非直接打开文件）：<br>
            <code>python3 -m http.server 8080</code><br>
            然后访问 <code>http://localhost:8080</code>
          </p>
          <a href="#/" style="margin-top:16px;display:inline-block;">← 返回首页</a>
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
      view.innerHTML = `<div class="view-error">文章结构异常，无法渲染。<br><a href="#/">← 返回首页</a></div>`;
      return;
    }

    // Fix breadcrumb links
    wrap.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (href === '../index.html' || href === './index.html' || href === 'index.html') {
        a.setAttribute('href', '#/');
      }
    });

    view.innerHTML = wrap.outerHTML + renderFooter();

    // Re-execute any inline scripts
    view.querySelectorAll('script').forEach(old => {
      const s = document.createElement('script');
      old.getAttributeNames().forEach(a => s.setAttribute(a, old.getAttribute(a)));
      s.textContent = old.textContent;
      old.replaceWith(s);
    });

    // Update sidebar active state (highlight current article)
    document.getElementById('sidebar-mount').innerHTML = renderSidebar();

    requestAnimationFrame(() => {
      buildFloatingTOC(_scrollHandlers, obs => { _tocObserver = obs; });
      initNavTitle(_scrollHandlers);
    });
  }
};

Router.init();
