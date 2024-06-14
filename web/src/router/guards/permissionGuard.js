import { useRouterStore, useUserStore } from "@/store/index.js";

const WHITE_LIST = ["/login", "/404", "/401"];

export default function createPermissionGuard(router) {
  router.beforeEach(async (to, from) => {
    const userStore = useUserStore();
    const routerStore = useRouterStore();
    const token = userStore.getToken;
    if (!token) {
      if (to.path === "/login") {
        return { path: "/" };
      } else {
        if (router.hasRoute(to.name)) return true;
        if (WHITE_LIST.includes(from.path)) return { path: "/" };
        if (routerStore.fullRouteMap.has(to.name)) {
          return { path: "/403", query: { from: from.path } };
        } else {
          return { path: "/404", query: { from: from.path } };
        }
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        return true;
      } else {
        return { path: "/login", query: { ...to.query, redirect: to.path } };
      }
    }
  });
}
