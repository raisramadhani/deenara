// API Base URL
export const API_BASE_URL = "https://fakestoreapi.com";

// App Configuration
export const APP_NAME = "Deenara";
export const APP_VERSION = "1.0.0";

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: "deenara-cart",
  USER: "deenara-user",
};

// Theme Colors
export const COLORS = {
  primary: "#3182CE",
  primaryDark: "#2C5282",
  primaryLight: "#4299E1",
  charcoal: "#2D3748",
  charcoalLight: "#4A5568",
  border: "#E2E8F0",
};

// Product Categories
export const CATEGORIES = {
  ALL: "all",
  ELECTRONICS: "electronics",
  JEWELERY: "jewelery",
  MENS_CLOTHING: "men's clothing",
  WOMENS_CLOTHING: "women's clothing",
};

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  CATEGORIES: "/products/categories",
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  LIMITED_PRODUCTS: (limit) => `/products?limit=${limit}`,
};

// Default Values
export const DEFAULTS = {
  FEATURED_PRODUCTS_LIMIT: 8,
  PRODUCTS_PER_PAGE: 12,
};

// Messages
export const MESSAGES = {
  CART_ADD_SUCCESS: "Produk berhasil ditambahkan ke keranjang!",
  CART_REMOVE_SUCCESS: "Produk berhasil dihapus dari keranjang!",
  CART_EMPTY: "Keranjang belanja kosong",
  PRODUCT_NOT_FOUND: "Produk tidak ditemukan",
  LOADING: "Memuat data...",
  ERROR_DEFAULT: "Tidak dapat memuat data. Silakan coba lagi nanti.",
  ERROR_NETWORK: "Terjadi kesalahan jaringan. Periksa koneksi internet Anda.",
};

export default {
  API_BASE_URL,
  APP_NAME,
  APP_VERSION,
  STORAGE_KEYS,
  COLORS,
  CATEGORIES,
  API_ENDPOINTS,
  DEFAULTS,
  MESSAGES,
};
