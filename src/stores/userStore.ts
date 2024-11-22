import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = "https://naturepulse.xyz/api/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as null | {
      id: number;
      fullname: string;
      email: string;
      phone: string;
      avatar: string;
    },
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
  }),
  actions: {
    async fetchUserData() {
      if (this.token) {
        try {
          const response = await axios.get(
            `${baseUrl}?action=getUserByToken&token=${this.token}`
          );
          if (response.status === 200) {
            this.user = response.data.data;
            this.isAuthenticated = true;
          } else {
            console.error("Error fetching user data:", response.data.message);
          }
        } catch (error) {
          console.error("Error in fetchUserData:", error);
          this.user = null;
          this.isAuthenticated = false;
        }
      }
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});
