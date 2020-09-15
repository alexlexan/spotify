export const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const callFn = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(callFn, ms);
  };
};
