import { useUserStore } from "@/store/modules/user";

/**
 * @description: 根据角色判断是否能访问路由
 * param roles type: Array 用户角色
 * return: Boolean
 */
export function permmisionHasRoles(roles) {
  const userStore = useUserStore();
  const userRoles = userStore.roles;
  return roles.some((role) => userRoles.includes(role));
}
