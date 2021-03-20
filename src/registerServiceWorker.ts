/* eslint-disable no-console */

import { register } from "register-service-worker";

(window as any).needsRefresh = false;

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("App is being served from cache by a service worker.");
    },
    registered(registration: ServiceWorkerRegistration) {
      console.log("Service worker has been registered.");
      // Check for new version of service worker every 45 minutes
      setInterval(() => {
        document.dispatchEvent(new Event("check-for-updates"));
      }, 1000 * 60 * 45);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          document.dispatchEvent(new Event("check-for-updates"));
        }
      });

      document.addEventListener("check-for-updates", () => {
        if ((window as any).needsRefresh) {
          document.dispatchEvent(new Event("needs-refresh"));
        } else {
          registration.update();
        }
      });
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      (window as any).needsRefresh = true;
      document.dispatchEvent(new Event("needs-refresh"));
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
