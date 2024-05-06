export const vHasRoles = {
  name: "hasRoles",
  instance: {
    beforeMount: (el, binding) => {
      const roles = binding.value;
      const userRoles =
        sessionStorage.getItem("roles") || localStorage.getItem("roles") || [];
      if (roles && Array.isArray(roles)) {
        const hasRole = roles.some((role) => userRoles.includes(role));
        if (!hasRole) {
          el.parentNode.removeChild(el);
        }
      } else if (typeof roles === "string") {
        if (!userRoles.includes(roles)) {
          el.parentNode.removeChild(el);
        }
      }
    },
  },
};
