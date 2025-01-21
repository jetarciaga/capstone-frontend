import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL =
  "http://ec2-13-215-222-173.ap-southeast-1.compute.amazonaws.com:8000/";
// "http://localhost:8000/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ====================================
// CSRF Token Handling (Prevent Repeated Calls)
// ====================================
let csrfTokenFetched = false;

export const fetchCsrfToken = async () => {
  if (!csrfTokenFetched) {
    try {
      const response = await api.get("api/csrf-token/");
      axios.defaults.headers.common["X-CSRFToken"] = response.data.csrfToken;
      csrfTokenFetched = true;
      console.log("CSRF Token Set:", response.data.csrfToken);
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  }
};

// ====================================
// Axios Request Interceptor
// ====================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // ====================================
      // CHANGED: Remove token refresh logic, clear storage if token is about to expire
      // ====================================
      if (decoded.exp - currentTime < 60) {
        console.warn("Token expired or about to expire, clearing storage.");
        localStorage.clear(); // Clear storage instead of refreshing token
        window.location.href = "/"; // Redirect to login page
        return Promise.reject(new Error("Token expired, logging out..."));
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ====================================
// Axios Response Interceptor to Handle Expired Tokens
// ====================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn(
        "Unauthorized request, clearing storage and redirecting to login."
      );

      // ====================================
      // CHANGED: Clear local storage and redirect upon 401 error
      // ====================================
      localStorage.clear(); // Clear all stored data
      // window.location.href = "/"; // Redirect user to login page
    }
    return Promise.reject(error);
  }
);

// ====================================
// Logout Function: Ensures Proper Cleanup
// ====================================
export const logout = () => {
  localStorage.clear(); // CHANGED: Use clear() instead of removing specific items
  window.location.href = "/"; // Redirect user to login page
};

export default api;
