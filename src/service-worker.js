/* eslint-disable no-undef */
// eslint-disable-next-line no-restricted-globals, no-underscore-dangle
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// https://developers.google.com/web/tools/workbox/guides/common-recipes#cache_css_and_javascript_files
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

// https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// https://developers.google.com/web/tools/workbox/guides/common-recipes#caching_images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 10 * 60, // 10 minutes
      }),
    ],
  })
);

// https://developers.google.com/web/tools/workbox/modules/workbox-core#skip_waiting_and_clients_claim
// This allows the new service worker to immediately take over the page if it's updated.
// (By default, the service worker will wait until all tabs with the site are closed before
// taking over the page.)
workbox.core.skipWaiting();
workbox.core.clientsClaim();
