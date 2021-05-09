/// <reference path="./vue-snack-vue-property.d.ts" />

// polyfill needed for vue-snack IE support
import "core-js/features/array/from";

// @ts-ignore
import { createApp, nextTick, configureCompat } from "vue";
import VueSnackbar from "vue-snack";
import "vue-snack/dist/vue-snack.min.css";
import Meta from "vue-meta";

import App from "@/App.vue";
import router from "@/router";
import "@/registerServiceWorker";

import store from "./store";
import {
  messageOnNextPageReloadKey,
  refreshToUpdate,
} from "./showMessageOnNextPageReload";

// @ts-ignore

// TODO compat
configureCompat({ RENDER_FUNCTION: false, WATCH_ARRAY: false });

const app = createApp(App)
  .use(VueSnackbar, { close: true })
  // migrate TODO
  .use(Meta as any)
  .use(router as any)
  .use(store);

const vm = app.mount("#app");

document.addEventListener("DOMContentLoaded", () => {
  const text = sessionStorage.getItem(messageOnNextPageReloadKey);
  if (text != null) {
    nextTick(() => {
      (vm as any).$snack.show({
        text,
        button: "",
      });
      sessionStorage.removeItem(messageOnNextPageReloadKey);
    });
  }
});

document.addEventListener("needs-refresh", () => {
  // @ts-ignore migrate TODo
  vm.$snack.show({
    text: "New update for site is available",
    button: "refresh to update",
    action: refreshToUpdate,
  });
});
