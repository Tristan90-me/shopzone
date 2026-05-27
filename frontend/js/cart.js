/* ============================================
   cart.js — localStorage cart + shared UI
============================================ */

const Cart = {
  getAll() { return JSON.parse(localStorage.getItem('cart') || '[]'); },
  save(items) { localStorage.setItem('cart', JSON.stringify(items)); Cart.updateBadge(); },

  add(product) {
    const items = Cart.getAll();
    const existing = items.find(i => i._id === product._id);
    if (existing) { existing.quantity += 1; }
    else { items.push({ ...product, quantity: 1 }); }
    Cart.save(items);
    showToast(`${product.name} added to cart`, 'success');
  },

  remove(productId) {
    Cart.save(Cart.getAll().filter(i => i._id !== productId));
  },

  updateQty(productId, qty) {
    const items = Cart.getAll();
    const item = items.find(i => i._id === productId);
    if (!item) return;
    if (qty <= 0) { Cart.remove(productId); return; }
    item.quantity = qty;
    Cart.save(items);
  },

  count() { return Cart.getAll().reduce((sum, i) => sum + i.quantity, 0); },
  subtotal() { return Cart.getAll().reduce((sum, i) => sum + i.price * i.quantity, 0); },
  clear() { localStorage.removeItem('cart'); Cart.updateBadge(); },

  updateBadge() {
    const count = Cart.count();
    document.querySelectorAll('.cart-count').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function renderNavbar(activePage = '') {
  const count = Cart.count();
  return `
  <nav class="navbar">
    <div class="container">
      <a href="/index.html" class="nav-logo">Shop<span>Zone</span></a>
      <div class="nav-search">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" placeholder="Search products..." id="navSearchInput">
        <button onclick="handleNavSearch()">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
      <div class="nav-actions">
        <a href="/products.html" class="nav-link ${activePage === 'products' ? 'active' : ''}">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/></svg>
          <span>Products</span>
        </a>
        <a href="/cart.html" class="cart-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Cart
          <span class="cart-count" style="display:${count > 0 ? 'flex' : 'none'}">${count}</span>
        </a>
      </div>
    </div>
  </nav>`;
}

function handleNavSearch() {
  const input = document.getElementById('navSearchInput');
  if (input?.value.trim()) {
    window.location.href = `/products.html?search=${encodeURIComponent(input.value.trim())}`;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement?.id === 'navSearchInput') handleNavSearch();
});

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">Shop<span>Zone</span></div>
          <p>Your go-to store for everything. Quality products, fast delivery, great prices.</p>
        </div>
        <div>
          <div class="footer-heading">Shop</div>
          <ul class="footer-links">
            <li><a href="/products.html">All Products</a></li>
            <li><a href="/cart.html">My Cart</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-heading">Info</div>
          <ul class="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ShopZone. All rights reserved.</span>
      </div>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());