import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import messagePlugin from "./utils/message.plugin"
import "materialize-css/dist/js/materialize.min";
import "roboto-fontface/css/roboto/roboto-fontface.css";

Vue.config.productionTip = false;

Vue.use(messagePlugin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
