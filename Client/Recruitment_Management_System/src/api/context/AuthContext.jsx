/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../endpoints/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    user: null,
    isLoading: true,
  }); 

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        setAuth({
          accessToken: token,
          user: JSON.parse(userStr),
          isLoading: false,
        });
      } else {
        setAuth({ accessToken: null, user: null, isLoading: false });
      }
    } catch (err) {
      console.error("Auth init error:", err);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      setAuth({ accessToken: null, user: null, isLoading: false });
    }
  }, []);

  // LOGIN
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { accessToken } = response;

      if (!accessToken) {
        throw new Error("Invalid response from server");
      }

      // Decode JWT token to extract user info and roles
      let user = {};
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        user = {
          email: response.email || payload.sub,
          fullName: response.fullName,
          role: payload.roles?.[0] || 'CANDIDATE',
          roles: payload.roles || [],
          userId: response.userId,
          applicantId: response.applicantId,
          recruiterId: response.recruiterId,
        };
      } catch (error) {
        console.error('Error decoding JWT:', error);
        throw new Error('Invalid token received');
      }

      // Save to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Update context
      setAuth({ accessToken, user, isLoading: false });

      return { accessToken, user };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  // REGISTER
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { accessToken } = response;

      if (!accessToken) {
        throw new Error("Invalid response from server");
      }

      // Decode JWT token to extract user info and roles
      let user = {};
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        user = {
          email: response.email || payload.sub,
          fullName: response.fullName,
          role: payload.roles?.[0] || userData.role || 'CANDIDATE',
          roles: payload.roles || [],
          userId: response.userId,
          applicantId: response.applicantId,
          recruiterId: response.recruiterId,
        };
      } catch (error) {
        console.error('Error decoding JWT:', error);
        throw new Error('Invalid token received');
      }

      // Save
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setAuth({ accessToken, user, isLoading: false });

      return { accessToken, user };
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await authAPI.logout(); // your backend supports this
    } catch (err) {
      console.warn("Logout API failed:", err);
    }

    // Always clear local state
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setAuth({ accessToken: null, user: null, isLoading: false });
  };

  // AUTH HELPERS
  const isAuthenticated = !!auth.accessToken && !!auth.user;

  const hasRole = (role) => auth.user?.role === role;

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        isAuthenticated,
        login,
        register,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
