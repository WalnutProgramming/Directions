<template>
  <div>
    <div class="button-container">
      <CustomButton class="button" @click="back"> &laquo; Back </CustomButton>
      <CustomButton v-if="canPrint" class="button" @click="print()">
        Print
      </CustomButton>
    </div>

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

<script lang="ts">
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import { Room } from "room-finder";
import CustomButton from "@/components/buttons/CustomButton.vue";
import { walnutNonAccessible } from "@/walnut";
import store from "@/store";

function fullNameOf(roomName: string) {
  const [hallwayInd, ind] = walnutNonAccessible.getHallwayIndexAndIndex(
    roomName
  )!;
  return (walnutNonAccessible.hallways[hallwayInd].partList[
    ind
  ] as Room<string>).fullName;
}

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
    isValid() {
      return (
        walnutNonAccessible.getHallwayIndexAndIndex(this.fromRoom) != null &&
        walnutNonAccessible.getHallwayIndexAndIndex(this.toRoom) != null
      );
    },
    directions() {
      if (this.isValid) {
        // Both have valid names, so put the directions in the HTML
        return store.getters.walnut
          .getDirections(this.fromRoom, this.toRoom)!
          .trim()
          .split("\n");
      }
      return ["Sorry, I couldn't find one of those rooms."];
    },
    canPrint() {
      return window.print;
    },
  },
  methods: {
    back() {
      if (this.$route.query.isFromSchedule === "true") {
        this.$router.push("/myschedule");
      } else {
        this.$router.push("/");
      }
    },
    print() {
      window.print();
    },
  },
  metaInfo() {
    const { fromRoom, toRoom, isValid } = this as any;
    return isValid
      ? {
          title: `${fromRoom} to ${toRoom}`,
          meta: [
            {
              vmid: "description",
              name: "description",
              content: `Directions from ${fullNameOf(fromRoom)} to ${fullNameOf(
                toRoom
              )} in Walnut Hills High School.`,
            },
          ],
        }
      : {};
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
  background-color: var(--alt-background-color);
  transition: background-color var(--linear-ease);
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 1rem;
}
.button-container .button {
  font-size: 0.5em;
  padding-left: 1vw;
}
</style>
