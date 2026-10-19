import { create } from "axios";
import { useAuthStore } from "../stores/authStore";

export const apiClient = create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.log("401 ----");
      // logout()
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
