<template>
  <span @click="reloadPage">
    <button
      class="refresh-button"
      aria-labelledby="refresh-button-label"
      @click="reloadPage"
    ></button>
    <label id="refresh-button-label"> Refresh App </label>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { showMessageOnNextPageReload } from "@/main";

export default Vue.extend({
  methods: {
    reloadPage() {
      showMessageOnNextPageReload("Refreshed app");
      window.location.reload();
    },
  },
});
</script>

<style scoped>
.refresh-button {
  width: 7vh;
  height: 7vh;
  position: relative;
  display: inline-block;
  cursor: pointer;
  border: none;
  background: url("../../assets/refresh.svg");
  background-size: 100% 100%;
  vertical-align: middle;
}
</style>
