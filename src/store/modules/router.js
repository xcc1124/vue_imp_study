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
const actions = {};
export default { state, getters, mutations, actions };
