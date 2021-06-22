import store from "../index";

const state = () => ({
  router: [],
});
const getters = {};
const mutations = {
  setRouter(state, router) {
    state.router = router;
  },
  clearRouter(state) {
    state.router = [];
  },
};
const actions = {
  getRouter({ commit }) {
    return new Promise((resolve, reject) => {
      if (store.state.user.isLogin) {
        //判断当前是否登录
        setTimeout(() => {
          commit("setRouter", [
            {
              path: "/",
              name: "Home",
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () =>
                import(/* webpackChunkName: "about" */ "@/views/Home.vue"),
            },
          ]);
          resolve();
        }, 1000);
      } else {
        reject();
      }
    });
  },
};
export default { state, getters, mutations, actions };
