<template>
  <div id="main">
    <p>404 Page Not Found</p>
    <img src="../assets/WalnutImage.jpg" />
    <CustomButton id="button" @click="$router.push('/')"
      >Go back to the home page</CustomButton
    >

    <teleport to="head">
      <title>Walnut.Direct - Not Found</title>
      <meta
        name="description"
        content="Straightforward directions between rooms in Walnut Hills High School. Created by the Walnut Hills Programming Club."
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomButton from "@/components/buttons/CustomButton.vue";

export default defineComponent({
  components: { CustomButton },
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

#button {
  margin-top: 0.75em;
  font-size: 0.5em;
}

p {
  text-align: center;
  display: inline;
}
</style>
