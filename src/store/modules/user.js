const state = () => ({
  user: null,
  isLogin: false,
  userDict: {
    admin: "123456",
    xcc: "123456",
  }, //模拟用户名密码
});
const getters = {};
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
  },
  isLoginTrue(state) {
    state.isLogin = true;
  },
  isLoginFlase(state) {
    state.isLogin = false;
  },
};
const actions = {
  setUser({ commit, state }, user) {
    /**模拟异步请求 */
    // console.log(state.userDict);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state.userDict[user.username] === user.password) {
          commit("setUser", user);
          commit("isLoginTrue");
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  },
};
export default { state, getters, mutations, actions };
