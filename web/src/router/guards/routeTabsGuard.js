import { useRouterStore } from "@/store/index.js";

export default function createRouteTabsGuard(router) {
  router.beforeEach((to, from) => {
    const routerStore = useRouterStore();
    return routerStore.setRouteTab(to, from);
  });
}
