import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const productService = {
  // Get all products
  getAllProducts: async () => {
    const response = await api.get("/products");
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get("/products/categories");
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  // Get limited products (for featured section)
  getLimitedProducts: async (limit = 8) => {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  },
};

export default api;
