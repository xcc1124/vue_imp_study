export const routeFunc = (routL) => {
  let rout = [];
  routL.forEach((item) => {
    rout.push({
      path: item.path,
      name: item.name,
      mate: {
        auth: item.auth,
      },
      // component(resolve) {
      //   require([item.component], resolve);
      // },
      component: () =>
        Promise.resolve(require(`@/views/${item.component}`).default),
    });
  });
  return rout;
};
