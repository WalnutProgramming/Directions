<template>
  <div>
    <div class="button-container">
      <CustomButton class="button" @click="back"> &laquo; Back </CustomButton>
      <CustomButton v-if="canPrint" class="button" @click="print">
        Print
      </CustomButton>
    </div>

    <main>
      <div id="directions">
        <p
          v-if="needsPrecaution(directionsString)"
          class="precaution direction-line"
        >
          *<b>Note:</b> Based on COVID precautions, when our directions tell you
          to turn <b>left</b> out of a room, you should instead turn
          <b>right</b> out of the room, then make a U-turn at the end of the
          hallway.<br />
          Similarly, when the directions tell you to turn <b>left</b> &#32;
          <i>into</i> a room, you should walk to the end of the hallway and make
          a U-turn so you can come back and turn <b>right</b> into the room.
        </p>
        <p
          v-for="(line, index) in directionsLines"
          :key="index + ':::' + line"
          class="direction-line"
        >
          {{ line }}{{ needsPrecaution(line) ? "*" : "" }}
        </p>
      </div>
    </main>

    <teleport to="head">
      <title>Walnut.Direct - {{ fromRoom }} to {{ toRoom }}</title>
      <meta
        name="description"
        :content="`Directions from ${fullNameOf(fromRoom)} to ${fullNameOf(
          toRoom
        )} in Walnut Hills High School.`"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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

export default defineComponent({
  components: {
    CustomButton,
  },
  props: {
    fromRoom: { type: String, default: "" },
    toRoom: { type: String, default: "" },
  },
  setup() {
    return { fullNameOf };
  },

  data() {
    return {};
  },
  computed: {
    isValid(): boolean {
      return (
        walnutNonAccessible.getHallwayIndexAndIndex(this.fromRoom) != null &&
        walnutNonAccessible.getHallwayIndexAndIndex(this.toRoom) != null
      );
    },
    directionsString(): string {
      if (this.isValid) {
        // Both have valid names, so put the directions in the HTML
        return store.getters.walnut
          .getDirections(this.fromRoom, this.toRoom)!
          .trim();
      }
      return "Sorry, I couldn't find one of those rooms.";
    },
    directionsLines(): string[] {
      return this.directionsString.split("\n");
    },
    canPrint() {
      return window.print;
    },
  },
  methods: {
    needsPrecaution(directions: string): boolean {
      const lowercase = directions.toLowerCase();
      return (
        lowercase.includes("turn left out of") ||
        lowercase.includes("turn left into")
      );
    },
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
.button-container > * {
  font-size: 0.5em;
  padding-left: 1vw;
}

.precaution {
  font-size: 0.6em;
}
</style>
