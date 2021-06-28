import store from "../index";
import { routeFunc } from "@/utils/router.js";

const state = () => ({
  router: [],
});
const getters = {};
const mutations = {
  setRouter(state, router) {
    // let route1 = require(`@/router`).default;
    // console.log(route1);
    // route1.addRoutes(routeFunc(router));

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
          let rout = [
            {
              path: "/",
              auth: true,
              name: "Home",
              component: "Home.vue",
            },
          ];
          // let route = [
          //   {
          //     path: "/",
          //     name: "Home",
          //     // route level code-splitting
          //     // this generates a separate chunk (about.[hash].js) for this route
          //     // which is lazy-loaded when the route is visited.
          //     component: () =>
          //       import(/* webpackChunkName: "about" */ "@/views/Home.vue"),
          //     mate: {
          //       auth: true,
          //     },
          //   },
          // ];
          commit("setRouter", rout);
          resolve();
        }, 1000);
      } else {
        reject();
      }
    });
  },
};
export default { state, getters, mutations, actions };
