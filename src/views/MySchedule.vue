<template>
  <div>
    <div style="padding-left: 2vw">
      <EditButton @click="edit()"> Edit Schedule </EditButton>

      <div class="lists">
        <div>
          <h2>Regular Schedule</h2>
          <ScheduleList
            v-if="rooms != null"
            data-testid="regular-schedule"
            :all-rooms="rooms"
            @go="go"
          />
        </div>
        <div>
          <h2>Block Day 1</h2>
          <ScheduleList
            v-if="rooms != null"
            :all-rooms="rooms"
            :order="mondayThursdayOrder"
            @go="go"
          />
        </div>
        <div>
          <h2>Block Day 2</h2>
          <ScheduleList
            v-if="rooms != null"
            :all-rooms="rooms"
            :order="tuesdayFridayOrder"
            @go="go"
          />
        </div>
      </div>
    </div>

    <teleport to="head">
      <title>Walnut.Direct - My Schedule</title>
      <meta
        name="description"
        content="Input your schedule into Walnut.Direct so we can give you customized directions between your classes in Walnut Hills High School."
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditButton from "@/components/buttons/EditButton.vue";
import ScheduleList from "@/components/ScheduleList.vue";

export default defineComponent({
  components: { EditButton, ScheduleList },
  data() {
    const stored = localStorage.getItem("myschedule");
    return {
      rooms: stored == null ? null : JSON.parse(stored).rooms,
    };
  },
  computed: {
    mondayThursdayOrder() {
      return [1, 3, 4, 6].map((n) => n - 1);
    },
    tuesdayFridayOrder() {
      return [2, 3, 5, 7].map((n) => n - 1);
    },
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
