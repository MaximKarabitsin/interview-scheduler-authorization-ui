export default {
  install(Vue) {
    Vue.prototype.$error = function(html) {
      // eslint-disable-next-line no-undef
      M.toast({ html, classes: "red" });
    };
    Vue.prototype.$message = function(html) {
      // eslint-disable-next-line no-undef
      M.toast({ html});
    };
  }
};
