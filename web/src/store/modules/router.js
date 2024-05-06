import { defineStore } from "pinia";

export const useRouterStore = defineStore("router", {
  state: () => ({
    fullRouteMap: new Map(),
    pageConfig: [],
    fullButtonMap: new Map(),
    routeTabs: new Map(),
  }),
  actions: {
    setFullRouteMap(routes) {
      routes.forEach((item) => {
        this.fullRouteMap.set(item.key, item);
      });
      this.setButtonMap(routes);
    },
    setPageConfig(config) {
      this.pageConfig = config;
    },
    setButtonMap(routes) {
      routes.forEach((route) => {
        if (route.buttons?.length > 0) {
          route.buttons.forEach((btn) => {
            this.fullButtonMap.set(btn.key, btn);
          });
        }
      });
    },
    setRouteTab(to, from) {
      if (!this.fullRouteMap.has(to.name)) return true;
      const targetTab = {
        active: true,
        name: to.meta.pageTitle,
        path: to.path,
        key: to.name,
        icon: to.meta.icon,
        closable: to.meta.closable ?? true,
      };
      this.routeTabs.set(to.name, targetTab);
      this.routeTabs.has(from.name) && (this.routeTabs.get(from.name).active = false);
      return true;
    },
    removeRouteTab(key) {
      if (this.routeTabs.get(key).active) {
        const keys = [...this.routeTabs.keys()];
        const deleteKeyIndex = keys.findIndex((item) => item === key);
        this.routeTabs.delete(key);
        if (deleteKeyIndex === 0) {
          return keys[1];
        } else {
          return keys[deleteKeyIndex - 1];
        }
      } else {
        this.routeTabs.delete(key);
        return "";
      }
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ["pageConfig"],
  },
});
