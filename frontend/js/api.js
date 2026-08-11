/* ============================================
   api.js — Centralized API calls
============================================ */

const API_BASE ='https://api.baabahanson.com/api';;

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('adminToken');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

const ProductsAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/products${qs ? '?' + qs : ''}`);
  },
  getOne: (id) => apiFetch(`/products/${id}`),
  getBestSellers: () => apiFetch('/products/best-sellers'),
};

const OrdersAPI = {
  place: (data) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
};

const SettingsAPI = {
  get: () => apiFetch('/settings'),
};

// ── Currency formatter ──
// Loads once and caches for the session
let _currencySettings = null;

async function loadCurrencySettings() {
  if (_currencySettings) return _currencySettings;
  try {
    const s = await SettingsAPI.get();
    _currencySettings = {
      symbol:   s.currencySymbol   || '$',
      code:     s.currencyCode     || 'USD',
      position: s.currencyPosition || 'before',
    };
  } catch {
    _currencySettings = { symbol: '$', code: 'USD', position: 'before' };
  }
  return _currencySettings;
}

function formatCurrencyWith(amount, settings) {
  const num = Number(amount).toFixed(2);
  return settings.position === 'after'
    ? `${num}${settings.symbol}`
    : `${settings.symbol}${num}`;
}