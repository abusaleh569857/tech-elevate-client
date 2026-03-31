import { apiClient } from "./axiosInstance.js";

export const paymentApi = {
  async createPaymentIntent(amount) {
    const { data } = await apiClient.post("/create-payment-intent", { amount });
    return data;
  },
};

