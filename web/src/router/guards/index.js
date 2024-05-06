import createPermissionGuard from "@/router/guards/permissionGuard.js";
import createPageTitleGuard from "@/router/guards/pageTitleGuard.js";
import createRouteTabsGuard from "@/router/guards/routeTabsGuard.js";

export default function setupRouterGuards(router) {
  createPermissionGuard(router);
  createPageTitleGuard(router);
  createRouteTabsGuard(router);
}
