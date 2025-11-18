import { apiClient } from "../client.js";

export const authAPI = {
  login: async (credentials) => {
    const res = await apiClient.post("/auth/login", credentials);

    // Your backend response is either:
    // { success, message, data: AuthResponse }
    // or directly AuthResponse
    const p = res.data?.data || res.data;

    return {
      accessToken: p.accessToken,
      user: {
        userId: p.userId,
        email: p.email,
        fullName: p.fullName,
        applicantId: p.applicantId,
        recruiterId: p.recruiterId,
        roles: p.roles,
        tokenType: p.tokenType,
        expiresIn: p.expiresIn,
      },
    };
  },

  register: async (data) => {
    const res = await apiClient.post("/auth/register", data);

    const p = res.data?.data || res.data;

    return {
      accessToken: p.accessToken,
      user: {
        userId: p.userId,
        email: p.email,
        fullName: p.fullName,
        applicantId: p.applicantId,
        recruiterId: p.recruiterId,
        roles: p.roles,
        tokenType: p.tokenType,
        expiresIn: p.expiresIn,
      },
    };
  },

  logout: async () => {
    const res = await apiClient.post("/auth/logout");
    return res.data;
  },
};
