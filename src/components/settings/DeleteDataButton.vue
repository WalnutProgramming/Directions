<template>
  <span @click="clearStorage">
    <button
      class="delete-data-button"
      aria-labelledby="delete-data-button-label"
      @click="clearStorage"
    ></button>
    <label id="delete-data-button-label">
      Delete Walnut.Direct Local Storage
    </label>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { showMessageOnNextPageReload } from "@/showMessageOnNextPageReload";

export default defineComponent({
  compatConfig: { MODE: 3 },
  methods: {
    clearStorage() {
      if (
        // eslint-disable-next-line no-alert
        window.confirm(
          "Are you sure you want to clear local storage? This will reset your schedule and your settings."
        )
      ) {
        localStorage.clear();
        showMessageOnNextPageReload("Cleared local storage");
        window.location.reload();
      }
    },
  },
});
</script>

<style scoped>
.delete-data-button {
  width: 7vh;
  height: 7vh;
  position: relative;
  display: inline-block;
  cursor: pointer;
  border: none;
  background: url("../../assets/trash.svg");
  background-size: 100% 100%;
  vertical-align: middle;
}
</style>
