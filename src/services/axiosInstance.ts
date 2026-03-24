import axios from "axios";
import { auth } from "./api";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh if 401 is received
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const storedRefresh = localStorage.getItem("refreshToken");
        const { data } = await auth.refresh(storedRefresh);
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
