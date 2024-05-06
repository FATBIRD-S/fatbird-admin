import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", {
  state: () => ({
    // 侧边栏是否折叠
    isCollapse: false,
  }),
  getters: {},
  actions: {
    // 侧边栏折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
