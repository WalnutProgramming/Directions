/* eslint-disable no-param-reassign */
const path = require("path");
const PrerenderSpaPlugin = require("prerender-spa-plugin");

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, "dist"),
    routes: ["/", "/about"],
    postProcess(renderedRoute) {
      renderedRoute.html = renderedRoute.html
        .replace(/<script (.*?)>/g, "<script $1 defer>")
        .replace('id="app"', 'id="app" data-server-rendered="true"');

      return renderedRoute;
    },
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      // We need to inject a value so we're able to
      // detect if the page is currently pre-rendered.
      inject: {},
      // Our view component is rendered after the API
      // request has fetched all the necessary data,
      // so we create a snapshot of the page after the
      // `[data-view]` attribute exists in the DOM.
      renderAfterElementExists: "[data-view]",
    }),
  }),
];

module.exports = {
  pwa: {
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-150x150.png",
    },
    themeColor: "#03a1fc",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/service-worker.js",
    },

    name: "Walnut Hills Directions",
    manifestOptions: {
      short_name: "Walnut.Direct",
    },
  },
  configureWebpack: config => {
    config.devtool = "source-map";
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(...productionPlugins);
    }
  },
};
