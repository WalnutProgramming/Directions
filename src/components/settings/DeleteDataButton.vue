<template>
  <div>
    <button @click="clearStorage">Clear localStorage</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    clearStorage() {
      localStorage.clear();
      window.location.reload();
    },
  },
});
</script>
