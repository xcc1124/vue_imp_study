export default (store) => {
  if (localStorage) {
    const router = localStorage.getItem("router");
    if (router) {
      store.commt("user/setRouter", JSON.parse(router));
    }
  }
  /**监听数据改变 */
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith("router/")) {
      const router = JSON.stringify(state.router);
      localStorage.setItem("router", router);
    }
  });
};
