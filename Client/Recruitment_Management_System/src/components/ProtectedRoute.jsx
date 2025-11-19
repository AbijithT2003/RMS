import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles.length > 0) {
    // derive a list of roles from either user.role (string) or user.roles (array)
    const rawRoles = [];
    if (user.role) rawRoles.push(user.role);
    if (Array.isArray(user.roles)) rawRoles.push(...user.roles);

    const normalized = rawRoles
      .filter(Boolean)
      .map((r) => (typeof r === "string" ? r.replace(/^ROLE_/, "") : r));

    const has = normalized.some((r) => allowedRoles.includes(r));
    if (!has) return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
