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
import { defineComponent, PropType } from "vue";
import CustomButton from "@/components/buttons/CustomButton.vue";

interface StoredRoom {
  value: string;
  originalIndex: number;
}

interface StoredRoomWithActualIndex extends StoredRoom {
  actualIndex: number;
}

function range(len: number) {
  return [...Array(len).keys()];
}

export default defineComponent({
  components: { CustomButton },
  props: {
    allRooms: { type: Array as PropType<StoredRoom[]>, required: true },
    order: {
      type: Array as PropType<number[] | null>,
      default: null,
    },
  },
  emits: ["go"],
  computed: {
    // migrate TODO: remove
    orderWithDefault(): any {
      return this.order ?? range(this.allRooms.length);
    },
    rooms(): StoredRoomWithActualIndex[] {
      return this.orderWithDefault.map((ind: number) => ({
        ...(this.allRooms[ind] ?? { value: "", originalIndex: 0 }),
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
