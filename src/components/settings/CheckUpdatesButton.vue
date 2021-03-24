<template>
  <span @click="checkForUpdates">
    <button
      :class="{ 'updates-button': true, spin }"
      aria-labelledby="updates-button-label"
      @click="checkForUpdates"
    ></button>
    <label id="updates-button-label"> Check For Updates </label>
  </span>
</template>

<script lang="ts">
/// <reference path="../../vue-snack-vue-property.d.ts" />

import Vue from "vue";
import { refreshToUpdate } from "@/showMessageOnNextPageReload";

export default Vue.extend({
  data() {
    return { spin: false };
  },
  methods: {
    checkForUpdates(): void {
      document.addEventListener("needs-refresh", refreshToUpdate);
      document.dispatchEvent(new Event("check-for-updates"));
      this.spin = true;
      setTimeout(() => {
        document.removeEventListener("needs-refresh", refreshToUpdate);
        this.spin = false;
        if (!(window as any).needsRefresh) {
          this.$snack.show({
            text: "No updates found",
            button: "",
          });
        }
      }, 4000);
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
  vertical-align: middle;
}

.spin {
  animation-name: spin;
  animation-duration: 1.333s;
  animation-iteration-count: 3;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
