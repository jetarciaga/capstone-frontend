import React, { createContext, useContext, useState, useEffect } from "react";
import api, { fetchCsrfToken } from "../components/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUserDetails = async (token) => {
    try {
      const response = await api.get("api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post("api/token/", credentials);
      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setAccessToken(access);
      setIsAuthenticated(true);
      await fetchUserDetails(access);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      await api.post("api/token/blacklist/", { refresh });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    // fetchCsrfToken();
    if (accessToken) {
      fetchUserDetails(accessToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
