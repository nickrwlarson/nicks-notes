// shared.js — injects header, footer, search bar, and toast into every page

const SITE_NAME = "Nick's Notes";

function getNavHTML(activePage) {
  return `
  <header>
    <div class="header-inner">
      <a class="site-title" href="/index.html">${SITE_NAME}</a>
      <nav>
        <a href="/index.html" ${activePage==='home'?'class="active"':''}>Notes</a>
        <a href="/favorites.html" ${activePage==='favorites'?'class="active"':''}>Favorite Shelf</a>
        <a href="/about.html" ${activePage==='about'?'class="active"':''}>About</a>
        <button class="search-toggle" onclick="toggleSearch()" title="Search">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </button>
      </nav>
    </div>
  </header>
  <div class="search-bar" id="search-bar">
    <input type="text" id="search-input" placeholder="Search posts…" oninput="liveSearch(this.value)">
  </div>
  `;
}

function getFooterHTML() {
  return `
  <footer>
    <span>${SITE_NAME}</span> · Made with Claude
  </footer>
  <div class="toast" id="toast"></div>
  `;
}

function toggleSearch() {
  const bar = document.getElementById('search-bar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    document.getElementById('search-input').focus();
  }
}

// On non-index pages, search redirects to index with a query param
function liveSearch(val) {
  if (window.location.pathname.includes('index') || window.location.pathname === '/') {
    if (window._filterPosts) window._filterPosts(val);
  } else {
    if (val.length > 1) window.location.href = `/index.html?q=${encodeURIComponent(val)}`;
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function handleNewsletter(inputId) {
  const email = document.getElementById(inputId).value.trim();
  if (!email || !email.includes('@')) { showToast('Please enter a valid email.'); return; }
  showToast('Thanks for subscribing! 🎉');
  document.getElementById(inputId).value = '';
}

function newsletterBlock(inputId) {
  return `
  <div class="newsletter-block">
    <h3>New notes in your inbox</h3>
    <p>When I finish a book worth sharing, you'll be the first to know.</p>
    <div class="newsletter-form">
      <input type="email" placeholder="your@email.com" id="${inputId}">
      <button onclick="handleNewsletter('${inputId}')">Subscribe</button>
    </div>
  </div>
  `;
}
