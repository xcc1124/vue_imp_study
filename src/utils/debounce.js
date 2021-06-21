export const debounceFunc = (fn, wait) => {
  var timeout = null;
  return function (a) {
    /*如果有新的请求过来了，将清除上一次请求，达到每次只请求最新的那次的目的*/ //a为传入fn的参数
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(a);
    }, wait);
  };
};
