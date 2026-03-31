import { apiClient } from "./axiosInstance.js";

export const statisticsApi = {
  async getSiteStatistics() {
    const { data } = await apiClient.get("/site-statistics");
    return data;
  },
};

