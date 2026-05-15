/**
 * Hash-based SPA Router
 * Routes: #/ → home, #/topics/:slug → article
 */

let _scrollHandlers = [];
let _tocObserver = null;

function cleanupView() {
  // Remove scroll listeners
  _scrollHandlers.forEach(fn => window.removeEventListener('scroll', fn));
  _scrollHandlers = [];

  // Disconnect TOC IntersectionObserver
  if (_tocObserver) {
    _tocObserver.disconnect();
    _tocObserver = null;
  }

  // Remove injected nav title element and state
  document.querySelectorAll('.nav-center-title').forEach(el => el.remove());
  document.querySelector('.nav')?.classList.remove('title-visible');

  // Remove page-scoped styles
  document.querySelectorAll('style[data-page]').forEach(el => el.remove());
}

const Router = {
  init() {
    document.getElementById('nav-mount').innerHTML = renderNav();
    document.getElementById('sidebar-mount').innerHTML = renderSidebar();

    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },

  resolve() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);

    if (parts[0] === 'topics' && parts[1]) {
      // Article route
      cleanupView();
      window.scrollTo(0, 0);
      this.showArticle(parts[1]);
    } else if (parts.length === 0 || !hash) {
      cleanupView();
      window.scrollTo(0, 0);
      this.showHome();
    }
    // Any other hash (e.g. #section-2) is an in-page anchor — browser handles natively
  },

  showHome() {
    const view = document.getElementById('view');
    view.innerHTML = renderHub();
    document.getElementById('sidebar-mount').innerHTML = renderSidebar();
    document.getElementById('page-layout').classList.remove('has-article');
  },

  async showArticle(slug) {
    const view = document.getElementById('view');
    const pageLayout = document.getElementById('page-layout');

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

    // Extract article wrap
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

    document.getElementById('sidebar-mount').innerHTML = renderSidebar();
    pageLayout.classList.add('has-article');

    requestAnimationFrame(() => {
      buildFloatingTOC(_scrollHandlers, obs => { _tocObserver = obs; });
      initNavTitle(_scrollHandlers);
    });
  }
};

Router.init();
