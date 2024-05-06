import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null,
    token: "",
    tokenExpire: 0,
  }),
  persist: {
    key: "user",
    storage: sessionStorage,
  },
  getters: {
    userId() {
      return this.userInfo?.id;
    },
    username() {
      return this.userInfo?.username;
    },
    avatar() {
      return this.userInfo?.avatar;
    },
    roles() {
      return this.userInfo?.roles || [];
    },
    getToken() {
      if (this.tokenExpire < Date.now()) {
        this.resetUser();
        return "";
      } else {
        return this.token;
      }
    },
  },
  actions: {
    setUser(user) {
      const userData = {
        id: user.expand.id,
        account: user.account,
        username: user.expand.name,
        roles: user.expand.roles,
        token: user.access_token,
        tokenExpire: user.exp,
      };
      this.token = userData.token;
      this.tokenExpire = userData.tokenExpire;
      this.userInfo = userData;
    },
    resetUser() {
      this.$reset();
    },
  },
});
