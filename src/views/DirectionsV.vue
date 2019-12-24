<template>
  <div>
    <!-- <span class="btn-hover-area" @click="back">
      <button class="back-btn">
        &laquo; Back
      </button>
    </span>-->
    <CustomButton style="font-size: 0.5em; padding-left: 1vw;" @customclick="back">
      &laquo; Back
    </CustomButton>

    <main>
      <div id="directions">
        <p
          v-for="(line, index) in directions"
          :key="index + ':::' + line"
          class="direction-line"
        >
          {{ line }}
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
import CustomButton from "../components/CustomButton.vue";
import walnut from "../walnut";

export default Vue.extend({
  components: {
    CustomButton,
  },
  props: {
    fromRoom: { type: String, default: "" },
    toRoom: { type: String, default: "" },
  },
  data() {
    return {};
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
});
</script>

<style scoped>
.direction-line {
  padding-top: 17px;
  padding-bottom: 15px;
  padding-left: 1vw;
  margin-top: 0;
  margin-bottom: 0;
}

.direction-line:nth-child(even) {
  padding-left: 1vw;
  background-color: rgb(221, 237, 241);
}
</style>
