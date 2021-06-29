import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { routesWhiteList } from "@/config";

//auth=true时是无需验证的
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});

const dgHandleRoute = (routeList) => {
  //递归深度处理路由数据
  if (Array.isArray(routeList)) {
    let returnData = [];
    routeList.forEach((item) => {
      let childrenData = [];
      if (item.children) {
        childrenData = dgHandleRoute(item.children);
      }
      returnData.push({
        path: item.path,
        name: item.name,
        component: () => import(`@/views/${item.views}`),
        redirect: item.redirect ? item.redirect : null,
        children: childrenData,
      });
    });
    return returnData;
  } else {
    return [];
  }
};

router.beforeEach((to, from, next) => {
  store.commit("ajax/clear"); // 取消请求
  if (routesWhiteList.indexOf(to.path) > -1) {
    console.log(5555);
    next();
  } else {
    if (store.state.user.isLogin) {
      if (store.state.router.getRouter) {
        next();
      } else {
        let rout = JSON.parse(JSON.stringify(store.state.router.router)); //深拷贝一份存在vuex中的路由数据
        let routerData = dgHandleRoute(rout);
        //路由数据要进行深度处理
        router.addRoutes(routerData);
        store.commit("router/setGetRouter");
        next({
          ...to,
          replace: true,
        });
      }
    } else {
      next("/login");
    }
  }
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
