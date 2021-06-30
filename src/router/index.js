import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { routesWhiteList } from "@/config";

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
    path: "*",
    component: () => import("../views/404.vue"),
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
  if (store.state.user.isLogin) {
    //首先判断当前有无登录
    if (store.state.router.getRouter) {
      //如果获取过了路由，则直接进入到页面中去
      next();
    } else {
      //否则要从vuex中取路由数据进行动态渲染
      let rout = JSON.parse(JSON.stringify(store.state.router.router)); //深拷贝一份存在vuex中的路由数据
      let routerData = dgHandleRoute(rout); //路由数据要进行深度递归处理
      router.addRoutes(routerData); //动态添加路由数据
      store.commit("router/setGetRouter"); //设置vuex中的路由获取态
      //动态添加完路由数据后要重新跳转路由
      //此处的next和别处直接的next有出入，此处的会重新进入这个路由，而不是直接进入，相当于next()只会进行一次路由跳转,而next({...to,replace:true})会进行两次跳转
      next({
        ...to,
        replace: true,
      });
    }
  } else {
    if (routesWhiteList.indexOf(to.path) > -1) {
      //白名单，不用登录态能进入的路由
      next();
    } else {
      next("/login");
    }
  }
});
//解决报错  Redirected when going from "/login" to "/" via a navigation guard.
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
