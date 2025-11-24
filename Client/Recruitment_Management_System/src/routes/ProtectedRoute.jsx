import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log('ProtectedRoute Debug:', { token: !!token, user, allowedRoles });

  if (!token) {
    console.log('No token, redirecting to auth');
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

    console.log('Role check:', { rawRoles, normalized, allowedRoles });
    
    const has = normalized.some((r) => allowedRoles.includes(r));
    if (!has) {
      console.log('Role not allowed, redirecting to unauthorized');
      return <Navigate to="/unauthorized" replace />;
    }
  }

  console.log('Access granted, rendering children');
  return children;
};

export default ProtectedRoute;
