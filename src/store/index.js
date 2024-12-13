import { defineStore } from "pinia";

const piniaState = JSON.parse(localStorage.getItem("piniaState"));

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: piniaState?.isAuthenticated || false,
    token: piniaState?.token || "",
    user: piniaState?.user || "",
  }),
  getters: {
    getUser() {
      return this.user;
    },
    getToken() {
      return this.token;
    },
  },
  actions: {
    signIn({ token, user }) {
      this.isAuthenticated = true;
      this.token = token;
      this.user = user;
    },
    signOut() {
      this.isAuthenticated = false;
      this.token = "";
      this.user = "";
    },
  },
});
