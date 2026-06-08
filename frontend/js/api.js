/* ============================================
   api.js — Centralized API calls
============================================ */

const API_BASE = 'https://shopzone-backend.onrender.com/api';

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
};

const OrdersAPI = {
  place: (data) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
};

const SettingsAPI = {
  get: () => apiFetch('/settings'),
};