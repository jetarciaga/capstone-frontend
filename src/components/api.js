import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL =
  "http://ec2-13-215-222-173.ap-southeast-1.compute.amazonaws.com:8000/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const fetchCsrfToken = async () => {
  try {
    const response = await api.get("/api/csrf-token/");
    const csrfToken = response.data.csrfToken;
    console.log(csrfToken);
    axios.defaults.headers.commons["X-CSRFToken"] = csrfToken; // Set globally for axios
    console.log(axios.defaults.headers);
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
};

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
