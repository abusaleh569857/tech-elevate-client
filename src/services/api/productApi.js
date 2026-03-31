import { apiClient } from "./axiosInstance.js";

export const productApi = {
  async getFeaturedProducts() {
    const { data } = await apiClient.get("/products-featured");
    return data;
  },

  async getTrendingProducts() {
    const { data } = await apiClient.get("/products-trending");
    return data;
  },

  async getAcceptedProducts({ page = 1, search = "" }) {
    const { data } = await apiClient.get(
      `/accepted-products?page=${page}&search=${encodeURIComponent(search)}`
    );
    return data;
  },

  async getProductById(productId) {
    const { data } = await apiClient.get(`/products/${productId}`);
    return data;
  },

  async getProductReviews(productId) {
    const { data } = await apiClient.get(`/products/${productId}/reviews`);
    return data;
  },

  async upvoteProduct(productId) {
    const { data } = await apiClient.post(`/products/${productId}/upvote`, {});
    return data;
  },

  async reportProduct(productId) {
    const { data } = await apiClient.post(`/products/${productId}/report`, {});
    return data;
  },

  async createReview(payload) {
    const { data } = await apiClient.post("/reviews", payload);
    return data;
  },

  async createProduct(payload) {
    const { data } = await apiClient.post("/add-products", payload);
    return data;
  },

  async getMyProducts(ownerEmail) {
    const { data } = await apiClient.get(`/products?ownerEmail=${ownerEmail}`);
    return data;
  },

  async updateProduct(productId, payload) {
    const { data } = await apiClient.put(`/products/${productId}`, payload);
    return data;
  },

  async deleteProduct(productId) {
    const { data } = await apiClient.delete(`/products/${productId}`);
    return data;
  },

  async getAllProducts() {
    const { data } = await apiClient.get("/all-products");
    return data;
  },

  async updateProductReviewStatus(productId, payload) {
    const { data } = await apiClient.patch(`/update-products/${productId}`, payload);
    return data;
  },

  async getReportedProducts() {
    const { data } = await apiClient.get("/reported-products");
    return data;
  },

  async deleteReportedProduct(productId) {
    const { data } = await apiClient.delete(`/reported/products/${productId}`);
    return data;
  },
};

