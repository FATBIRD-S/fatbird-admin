import { useRouterStore } from "@/store";

export function routerJump(router, routerKey, options = {}, constraint = {}) {
  const routerStore = useRouterStore();
  const target = routerStore.fullRouteMap.get(routerKey);
  if (target) {
    if (target.config?.length) {
      const constraintKeys = Object.keys(constraint);
      let targetKey = null;
      if (constraintKeys.length) {
        target.config.forEach((item) => {
          if (constraintKeys.every((key) => constraint[key] === item[key])) {
            targetKey = item.pathName;
          }
        });
      }

      if (!targetKey) targetKey = target.config[0].pathName;

      console.log(targetKey);
      console.log(router);

      router.push({
        name: targetKey,
        ...options,
      });
    } else {
      console.error(`路由${routerKey}未配置`);
    }
  } else {
    console.error(`路由${routerKey}不存在`);
  }
}
