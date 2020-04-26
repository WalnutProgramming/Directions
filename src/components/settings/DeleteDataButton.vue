<template>
  <div>
    <button @click="clearStorage">
      Delete Walnut.Direct Local Storage
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { showMessageOnNextPageReload } from "@/showMessageOnNextPageReload";

export default Vue.extend({
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
