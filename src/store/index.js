// 模块化vuex

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/**模块化 */
const files = require.context("./modules", false, /\.js$/);
const modules = {};
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});
Object.keys(modules).forEach((key) => {
  modules[key]["namespaced"] = true;
});

/**插件模式设置数据持久化 */
const filesPlugin = require.context("./plugins", false, /\.js$/);
const plugins = [];
filesPlugin.keys().forEach((key) => {
  plugins.push(filesPlugin(key).default);
});

const store = new Vuex.Store({
  modules,
  state: {},
  mutations: {},
  actions: {},
  plugins,
  strict: true, //严格模式
});
export default store;
