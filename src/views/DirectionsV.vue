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
        <p v-for="(line, index) in directions" :key="index + ':::' + line">
          {{ line }}
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
import CustomButton from "../components/CustomButton";
import walnut from "../walnut";

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
        walnut.getHallwayIndexAndIndex(this.fromRoom) &&
        walnut.getHallwayIndexAndIndex(this.toRoom)
      ) {
        // Both have valid names, so put the directions in the HTML
        return walnut
          .getDirections(this.fromRoom, this.toRoom)
          .trim()
          .split("\n");
      } else {
        return ["Sorry, I couldn't find one of those rooms."];
      }
    },
  },
  methods: {
    back() {
      if (this.$route.query.scheduleInd != null) {
        this.$router.push("/myschedule");
      } else {
        this.$router.push("/");
      }
    },
  },
  components: {
    CustomButton,
  },
});
</script>

<style scoped>
p {
  padding-top: 17px;
  padding-bottom: 15px;
  margin-top: 0;
  margin-bottom: 0;
}

p:nth-child(even) {
  background-color: lightblue;
}
</style>
