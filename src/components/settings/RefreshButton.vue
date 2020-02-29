<template>
  <button class="refresh-button"></button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
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
}

/*
.refresh-button:focus {
  animation-name: spin;
  animation-duration: 0.75s;
  animation-iteration-count: 1;
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
*/
</style>
