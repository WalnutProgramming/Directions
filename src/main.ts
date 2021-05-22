// polyfill needed for vue-snack IE support
import "core-js/features/array/from";

import { createApp, nextTick } from "vue";
// import VueSnackbar from "vue-snack";
// import "vue-snack/dist/vue-snack.min.css";
import { createSnack } from "vue-snack-notify";
import "vue-snack-notify/dist/assets/styles.css";

import App from "@/App.vue";
import router from "@/router";
import "@/registerServiceWorker";

import store from "./store";
import {
  messageOnNextPageReloadKey,
  refreshToUpdate,
} from "./showMessageOnNextPageReload";

const snack = createSnack({ closable: true });

createApp(App).use(router).use(store).use(snack).mount("#app");

const text = sessionStorage.getItem(messageOnNextPageReloadKey);
if (text != null) {
  snack.notify({
    text,
    button: null,
  });
  sessionStorage.removeItem(messageOnNextPageReloadKey);
}

document.addEventListener("needs-refresh", () => {
  // @ts-ignore migrate TODo
  snack.notify({
    text: "New update for site is available",
    button: "refresh to update",
    onAction: refreshToUpdate,
  });
});
