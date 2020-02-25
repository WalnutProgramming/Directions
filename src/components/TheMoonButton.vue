<template>
  <button
    class="moon-button"
    aria-label="Toggle between dark and light theme"
    @click="$store.commit('toggleTheme')"
  ></button>
</template>

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
