const baseTitle = import.meta.env.VITE_TITLE;

export default function createPageTitleGuard(router) {
  router.afterEach((to) => {
    const pageTitle = to.meta?.pageTitle;
    if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  });
}
