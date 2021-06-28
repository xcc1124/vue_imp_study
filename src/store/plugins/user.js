export default (store) => {
  if (localStorage) {
    const user = localStorage.getItem("user");
    const isLoginTrue = localStorage.getItem("isLogin");
    if (user) {
      store.commit("user/setUser", JSON.parse(user));
    }
    if (isLoginTrue && JSON.parse(localStorage.getItem("isLogin"))) {
      store.commit("user/isLoginTrue");
    }
  }
  /**监听数据改变 */
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith("user/")) {
      if (mutation.type === "user/setUser") {
        const user = JSON.stringify(state.user.user);
        localStorage.setItem("user", user);
      } else if (mutation.type === "user/clearUser") {
        localStorage.clearItem("user");
      } else if (
        mutation.type === "user/isLoginTrue" ||
        mutation.type === "user/isLoginFlase"
      ) {
        const isLogin = JSON.stringify(state.user.isLogin);
        localStorage.setItem("isLogin", isLogin);
      }
    }
  });
};
