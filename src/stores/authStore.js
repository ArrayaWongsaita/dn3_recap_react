import { create } from "zustand";
import { apiClient } from "../api/client";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  login: async (body) => {
    const res = await apiClient.post("/auth/login", body);
    const data = res.data.data;
    set({ token: data.token, user: data.user });
  },
}));
