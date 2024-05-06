export const pageConfig = [
  {
    name: "首页",
    key: "home",
    path: "/",
    icon: "i-mdi-home",
  },
  {
    name: "系统管理",
    key: "system_user",
    path: "/system",
    icon: "i-mdi-cog",
    buttons: ["system_user_add", "system_user_edit"],
    children: [
      {
        name: "用户管理",
        key: "system_user_test",
        path: "/system/user",
        icon: "i-mdi-user",
        buttons: ["system_user_test_edit", "system_user_test_add"],
      },
    ],
  },
];
