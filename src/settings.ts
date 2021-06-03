import { reactive, watchEffect } from "vue";

const SETTINGS_LOCALSTORAGE = "settings";

function setTheme(dark: boolean) {
  if ("dataset" in document.documentElement /* IE10 doesn't support this */)
    document.documentElement.dataset.theme = dark ? "dark" : "light";
}

const storedSettings = JSON.parse(
  localStorage.getItem(SETTINGS_LOCALSTORAGE) ?? "{}"
);

const settings: { isDarkMode: boolean; isAccessibilityMode: boolean } =
  reactive({
    isDarkMode:
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    isAccessibilityMode: false,
    ...storedSettings,
  });

// We want to transition the colors if we're changing between light and dark
// mode, but not on the initial page load.
let isOriginalPageLoad = true;
watchEffect(() => {
  setTheme(settings.isDarkMode);
  if (!isOriginalPageLoad)
    document.querySelector("body")?.classList.add("enable-transition");
  isOriginalPageLoad = false;
});

watchEffect(() => {
  localStorage.setItem(SETTINGS_LOCALSTORAGE, JSON.stringify(settings));
});

export default settings;
