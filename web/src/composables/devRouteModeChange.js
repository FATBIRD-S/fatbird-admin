import { useRouterStore } from "@/store";
import { initPermissionRoutes } from "@/router";
import { dynamicRoutes } from "@/router/routes/dynamicRoutes";

export const devMode = import.meta.env.MODE === "development";

export const devRouteModeChange = () => {
  if (!devMode) return;
  const routerStore = useRouterStore();
  routerStore.devRouteModeTriger();
  if (routerStore.devRouteMode === "full") {
    // 存储原有路由配置
    routerStore.devPageConfigCoppy = routerStore.pageConfig;
    // 将 dynamicRoutes 转化为 pageConfig，然后更新路由
    const config = transferRoutesToConfig(dynamicRoutes);
    initPermissionRoutes(config);
  } else {
    initPermissionRoutes(routerStore.devPageConfigCoppy);
  }
};

function transferRoutesToConfig(routes) {
  const pageConfig = routes.map((item) => {
    return {
      name: item.name,
      pathName: item.key,
      key: item.key,
      path: item.key,
      buttons: item.buttons?.map((bt) => bt.key) ?? [],
    };
  });

  return pageConfig;
}
