<template>
  <div>
    <ol>
      <div v-for="(room, index) in rooms" :key="index">
        <li>
          {{ room.value }}
        </li>
        <CustomButton
          v-if="
            index != rooms.length - 1 &&
              room.value.trim() !== '' &&
              rooms[index + 1].value.trim() !== ''
          "
          style="font-size: .7em; margin-left: -1.5em; margin-top: .1em; margin-bottom: .3em"
          @customclick="go(index)"
        >
          ↓ Go from {{ rooms[index].value }} to {{ rooms[index + 1].value }} ↓
        </CustomButton>
      </div>
    </ol>
    <router-link to="/myschedule/edit">Edit</router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CustomButton from "../components/CustomButton.vue";

export default Vue.extend({
  components: { CustomButton },
  data() {
    const stored = localStorage.getItem("myschedule");
    return {
      rooms: stored == null ? [] : JSON.parse(stored).rooms,
    };
  },
  created() {
    if (localStorage.getItem("myschedule") == null) {
      this.$router.replace("/myschedule/edit?new=true");
    }
  },
  methods: {
    go(index: number) {
      this.$router.push({
        path: "/directions",
        query: {
          fromRoom: this.rooms[index].value,
          toRoom: this.rooms[index + 1].value,
          scheduleInd: index.toString(),
        },
      });
    },
  },
});
</script>
