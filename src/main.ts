// polyfill needed for vue-snack IE support
import "core-js/features/array/from";

import Vue from "vue";
import VueSnackbar from "vue-snack";
import "vue-snack/dist/vue-snack.min.css";
import Meta from "vue-meta";

import App from "@/App.vue";
import router from "@/router";
import "@/registerServiceWorker";
import store from "./store";
import {
  messageOnNextPageReloadKey,
  showMessageOnNextPageReload,
} from "./showMessageOnNextPageReload";

Vue.use(VueSnackbar, { close: true });
Vue.use(Meta);

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

document.addEventListener("DOMContentLoaded", () => {
  const text = sessionStorage.getItem(messageOnNextPageReloadKey);
  if (text != null) {
    Vue.nextTick(() => {
      (vm as any).$snack.show({
        text,
        button: "",
      });
      sessionStorage.removeItem(messageOnNextPageReloadKey);
    });
  }
});

document.addEventListener("refresh-snackbar", () => {
  (vm as any).$snack.show({
    text: "New update for site is available",
    button: "refresh to update",
    action: () => {
      showMessageOnNextPageReload("Updated site");
      window.location.reload();
    },
  });
});
