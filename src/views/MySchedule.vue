<template>
  <div>
    <div style="padding-left: 2vw">
      <EditButton @click="edit()"> Edit Schedule </EditButton>

      <div class="lists">
        <div style="padding-top: 1rem">
          <ScheduleList
            v-if="rooms != null"
            data-testid="regular-schedule"
            :all-rooms="rooms"
            @go="go"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditButton from "@/components/buttons/EditButton.vue";
import ScheduleList from "@/components/ScheduleList.vue";

export default Vue.extend({
  components: { EditButton, ScheduleList },
  data() {
    const stored = localStorage.getItem("myschedule");
    return {
      rooms: stored == null ? null : JSON.parse(stored).rooms,
    };
  },
  created() {
    if (localStorage.getItem("myschedule") == null) {
      this.$router.replace("/myschedule/edit?new=true");
    }
  },
  methods: {
    go({ fromRoom, toRoom }: { fromRoom: string; toRoom: string }) {
      this.$router.push({
        path: "/directions",
        query: {
          fromRoom,
          toRoom,
          isFromSchedule: "true",
        },
      });
    },
    edit() {
      this.$router.push({
        path: "/myschedule/edit",
      });
    },
  },
  metaInfo: {
    title: "My Schedule",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Input your schedule into Walnut.Direct so we can give you customized directions between your classes in Walnut Hills High School.",
      },
    ],
  },
});
</script>

<style scoped>
h2 {
  color: var(--subheading-text-color);
}

.lists {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 1200px) {
  .lists {
    flex-direction: row;
  }
  .lists > * {
    padding: 1rem 3rem;
  }
}

h2 {
  font-size: 35px;
}
</style>
