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

// 路由初始化方法
export function setupRouter(app) {
  initPermissionRoutes(pageConfig);
  setupRouterGuards(router);
  app.use(router);
}

// 用户路由构建
export function initPermissionRoutes(pageConfig) {
  const routerStore = useRouterStore();
  routerStore.setFullRouteMap(dynamicRoutes);
  // 重置路由 “/”  “/single” 即清除所有配置的路由，重新配置
  router.removeRoute("/");
  router.removeRoute("/single");
  router.options.routes.forEach((item) => {
    router.addRoute(item);
  });
  // 清除已开tab小标签
  routerStore.clearRouteTabs();

  if (pageConfig) {
    initRoutes(pageConfig);
    routerStore.setPageConfig(pageConfig);
  } else if (routerStore.pageConfig?.length > 0) {
    initRoutes(routerStore.pageConfig);
  }

  function initRoutes(config, parent = "Layout") {
    config.forEach((item) => {
      const target = routerStore.fullRouteMap.get(item.key);

      if (routerStore.fullRouteMap.has(item.key)) {
        const route = {
          path: item.path,
          name: item.pathName,
          component: target.component,
          meta: {
            pageTitle: item.name,
            key: item.key,
            icon: item?.icon ?? null,
            keepAlive: item?.keepAlive ?? false,
            single: !!item.single,
            newWindow: !!item.newWindow,
            buttons: target?.buttons?.filter((btn) => item?.buttons?.includes(btn.key)),
          },
        };

        const parentKey = item.single ? "Single" : parent;
        !router.hasRoute(item.key) && router.addRoute(parentKey, route);
        if (Array.isArray(target.config)) {
          target.config.push(item);
        } else {
          target.config = [item];
        }

        if (item.children?.length) {
          initRoutes(item.children, item.key);
        }
      } else {
        console.error("路由不存在，key：", item.key);
      }
    });
  }
}
