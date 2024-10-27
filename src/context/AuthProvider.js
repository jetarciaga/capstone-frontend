import React, { createContext, useContext, useState } from "react";
import api from "../components/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await api.post("token/", credentials);
      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setAccessToken(access);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      await api.post("token/blacklist/", { refresh });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
