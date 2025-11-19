import { apiClient } from "../client.js";

export const authAPI = {
  login: async (credentials) => {
    const res = await apiClient.post("/auth/login", credentials);

    // Handle both response structures
    const p = res.data?.data || res.data; //wrapped in data or direct

    // Normalize role: backend may return `roles` array or a single `role` string
    const rawRoles = p.roles || (p.role ? [p.role] : []);
    let normalizedRole = null;
    if (Array.isArray(rawRoles) && rawRoles.length > 0) {
      // prefer explicit 'RECRUITER' or 'APPLICANT' values; strip possible 'ROLE_' prefix
      const first = rawRoles[0];
      normalizedRole =
        typeof first === "string" ? first.replace(/^ROLE_/, "") : null;
    }

    return {
      accessToken: p.accessToken || p.token || null,
      user: {
        userId: p.userId,
        email: p.email,
        fullName: p.fullName,
        applicantId: p.applicantId,
        recruiterId: p.recruiterId,
        roles: p.roles || (p.role ? [p.role] : []),
        role: normalizedRole,
        tokenType: p.tokenType,
        expiresIn: p.expiresIn,
      },
    };
  },

  register: async (data) => {
    const res = await apiClient.post("/auth/register", data);

    const p = res.data?.data || res.data;

    const rawRoles = p.roles || (p.role ? [p.role] : []);
    let normalizedRole = null;
    if (Array.isArray(rawRoles) && rawRoles.length > 0) {
      const first = rawRoles[0];
      normalizedRole =
        typeof first === "string" ? first.replace(/^ROLE_/, "") : null;
    }

    return {
      accessToken: p.accessToken || p.token || null,
      user: {
        userId: p.userId,
        email: p.email,
        fullName: p.fullName,
        applicantId: p.applicantId,
        recruiterId: p.recruiterId,
        roles: p.roles || (p.role ? [p.role] : []),
        role: normalizedRole,
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
