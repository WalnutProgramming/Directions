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

export default Vue.extend({
  data() {
    // If we have the user's preference stored, use that.
    let isDarkTheme: boolean | null = JSON.parse(
      localStorage.getItem(IS_DARK_THEME_LOCALSTORAGE) ?? "null"
    );
    if (isDarkTheme == null) {
      // If the user is using dark mode on their device, use that.
      isDarkTheme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return { isDarkTheme };
  },
  watch: {
    isDarkTheme: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          setTheme(newVal);
        }
        localStorage.setItem(
          IS_DARK_THEME_LOCALSTORAGE,
          JSON.stringify(newVal)
        );
      },
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
