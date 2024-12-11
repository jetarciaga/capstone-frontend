import React from "react";
import { Navigate } from "react-router-dom";
// import { AuthProvider } from "../context/AuthProvider";
import { useAuth } from "../context/AuthProvider";

const PublicRoute = ({ children }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
