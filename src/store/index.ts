import Vue from "vue";
import Vuex from "vuex";
import { walnutAccessible, walnutNonAccessible } from "@/walnut";

Vue.use(Vuex);

const SETTINGS_LOCALSTORAGE = "settings";

function setTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

const storedSettings = JSON.parse(
  localStorage.getItem(SETTINGS_LOCALSTORAGE) ?? "{}"
);

const initialState: { isDarkMode: boolean; isAccessibilityMode: boolean } = {
  isDarkMode:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  isAccessibilityMode: false,
  ...storedSettings,
};

setTheme(initialState.isDarkMode);

const settings = new Vuex.Store({
  state: { ...initialState },
  getters: {
    walnut: state =>
      state.isAccessibilityMode ? walnutAccessible : walnutNonAccessible,
  },
  mutations: {
    setDarkTheme(state, newVal) {
      state.isDarkMode = newVal;
    },
    setAccessibilityMode(state, newVal) {
      state.isAccessibilityMode = newVal;
    },
  },
});

settings.subscribe((mutation, state) => {
  localStorage.setItem(SETTINGS_LOCALSTORAGE, JSON.stringify(state));
});

settings.watch(
  state => state.isDarkMode,
  (dark: boolean) => {
    setTheme(dark);
    document.querySelector("body")?.classList.add("enable-transition");
  }
);

// export default new Vuex.Store({
//   modules: { settings },
//   strict: true,
// });
export default settings;
