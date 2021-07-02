import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import {
  baiduTomars,
  transformGCJ2WGS,
  WGSToGCJ,
  marsTobaidu,
  baiduToGCJ2WGS,
  GCJ2WGSTobaidu,
  base64ToFile,
} from "@/utils/index.js";
Vue.prototype.$baiduTomars = baiduTomars;
Vue.prototype.$transformGCJ2WGS = transformGCJ2WGS;
Vue.prototype.$WGSToGCJ = WGSToGCJ;
Vue.prototype.$marsTobaidu = marsTobaidu;
Vue.prototype.$GCJ2WGSTobaidu = GCJ2WGSTobaidu;
Vue.prototype.$baiduToGCJ2WGS = baiduToGCJ2WGS;
Vue.prototype.$base64ToFile = base64ToFile;
// import * as utils from "@/utils/index.js";
// Vue.prototype.$utils = utils;

Vue.config.productionTip = false; //生产提示

Vue.prototype.$bus = new Vue();
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
