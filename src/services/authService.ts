import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const API_URL = "https://naturepulse.xyz/api/auth?action=login";

export const login = async (email: string, password: string) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post(API_URL, { email, password });
    if (response.data?.data.token) {
      authStore.login(response.data.data.token);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Login failed");
    }
    throw new Error("An unexpected error occurred");
  }
};
