import Layout from "@/layout/Layout.vue";

export const staticRoutes = [
  {
    // 所有配置路由将添加至Layout下
    name: "Layout",
    path: "/",
    component: Layout,
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/Login/Login.vue"),
    meta: {
      title: "登录页",
      layout: "empty",
    },
  },
  {
    name: "404",
    path: "/404",
    component: () => import("@/views/ErrorPage/404.vue"),
    meta: {
      title: "页面飞走了",
      layout: "empty",
    },
  },
  {
    name: "403",
    path: "/403",
    component: () => import("@/views/ErrorPage/403.vue"),
    meta: {
      title: "没有权限",
      layout: "empty",
    },
  },
];
