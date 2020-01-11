import Vue from "vue";
import VueSnackbar from "vue-snack";
import "vue-snack/dist/vue-snack.min.css";
import Meta from "vue-meta";

import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

Vue.use(VueSnackbar, {});
Vue.use(Meta);

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  render: h => h(App),
}).$mount("#app");

document.addEventListener("refresh-snackbar", () => {
  (vm as any).$snack.show({
    text: "This site has been updated",
    button: "refresh",
    action: () => {
      window.location.reload();
    },
  });
});
