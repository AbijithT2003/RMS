import { apiClient } from "../client.js";

export const authAPI = {
  login: async (loginRequest) => {
    // Change from /v1/auth/login to /auth/login
    const res = await apiClient.post("auth/login", loginRequest);
    return res.data?.data || res.data;
  },

  register: async (registerRequest) => {
    const res = await apiClient.post("auth/register", registerRequest);
    return res.data?.data || res.data;
  },

  logout: async () => {
    const res = await apiClient.post("auth/logout");
    return res.data?.data || res.data;
  },
};
  