import { createRouter, createWebHashHistory } from "vue-router";
import { useRouterStore } from "@/store/index.js";
import setupRouterGuards from "@/router/guards/index.js";
import { staticRoutes } from "@/router/routes/staticRoutes.js";
import { dynamicRoutes } from "@/router/routes/dynamicRoutes";
import { pageConfig } from "./routes/pageConfig.js";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export function setupRouter(app) {
  initPermissionRoutes();
  setupRouterGuards(router);
  app.use(router);
}

export function initPermissionRoutes() {
  const routerStore = useRouterStore();
  routerStore.setFullRouteMap(dynamicRoutes);
  if (routerStore.pageConfig?.length < 0) {
    initRoutes(routerStore.pageConfig);
  } else {
    initRoutes(pageConfig);
    routerStore.setPageConfig(pageConfig);
  }

  function initRoutes(config, parentKey = "Layout") {
    config.forEach((item) => {
      const target = routerStore.fullRouteMap.get(item.key);

      if (routerStore.fullRouteMap.has(item.key)) {
        const route = {
          path: item.path,
          name: item.key,
          component: target.component,
          meta: {
            pageTitle: item.name,
            icon: item?.icon ?? null,
            keepAlive: item?.keepAlive ?? false,
            buttons: target?.buttons?.filter((btn) =>
              item?.buttons?.includes(btn.key),
            ),
          },
        };
        !router.hasRoute(item.key) && router.addRoute(parentKey, route);
        if (item.children?.length) {
          initRoutes(item.children, item.key);
        }
      } else {
        console.error("路由不存在，key：", item.key);
      }
    });
  }
}
