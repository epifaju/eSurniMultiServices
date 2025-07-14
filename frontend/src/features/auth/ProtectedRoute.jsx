import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/auth";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = getToken();
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
