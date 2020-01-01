/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("App is being served from cache by a service worker.");
    },
    registered(registration: ServiceWorkerRegistration) {
      console.log("Service worker has been registered.");
      // Check for new version of service worker every 45 minutes
      setInterval(() => {
        console.log("Checking for updates");
        registration.update();
      }, 1000 * 60 * 45);
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      document.dispatchEvent(new Event("refresh-snackbar"));
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
