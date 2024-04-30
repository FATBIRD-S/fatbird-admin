export const dynamicRoutes = [
  {
    key: "home",
    name: "首页",
    component: () => import("@/views/Home/Home.vue"),
  },
  {
    key: "system_user",
    name: "系统用户",
    component: () => import("@/views/SystemUser/SystemUser.vue"),
    buttons: [
      {
        key: "system_user_add",
        name: "新增",
        icon: "i-mdi-plus",
        type: "primary",
        hideName: true,
      },
      {
        key: "system_user_edit",
        name: "编辑",
        icon: "i-mdi-edit",
        type: "primary",
      },
    ],
  },
  {
    key: "system_user_test",
    name: "系统用户测试",
    component: () => import("@/views/SystemUser/Test/Test.vue"),
    buttons: [
      {
        key: "system_user_test_add",
        name: "新增222",
        icon: "i-mdi-plus",
        type: "primary",
      },
      {
        key: "system_user_test_edit",
        name: "编辑222",
        icon: "i-mdi-edit",
        type: "primary",
      },
    ],
  },
];
