<template>
  <div id="main">
    <p>404 Page Not Found</p>
    <img src="../assets/WalnutImage.jpg" />
    <button @click="$router.push('/')">Go back to the home page</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  metaInfo: { title: "Not Found" },
});
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
}

img {
  width: 50%;
  height: 50%;
}

button {
  background-color: var(--button-color);
  color: var(--button-text-color);
  margin-top: 1em;
  font-size: 0.75em;
}

p {
  text-align: center;
  display: inline;
}
</style>
