import { apiClient } from "./axiosInstance.js";

export const authApi = {
  async createJwt(payload) {
    const { data } = await apiClient.post("/jwt", payload);
    return data;
  },
};

