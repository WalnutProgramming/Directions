<template>
  <ol style="margin-block-start: 0em">
    <div v-for="(room, index) in rooms" :key="index">
      <li :value="room.actualIndex + 1" style="padding: 0.5vh">
        {{ room.value }}
      </li>
      <CustomButton
        v-if="
          index != rooms.length - 1 &&
          room.value.trim() !== '' &&
          rooms[index + 1].value.trim() !== ''
        "
        style="
          font-size: 0.7em;
          margin-left: -1.5em;
          margin-top: 0.1em;
          margin-bottom: 0.3em;
          padding-left: 2vw;
        "
        @click="go(index)"
      >
        ↓ Go from {{ rooms[index].value }} to {{ rooms[index + 1].value }} ↓
      </CustomButton>
    </div>
  </ol>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from "vue";
import CustomButton from "@/components/buttons/CustomButton.vue";

interface StoredRoom {
  value: string;
  originalIndex: number;
}

interface StoredRoomWithActualIndex extends StoredRoom {
  actualIndex: number;
}

export default Vue.extend({
  components: { CustomButton },
  props: {
    allRooms: { type: Array as PropType<StoredRoom[]>, required: true },
    order: {
      type: Array as PropType<number[]>,
      default: () => [0, 1, 2, 3, 4, 5, 6],
    },
  },
  computed: {
    rooms(): StoredRoomWithActualIndex[] {
      return this.order.map((ind) => ({
        ...this.allRooms[ind],
        actualIndex: ind,
      }));
    },
  },
  methods: {
    go(index: number) {
      this.$emit("go", {
        fromRoom: this.rooms[index].value,
        toRoom: this.rooms[index + 1].value,
      });
    },
  },
});
</script>

<style scoped>
li {
  color: var(--less-important-text-color);
}
</style>
