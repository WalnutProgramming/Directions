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
</style>
