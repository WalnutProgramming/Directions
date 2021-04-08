<template>
  <div id="main">
    <p>404 Page Not Found</p>
    <img src="../assets/WalnutImage.jpg" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  metaInfo: { title: "NotFound" },
});
</script>

<style scoped>
#main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  height: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

p {
  text-align: center;
}
</style>
