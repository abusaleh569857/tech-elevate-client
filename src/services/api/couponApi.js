import { apiClient } from "./axiosInstance.js";

export const couponApi = {
  async getCoupons() {
    const { data } = await apiClient.get("/coupons");
    return data;
  },

  async createCoupon(payload) {
    const { data } = await apiClient.post("/coupons", payload);
    return data;
  },

  async updateCoupon(couponId, payload) {
    const { data } = await apiClient.put(`/coupons/${couponId}`, payload);
    return data;
  },

  async deleteCoupon(couponId) {
    const { data } = await apiClient.delete(`/coupons/${couponId}`);
    return data;
  },

  async validateCoupon(couponCode) {
    const { data } = await apiClient.post("/validate-coupon", { couponCode });
    return data;
  },
};

