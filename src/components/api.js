import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}token/refresh/`, {
      refresh: localStorage.getItem("refreshToken"),
    });
    const { access } = response.data;
    localStorage.setItem("accessToken", access);
    return access;
  } catch (error) {
    console.error("Error refreshing access token", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp - currentTime < 60) {
        try {
          token = await refreshAccessToken();
        } catch (error) {
          console.error("Token refresh failed:", error);
          throw error;
        }
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
