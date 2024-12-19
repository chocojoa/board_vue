import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    token: "",
    user: "",
    userMenus: [],
  }),
  getters: {
    getUser() {
      return this.user;
    },
    getToken() {
      return this.token;
    },
    getUserMenus() {
      return this.userMenus;
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
    setUserMenus(userMenus) {
      this.userMenus = userMenus;
    },
  },
  persist: true,
});
