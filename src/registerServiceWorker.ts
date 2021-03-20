/* eslint-disable no-console */

import { register } from "register-service-worker";

(window as any).needsRefresh = false;

let lastUpdated = 0;
const SECONDS_TO_THROTTLE = 60;
function throttledCheckForUpdates() {
  if (Date.now() - lastUpdated >= SECONDS_TO_THROTTLE * 1000) {
    document.dispatchEvent(new Event("check-for-updates"));
    lastUpdated = Date.now();
  }
}

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("App is being served from cache by a service worker.");
    },
    registered(registration: ServiceWorkerRegistration) {
      console.log("Service worker has been registered.");
      // Check for new version of service worker every 45 minutes
      setInterval(throttledCheckForUpdates, 1000 * 60 * 45);
      // Check for new version when window comes into focus
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          throttledCheckForUpdates();
        }
      });
      // Browser automatically checks for a new version when page loads
      // ("A navigation to an in-scope page." in https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle,
      // https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#manual_updates)

      document.addEventListener("check-for-updates", () => {
        // We want to check for a new version even if we know we need
        // a refresh because there could have been a second update.
        registration.update();

        if ((window as any).needsRefresh) {
          document.dispatchEvent(new Event("needs-refresh"));
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
