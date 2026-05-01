/* ============================================================
   iotas.net — main.js
   ============================================================ */

// ── CART STATE ────────────────────────────────────────────────
// Cart is stored in localStorage so it persists across pages.
const Cart = {
  _key: 'iotas_cart',

  get() {
    try { return JSON.parse(localStorage.getItem(this._key)) || []; }
    catch { return []; }
  },

  save(items) {
    localStorage.setItem(this._key, JSON.stringify(items));
    this._updateNav();
  },

  add(productId) {
    const items = this.get();
    if (!items.includes(productId)) {
      items.push(productId);
      this.save(items);
      toast('Added to cart', 'success');
    } else {
      toast('Already in your cart', 'info');
    }
    this._updateNav();
  },

  remove(productId) {
    const items = this.get().filter(id => id !== productId);
    this.save(items);
    this._updateNav();
  },

  count() { return this.get().length; },

  _updateNav() {
    const count = this.count();
    const badge = document.querySelector('.nav__cart-count');
    if (!badge) return;
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  },
};

// ── ROUTER ────────────────────────────────────────────────────
// Single-page app routing using the URL hash.
// #/             → Home
// #/collections  → All products, with type filters
// #/product/ID   → Product detail
// #/cart         → Cart

const Router = {
  init() {
    window.addEventListener('hashchange', () => this.route());
    this.route();
  },

  route() {
    const hash = location.hash || '#/';
    const main = document.getElementById('main');
    main.innerHTML = '';

    if (hash === '#/' || hash === '') {
      renderHome(main);
    } else if (hash === '#/collections') {
      renderCollections(main, 'All');
    } else if (hash.startsWith('#/type/')) {
      const type = decodeURIComponent(hash.replace('#/type/', ''));
      renderCollections(main, type);
    } else if (hash.startsWith('#/product/')) {
      const id = hash.replace('#/product/', '');
      renderProductDetail(main, id);
    } else if (hash === '#/cart') {
      renderCart(main);
    } else {
      main.innerHTML = '<div class="container section" style="text-align:center"><h2>Page not found</h2><p><a href="#/">Return home</a></p></div>';
    }

    // Update active nav link
    document.querySelectorAll('.nav__links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === hash);
    });

    window.scrollTo({ top: 0, behavior: 'instant' });
    Cart._updateNav();
  },
};

// ── UTILITIES ─────────────────────────────────────────────────
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
}

function toast(msg, type = 'info') {
  const container = document.querySelector('.toast-container');
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function getProductById(id) {
  return products.find(p => p.id === id);
}

// Render a placeholder or real image
function renderImg(src, alt, cls = '') {
  if (src && src !== 'images/placeholder.jpg') {
    return `<img src="${src}" alt="${alt}" class="${cls}" loading="lazy" onerror="this.parentElement.innerHTML=placeholderHTML('${alt}')">`;
  }
  return placeholderHTML(alt);
}

function placeholderHTML(alt) {
  return `<div class="img-placeholder"><span class="img-placeholder__icon">🖼</span><span class="img-placeholder__text">${alt}</span></div>`;
}

function badgeHTML(badge) {
  if (!badge) return '';
  const cfg = badgeConfig[badge] || {};
  return `<span class="product-card__badge" style="background:${cfg.bg};color:${cfg.color}">${badge}</span>`;
}

function detailBadgeHTML(badge) {
  if (!badge) return '';
  const cfg = badgeConfig[badge] || {};
  return `<span class="detail-badge" style="background:${cfg.bg};color:${cfg.color}">${badge}</span>`;
}

// ── SHARED COMPONENTS ─────────────────────────────────────────
function productCardHTML(p) {
  const price = p.inquire
    ? `<span class="product-card__price inquire">Price on request</span>`
    : `<span class="product-card__price">${formatPrice(p.price)}</span>`;

  return `
    <a class="product-card" href="#/product/${p.id}">
      <div class="product-card__img">
        ${renderImg(p.image, p.name)}
        ${badgeHTML(p.badge)}
      </div>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span class="product-card__type">${p.type}</span>
          <span class="product-card__year">${p.year}</span>
        </div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__desc">${p.description}</div>
        <div class="product-card__footer">
          ${price}
          <span class="btn btn-outline" style="padding:0.35em 0.9em;font-size:0.75rem;">View →</span>
        </div>
      </div>
    </a>`;
}

function navHTML() {
  return `
    <nav class="nav">
      <div class="container nav__inner">
        <a href="#/" class="nav__logo">iotas<span>.</span>net</a>
        <div class="nav__links">
          <a href="#/">Home</a>
          <a href="#/collections">Collections</a>
          <a href="#/cart">Cart</a>
        </div>
        <div class="nav__actions">
          <button class="nav__cart-btn" onclick="location.hash='#/cart'">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Cart
            <span class="nav__cart-count"></span>
          </button>
          <button class="nav__menu-btn" id="menuBtn" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="nav__drawer" id="navDrawer">
      <a href="#/" onclick="closeDrawer()">Home</a>
      <a href="#/collections" onclick="closeDrawer()">Collections</a>
      <a href="#/cart" onclick="closeDrawer()">Cart</a>
    </div>`;
}

function footerHTML() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">iotas<span>.</span>net</div>
            <p class="footer__tagline">Authenticated vintage Disney collectibles. Curated for the serious collector.</p>
          </div>
          <div class="footer__col">
            <h5>Shop</h5>
            <a href="#/type/Production Cels">Production Cels</a>
            <a href="#/type/Film Posters">Film Posters</a>
            <a href="#/type/Vintage Toys">Vintage Toys</a>
            <a href="#/type/Park Memorabilia">Park Memorabilia</a>
            <a href="#/type/Original Art">Original Art</a>
          </div>
          <div class="footer__col">
            <h5>Info</h5>
            <a href="#">Authentication</a>
            <a href="#">Shipping & Insurance</a>
            <a href="#">Returns</a>
            <a href="#">FAQ</a>
          </div>
          <div class="footer__col">
            <h5>Account</h5>
            <a href="#">Collector's Circle</a>
            <a href="#">Sign In</a>
            <a href="#">Wishlist</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 iotas.net — All rights reserved.</span>
          <span>Authenticated originals only. All items guaranteed genuine.</span>
        </div>
      </div>
    </footer>`;
}

// ── HOME PAGE ─────────────────────────────────────────────────
function renderHome(container) {
  const featured = products.filter(p => p.featured).slice(0, 3);
  const typeCounts = {};
  productTypes.forEach(t => { typeCounts[t] = products.filter(p => p.type === t).length; });

  const typeIcons = {
    "Production Cels": "🎨",
    "Film Posters":    "🎬",
    "Vintage Toys":    "🪆",
    "Park Memorabilia":"🎡",
    "Original Art":    "✏️",
  };

  container.innerHTML = `
    <div class="page">
      ${navHTML()}

      <!-- HERO -->
      <section class="hero">
        <div class="hero__content">
          <div class="hero__eyebrow">Authenticated Originals</div>
          <h1>Where Disney <em>History</em> Lives On</h1>
          <p class="hero__desc">Production cels, vintage toys, original posters, and park memorabilia — sourced, authenticated, and offered to collectors who know the difference.</p>
          <div class="hero__ctas">
            <a href="#/collections" class="btn btn-primary btn-lg">Browse Collections</a>
            <a href="#" class="btn btn-secondary btn-lg">Collector's Circle</a>
          </div>
        </div>
        <div class="hero__image">
          <div class="hero__image-overlay"></div>
          <div class="hero__featured-card">
            <div class="label">Just In</div>
            <h4>Haunted Mansion E-Ticket</h4>
            <p>1969 — First Season · Near Mint</p>
            <span class="price">$380</span>
          </div>
        </div>
      </section>

      <!-- TRUST BAR -->
      <div class="trust-bar">
        <div class="container trust-bar__inner">
          <div class="trust-bar__item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Authenticated Originals
          </div>
          <div class="trust-bar__item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            COA On Every Item
          </div>
          <div class="trust-bar__item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Insured Shipping
          </div>
          <div class="trust-bar__item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Ojai, California
          </div>
        </div>
      </div>

      <!-- SHOP BY TYPE -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <div class="section-header__text">
              <p class="label">Browse</p>
              <h2>Shop by Category</h2>
            </div>
            <a href="#/collections" class="btn btn-outline">View All →</a>
          </div>
          <div class="type-grid">
            ${productTypes.map(t => `
              <a href="#/type/${encodeURIComponent(t)}" class="type-card">
                <span class="type-card__icon">${typeIcons[t] || '✦'}</span>
                <div class="type-card__name">${t}</div>
                <div class="type-card__count">${typeCounts[t]} item${typeCounts[t] !== 1 ? 's' : ''}</div>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <!-- FEATURED ITEMS -->
      <section class="section" style="background:var(--surface);border-top:1px solid var(--surface-2);border-bottom:1px solid var(--surface-2);">
        <div class="container">
          <div class="section-header" style="margin-bottom:2.5rem">
            <div class="section-header__text">
              <p class="label">Handpicked</p>
              <h2>Featured Pieces</h2>
            </div>
            <a href="#/collections" class="btn btn-outline">See All →</a>
          </div>
          <div class="featured-grid">
            ${featured.map(productCardHTML).join('')}
          </div>
        </div>
      </section>

      <!-- COLLECTOR'S CIRCLE -->
      <section class="collectors section">
        <div class="container">
          <div class="collectors__header">
            <span class="collectors__eyebrow">Membership</span>
            <h2>The Collector's Circle</h2>
            <p class="collectors__desc">Reserved for those who take their collections seriously. Early access, private acquisitions, and a community that shares your eye.</p>
          </div>
          <div class="perks-grid">
            <div class="perk-card">
              <div class="perk-card__num">01</div>
              <h4>First Access</h4>
              <p>New acquisitions are offered to Circle members 48 hours before public listing.</p>
            </div>
            <div class="perk-card">
              <div class="perk-card__num">02</div>
              <h4>Private Sourcing</h4>
              <p>Tell us what you're looking for. We source actively and alert you when something matches.</p>
            </div>
            <div class="perk-card">
              <div class="perk-card__num">03</div>
              <h4>Authentication Reports</h4>
              <p>Full provenance documentation and authentication letters for every purchase.</p>
            </div>
            <div class="perk-card">
              <div class="perk-card__num">04</div>
              <h4>Collector's Network</h4>
              <p>Connect with other serious collectors. Private trading, appraisals, and seasonal events.</p>
            </div>
          </div>
          <div class="collectors__cta">
            <a href="#" class="btn btn-primary btn-lg">Request an Invitation</a>
          </div>
        </div>
      </section>

      ${footerHTML()}
      <div class="toast-container"></div>
    </div>`;

  initMenuToggle();
}

// ── COLLECTIONS PAGE ──────────────────────────────────────────
function renderCollections(container, activeType = 'All') {
  let filtered = activeType === 'All' ? products : products.filter(p => p.type === activeType);

  container.innerHTML = `
    <div class="page">
      ${navHTML()}

      <div class="collections-header">
        <div class="container">
          <h1>${activeType === 'All' ? 'All Collections' : activeType}</h1>
          <p>${filtered.length} item${filtered.length !== 1 ? 's' : ''} available</p>
        </div>
      </div>

      <div class="collections-toolbar">
        <div class="container collections-toolbar__inner">
          <button class="filter-btn ${activeType === 'All' ? 'active' : ''}" onclick="location.hash='#/collections'">All</button>
          ${productTypes.map(t => `
            <button class="filter-btn ${activeType === t ? 'active' : ''}"
              onclick="location.hash='#/type/${encodeURIComponent(t)}'">${t}</button>`).join('')}
          <select class="collections-toolbar__sort" id="sortSelect" onchange="handleSort(this.value)">
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
            <option value="year">Year (Oldest First)</option>
          </select>
        </div>
      </div>

      <section class="section">
        <div class="container">
          <div class="collections-grid" id="collectionsGrid">
            ${filtered.length ? filtered.map(productCardHTML).join('') : '<div class="collections-empty">Nothing found in this category yet.</div>'}
          </div>
        </div>
      </section>

      ${footerHTML()}
      <div class="toast-container"></div>
    </div>`;

  initMenuToggle();

  // Store current filtered list for sorting
  window._currentFiltered = filtered;
}

function handleSort(value) {
  let items = [...window._currentFiltered];
  if (value === 'price-asc') {
    items.sort((a, b) => (a.price || 999999) - (b.price || 999999));
  } else if (value === 'price-desc') {
    items.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (value === 'name') {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === 'year') {
    items.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  }
  const grid = document.getElementById('collectionsGrid');
  if (grid) grid.innerHTML = items.map(productCardHTML).join('');
}

// ── PRODUCT DETAIL PAGE ───────────────────────────────────────
function renderProductDetail(container, id) {
  const p = getProductById(id);
  if (!p) {
    container.innerHTML = `<div class="container section"><h2>Product not found.</h2><a href="#/collections">← Back to Collections</a></div>`;
    return;
  }

  const inCart = Cart.get().includes(p.id);

  const priceBlock = p.inquire
    ? `<div class="detail-price inquire">Price available on request</div>`
    : `<div class="detail-price">${formatPrice(p.price)}</div>`;

  const actionBtn = p.inquire
    ? `<a href="mailto:hello@iotas.net?subject=Inquiry: ${encodeURIComponent(p.name)}" class="btn btn-forest btn-full btn-lg">✉ Inquire About This Piece</a>`
    : inCart
    ? `<button class="btn btn-outline btn-full btn-lg" onclick="location.hash='#/cart'">View in Cart →</button>`
    : `<button class="btn btn-primary btn-full btn-lg" onclick="addToCart('${p.id}')">Add to Cart</button>`;

  container.innerHTML = `
    <div class="page">
      ${navHTML()}

      <div class="container detail-page">
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="breadcrumb__sep">›</span>
          <a href="#/type/${encodeURIComponent(p.type)}">${p.type}</a>
          <span class="breadcrumb__sep">›</span>
          <span>${p.name}</span>
        </div>

        <div class="detail-grid">
          <!-- IMAGE -->
          <div class="detail-img">
            <div class="detail-img__main">
              ${renderImg(p.image, p.name)}
            </div>
            <p style="font-size:0.72rem;color:var(--ink-soft);text-align:center">
              🔒 All items ship fully insured. Returns accepted within 14 days.
            </p>
          </div>

          <!-- INFO -->
          <div class="detail-info">
            <div class="detail-meta">
              <span class="detail-type">${p.type}</span>
              <span class="detail-year">${p.year}</span>
              ${detailBadgeHTML(p.badge)}
            </div>

            <h1 class="detail-name">${p.name}</h1>

            <div class="detail-price-row">
              ${priceBlock}
              ${p.condition ? `<span style="font-size:0.8rem;color:var(--ink-soft)">Condition: <strong style="color:var(--ink)">${p.condition}</strong></span>` : ''}
            </div>

            <p class="detail-desc">${p.description}</p>

            <div class="detail-specs">
              ${p.era ? `<div class="detail-specs__row"><span class="detail-specs__label">Era</span><span class="detail-specs__value">${p.era}</span></div>` : ''}
              ${p.year ? `<div class="detail-specs__row"><span class="detail-specs__label">Year</span><span class="detail-specs__value">${p.year}</span></div>` : ''}
              ${p.condition ? `<div class="detail-specs__row"><span class="detail-specs__label">Condition</span><span class="detail-specs__value">${p.condition}</span></div>` : ''}
              ${p.dimensions ? `<div class="detail-specs__row"><span class="detail-specs__label">Dimensions</span><span class="detail-specs__value">${p.dimensions}</span></div>` : ''}
            </div>

            ${p.provenance ? `
              <div class="detail-provenance">
                <strong>Provenance & Authentication</strong>
                ${p.provenance}
              </div>` : ''}

            <div class="detail-actions">
              ${actionBtn}
              <a href="#/collections" class="btn btn-outline btn-full">← Back to Collections</a>
            </div>
            <p class="detail-note">Questions? <a href="mailto:hello@iotas.net" style="color:var(--rust)">hello@iotas.net</a></p>
          </div>
        </div>

        <!-- Related items -->
        <div class="section">
          <div class="section-header" style="margin-bottom:2rem">
            <div class="section-header__text">
              <p class="label">More Like This</p>
              <h2>Same Category</h2>
            </div>
          </div>
          <div class="collections-grid">
            ${products.filter(q => q.type === p.type && q.id !== p.id).slice(0, 3).map(productCardHTML).join('')}
          </div>
        </div>
      </div>

      ${footerHTML()}
      <div class="toast-container"></div>
    </div>`;

  initMenuToggle();
}

function addToCart(id) {
  Cart.add(id);
  // Re-render the button without full page reload
  const btn = document.querySelector('.detail-actions .btn-primary');
  if (btn) {
    btn.textContent = 'Added ✓';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.onclick = () => { location.hash = '#/cart'; };
      btn.textContent = 'View in Cart →';
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.className = 'btn btn-outline btn-full btn-lg';
    }, 1200);
  }
}

// ── CART PAGE ─────────────────────────────────────────────────
function renderCart(container) {
  const cartIds = Cart.get();
  const cartItems = cartIds.map(id => getProductById(id)).filter(Boolean);
  const purchaseItems = cartItems.filter(p => !p.inquire);
  const inquireItems  = cartItems.filter(p => p.inquire);
  const subtotal = purchaseItems.reduce((sum, p) => sum + (p.price || 0), 0);

  const itemsHTML = cartItems.length === 0
    ? `<div class="cart-empty">
        <p>Your cart is empty.</p>
        <a href="#/collections" class="btn btn-primary">Browse Collections</a>
      </div>`
    : `<div class="cart-items">
        ${purchaseItems.map(p => cartItemHTML(p)).join('')}
      </div>
      ${inquireItems.length > 0 ? `
        <div class="cart-inquiry-items">
          <h3>Inquiry Items</h3>
          <div class="cart-items">
            ${inquireItems.map(p => cartItemHTML(p, true)).join('')}
          </div>
        </div>` : ''}`;

  const summaryHTML = cartItems.length === 0 ? '' : `
    <div class="cart-summary">
      <h3>Order Summary</h3>
      ${purchaseItems.map(p => `
        <div class="cart-summary__row">
          <span>${p.name.length > 28 ? p.name.slice(0,28)+'…' : p.name}</span>
          <span>${formatPrice(p.price)}</span>
        </div>`).join('')}
      ${inquireItems.length > 0 ? `
        <div class="cart-summary__row" style="font-style:italic">
          <span>${inquireItems.length} inquiry item${inquireItems.length > 1 ? 's' : ''}</span>
          <span>TBD</span>
        </div>` : ''}
      <div class="cart-summary__total">
        <span>Subtotal</span>
        <span>${formatPrice(subtotal)}${inquireItems.length ? ' +' : ''}</span>
      </div>
      ${purchaseItems.length > 0 ? `<button class="btn btn-primary btn-full btn-lg" style="margin-top:1.25rem">Proceed to Checkout</button>` : ''}
      ${inquireItems.length > 0 ? `<a href="mailto:hello@iotas.net?subject=Inquiry from Cart&body=${encodeURIComponent(inquireItems.map(p=>p.name).join('\n'))}" class="btn btn-forest btn-full" style="margin-top:0.75rem">✉ Send Inquiry Email</a>` : ''}
      <p class="cart-summary__note">Shipping and insurance calculated at checkout. All items fully insured in transit.</p>
    </div>`;

  container.innerHTML = `
    <div class="page">
      ${navHTML()}

      <div class="container cart-page">
        <h1>Your Cart ${cartItems.length > 0 ? `<span style="font-size:1rem;font-weight:400;color:var(--ink-soft);font-family:var(--font-sans)">(${cartItems.length} item${cartItems.length !== 1 ? 's' : ''})</span>` : ''}</h1>
        <div class="cart-layout">
          <div>${itemsHTML}</div>
          <div>${summaryHTML}</div>
        </div>
      </div>

      ${footerHTML()}
      <div class="toast-container"></div>
    </div>`;

  initMenuToggle();
  Cart._updateNav();
}

function cartItemHTML(p, isInquiry = false) {
  return `
    <div class="cart-item" id="cart-item-${p.id}">
      <div class="cart-item__img">
        ${renderImg(p.image, p.name)}
      </div>
      <div>
        <div class="cart-item__type">${p.type}</div>
        <div class="cart-item__name">${p.name}</div>
        <div class="cart-item__year">${p.era} · ${p.year}</div>
        <button class="cart-item__remove" onclick="removeFromCart('${p.id}')">Remove</button>
      </div>
      <div class="cart-item__price">
        ${isInquiry ? '<em style="font-size:0.82rem;color:var(--rust)">Inquire</em>' : formatPrice(p.price)}
      </div>
    </div>`;
}

function removeFromCart(id) {
  Cart.remove(id);
  // Remove from DOM without full re-render for speed
  const el = document.getElementById(`cart-item-${id}`);
  if (el) el.remove();
  // If cart is now empty, re-render
  if (Cart.count() === 0) renderCart(document.getElementById('main'));
}

// ── MOBILE MENU ───────────────────────────────────────────────
function initMenuToggle() {
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('navDrawer');
  if (!btn || !drawer) return;
  btn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });
}

function closeDrawer() {
  const drawer = document.getElementById('navDrawer');
  if (drawer) drawer.classList.remove('open');
}

// ── BOOT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Router.init();
});
