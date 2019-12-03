<template>
  <div>
    <!-- <span class="btn-hover-area" @click="back">
      <button class="back-btn">
        &laquo; Back
      </button>
    </span> -->
    <CustomButton @customclick="back" style="font-size: 0.5em">
      &laquo; Back
    </CustomButton>

    <main>
      <div id="directions">
        <p v-for="line in directions" :key="line">{{ line }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
import CustomButton from "./CustomButton";
import { getHallwayIndexAndIndex, getDirections } from "./directions.js";

export default Vue.extend({
  data() {
    return {};
  },
  props: {
    fromRoom: { type: String, default: "" },
    toRoom: { type: String, default: "" },
  },
  computed: {
    directions() {
      if (
        getHallwayIndexAndIndex(this.fromRoom) &&
        getHallwayIndexAndIndex(this.toRoom)
      ) {
        // Both have valid names, so put the directions in the HTML
        return getDirections(this.fromRoom, this.toRoom).split("\n");
      } else {
        return ["Sorry, I couldn't find one of those rooms."];
      }
      return "hi";
    },
  },
  methods: {
    back() {
      this.$router.push("/");
    },
  },
  components: {
    CustomButton,
  },
});
</script>
