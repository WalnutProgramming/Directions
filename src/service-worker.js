/* eslint-disable no-restricted-globals, no-underscore-dangle, import/no-extraneous-dependencies */

import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

precacheAndRoute(self.__WB_MANIFEST || []);

// https://developers.google.com/web/tools/workbox/guides/common-recipes#cache_css_and_javascript_files
registerRoute(
  /\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

// https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// https://developers.google.com/web/tools/workbox/guides/common-recipes#caching_images
registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 10 * 60, // 10 minutes
      }),
    ],
  })
);

// https://developers.google.com/web/tools/workbox/modules/workbox-routing#how_to_register_a_navigation_route
// Navigate all other navigation routes to index.html
// This assumes /index.html has been precached.
const handler = createHandlerBoundToURL("/index.html");
// Navigation routes only apply when the user is explicitly navigating
// to the route (i.e., resource requests like JS and CSS and AJAX don't
// count)
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);

// https://developers.google.com/web/tools/workbox/modules/workbox-core#skip_waiting_and_clients_claim
// This allows the new service worker to immediately take over the page if it's updated.
// (By default, the service worker will wait until all tabs with the site are closed before
// taking over the page.)
self.skipWaiting();
// clientsClaim();
