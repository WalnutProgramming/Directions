<template>
  <button
    class="moon-button"
    aria-label="Toggle between dark and light theme"
    @click="toggleTheme"
  ></button>
</template>

<script lang="ts">
import Vue from "vue";

function setTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

const IS_DARK_THEME_LOCALSTORAGE = "isDarkTheme";

const stored = localStorage.getItem(IS_DARK_THEME_LOCALSTORAGE);
const initialDarkTheme: boolean =
  stored != null
    ? // If we have the user's preference stored, use that.
      JSON.parse(stored)
    : // If the user is using dark mode on their device, use that.
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(initialDarkTheme);

export default Vue.extend({
  data() {
    return { isDarkTheme: initialDarkTheme };
  },
  watch: {
    isDarkTheme(isDarkTheme: boolean) {
      setTheme(isDarkTheme);
      localStorage.setItem(
        IS_DARK_THEME_LOCALSTORAGE,
        JSON.stringify(isDarkTheme)
      );
      document.querySelector("body")?.classList.add("enable-transition");
    },
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
});
</script>

<style scoped>
.moon-button {
  background: url("../assets/walnutDirectMoon.svg");
  height: 5vh;
  width: 5vh;
  vertical-align: super;
  border: none;
  background-size: 5vh 5vh;
  filter: var(--moon-filter);
}
</style>
