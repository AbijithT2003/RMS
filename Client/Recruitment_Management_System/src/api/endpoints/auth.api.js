import { apiClient } from "../client.js";

export const authAPI = {
  login: async (loginRequest) => {
    // LoginRequest: { email: string, password: string }
    const res = await apiClient.post("/auth/login", loginRequest);
    return res.data?.data || res.data;
  },

  register: async (registerRequest) => {
    // RegisterRequest: { email: string, fullName: string, password: string, phone?: string, role: string }
    const res = await apiClient.post("/auth/register", registerRequest);
    return res.data?.data || res.data;
  },

  logout: async () => {
    const res = await apiClient.post("/auth/logout");
    return res.data?.data || res.data;
  },
};
