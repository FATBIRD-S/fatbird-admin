import { useRouterStore } from "@/store/index.js";

export default function createRouteTabsGuard(router) {
  router.beforeEach((to, from) => {
    const routerStore = useRouterStore();
    console.log(to, from);
    if (to.meta.single) {
      return true;
    } else {
      return routerStore.setRouteTab(to, from);
    }
  });
}
