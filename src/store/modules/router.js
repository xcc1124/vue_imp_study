const state = () => ({
  router: [],
  getRouter: false,
});
const getters = {
  router: (store) => store.router,
};
const mutations = {
  setRouter(state, router) {
    state.router = router;
  },
  clearRouter(state) {
    state.router = [];
  },
  setGetRouter(state) {
    state.getRouter = true;
  },
};
const actions = {
  setRouter({ commit }, router) {
    commit("setRouter", router);
  },
};
export default { state, getters, mutations, actions };
