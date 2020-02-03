<template>
  <button class="moon-button" v-on:click="toggleTheme"></button>
</template>

<script lang="ts">
import Vue from "vue";

const lightTheme = {
  "--background-color": "#ffffff",
  "--alt-background-color": "rgb(221, 237, 241)",
  "--slick-background-color": "#f5f8fa",

  "--button-color": "#03a1fc",
  "--button-shade-color": "#007dc4",
  "--button-text-color": "#ffffff",
  "--button-hold-color": "rgb(209, 226, 228)",

  "--minus-button-color": "rgba(255, 120, 120, 1)",
  "--minus-button-color-hover": "#ff0000",

  "--plus-button-color": "rgb(120, 200, 120)",
  "--plus-button-hover-color": "rgb(93, 158, 93)",

  "--edit-button-color": "#ebac00",
  "--edit-button-shade-color": "#cf8f05",
  "--edit-button-hold-color": "rgb(228, 231, 206)",

  "--input-placeholder-text-color": "#a2bace",
  "--input-selection-color": "#c4e0f0",
  "--input-background-color": "#f5f8fa",

  "--heading-text-color": "#220d8a",
  "--subheading-text-color": "#204ba0",
  "--par-text-color": "#000000",
  "--less-important-text-color": "#6f6f6f",

  "--header-bar-text-color": "#0b004b",
  "--header-bar-selected-text-color": "#2355b8",
  "--header-bar-hover-text-color": "#03a1fc",

  "--moon-filter": "hue-rotate(0deg) contrast(110%)",
};

const darkTheme = {
  "--background-color": "#15202B",
  "--alt-background-color": "rgb(221, 237, 241)",
  "--slick-background-color": "#f5f8fa",

  "--button-color": "#03a1fc",
  "--button-shade-color": "#007dc4",
  "--button-text-color": "#ffffff",
  "--button-hold-color": "rgb(209, 226, 228)",

  "--minus-button-color": "rgba(255, 120, 120, 1)",
  "--minus-button-color-hover": "#ff0000",

  "--plus-button-color": "rgb(120, 200, 120)",
  "--plus-button-hover-color": "rgb(93, 158, 93)",

  "--edit-button-color": "#ebac00",
  "--edit-button-shade-color": "#cf8f05",
  "--edit-button-hold-color": "rgb(228, 231, 206)",

  "--input-placeholder-text-color": "#a2bace",
  "--input-selection-color": "#c4e0f0",
  "--input-background-color": "#f5f8fa",

  "--heading-text-color": "#9CC0F2",
  "--subheading-text-color": "#204ba0",
  "--par-text-color": "#000000",
  "--less-important-text-color": "#6f6f6f",

  "--header-bar-text-color": "#0b004b",
  "--header-bar-selected-text-color": "#2355b8",
  "--header-bar-hover-text-color": "#03a1fc",
  "--header-bar-shadow-color": "#03a1fc",

  "--moon-filter": "hue-rotate(180deg) contrast(90%)",
};

const root = document.documentElement;

function setTheme(theme: Object) {
  Object.entries(theme).forEach(function(entry) {
    root.style.setProperty(entry[0], entry[1]);
  });
}

export default Vue.extend({
  methods: {
    toggleTheme() {
      const checkProp = "--background-color";
      const currentProp = root.style.getPropertyValue(checkProp);
      let theme = lightTheme;
      if (currentProp === lightTheme[checkProp]) {
        theme = darkTheme;
      }
      setTheme(theme);
    },
  },
});

setTheme(lightTheme); // initially set theme to light theme, change this later if theme saves
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
