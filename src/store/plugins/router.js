export default (store) => {
  if (localStorage) {
    const routerL = localStorage.getItem("router");
    if (routerL) {
      store.commit("router/setRouter", JSON.parse(routerL));
    }
  }
  /**监听数据改变 */
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith("router/")) {
      const routerL = JSON.stringify(state.router.router);
      localStorage.setItem("router", routerL);
    }
  });
};
