<template>
  <button class="updates-button" @click="checkForUpdates"></button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    checkForUpdates() {
      document.dispatchEvent(new Event("check-for-updates"));
    },
  },
});
</script>

<style scoped>
.updates-button {
  width: 7vh;
  height: 7vh;
  position: relative;
  display: inline-block;
  cursor: pointer;
  border: none;
  background: url("../../assets/checkupdates.svg");
  background-size: 100% 100%;
}
</style>
