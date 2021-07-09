import { createApp } from "vue";
import { createSnack } from "vue-snack-notify";
import "vue-snack-notify/dist/assets/styles.css";

import App from "@/App.vue";
import router from "@/router";

import {
  messageOnNextPageReloadKey,
  refreshToUpdate,
} from "./showMessageOnNextPageReload";

import(
  /* webpackChunkName: "registerServiceWorker" */ "@/registerServiceWorker"
);

const snack = createSnack({ closable: true });

createApp(App).use(router).use(snack).mount("#app");
// @ts-ignore
window.snack = snack;

const text = sessionStorage.getItem(messageOnNextPageReloadKey);
if (text != null) {
  snack.notify({
    text,
    button: null,
  });
  sessionStorage.removeItem(messageOnNextPageReloadKey);
}

document.addEventListener("needs-refresh", () => {
  snack.notify({
    text: "New update for site is available",
    button: "refresh to update",
    onAction: refreshToUpdate,
  });
});
