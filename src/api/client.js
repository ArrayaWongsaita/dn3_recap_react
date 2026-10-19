import { create } from "axios";

export const apiClient = create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
