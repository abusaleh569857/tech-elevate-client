import { apiClient } from "./axiosInstance.js";

export const userApi = {
  async createUser(payload) {
    const { data } = await apiClient.post("/users", payload);
    return data;
  },

  async getUserByEmail(email) {
    const { data } = await apiClient.get(`/users?email=${email}`);
    return data;
  },

  async getAllUsers() {
    const { data } = await apiClient.get("/all-users");
    return data;
  },

  async updateUserRole(userId, role) {
    const { data } = await apiClient.put(`/users/${userId}/role`, { role });
    return data;
  },

  async updateSubscription(payload) {
    const { data } = await apiClient.put("/update-subscription", payload);
    return data;
  },
};

