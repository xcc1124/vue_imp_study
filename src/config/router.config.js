module.exports = {
  // 不经过token校验的路由
  routes: [
    {
      path: "/",
      name: "Home",
      views: "Home.vue",
      children: [
        {
          path: "/home/r",
          name: "R",
          views: "inner/R.vue",
        },
      ],
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/chuanZhi",
      name: "ChuanZhi",
      views: "project/chuanZhi.vue",
    },
    {
      path: "/gongzuo",
      name: "Gongzuo",
      views: "project/gongzuo.vue",
    },
  ],
};
