<template>
  <div style="padding-bottom: 2rem">
    <div style="text-align: center">
      <TheMaybeInstallButton></TheMaybeInstallButton>

      <main>
        <!-- <StatusUpdates /> -->

        <h1 class="where-question">Where do you need to go?</h1>
        <form id="roomForm">
          <label for="fromRoom" class="label"> I'm at room: </label>
          <RoomInput
            v-model="fromRoom"
            name="fromRoom"
            placeholder="type or select"
            @change="validateInput('fromRoom')"
          ></RoomInput>
          <label for="toRoom" class="label"> I'm going to room: </label>
          <RoomInput
            v-model="toRoom"
            name="toRoom"
            placeholder="type or select"
            @change="validateInput('toRoom')"
          ></RoomInput>
          <br />

          <CustomButton @click="submit"> Go </CustomButton>
        </form>
      </main>
    </div>

    <TheIOSDownloadSuggestion />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import TheMaybeInstallButton from "@/components/TheMaybeInstallButton.vue";
import RoomInput from "@/components/RoomInput.vue";
import TheIOSDownloadSuggestion from "@/components/TheIOSDownloadSuggestion.vue";
import StatusUpdates from "@/components/StatusUpdates.vue";
import { walnutNonAccessible } from "@/walnut";

export default Vue.extend({
  components: {
    CustomButton,
    TheMaybeInstallButton,
    RoomInput,
    TheIOSDownloadSuggestion,
    // StatusUpdates,
  },
  data() {
    return {
      fromRoom: "",
      toRoom: "",
    };
  },
  methods: {
    submit() {
      this.validateInput("fromRoom", false);
      this.validateInput("toRoom", false);
      if (
        walnutNonAccessible.isValidRoomName(this.fromRoom) &&
        walnutNonAccessible.isValidRoomName(this.toRoom)
      ) {
        this.$router.push({
          path: "/directions",
          query: { fromRoom: this.fromRoom, toRoom: this.toRoom },
        });
      }
    },
    validateInput(inputName: string, allowBlank = true) {
      let message = "";
      const val: string = (this as any)[inputName];
      if (val === "") {
        if (!allowBlank) message = "Please type a room number";
      } else if (!walnutNonAccessible.isValidRoomName(val)) {
        message = `I can't find a room with the name "${val}"`;
      }
      const inp = document.getElementById(inputName);
      if (inp != null && "setCustomValidity" in inp /* browser support */) {
        (inp as any).setCustomValidity(message);
      }
      const form = document.getElementById("roomForm");
      if (form != null && "reportValidity" in form /* browser support */) {
        (form as any).reportValidity();
      }
    },
  },
});
</script>

<style scoped>
#roomForm {
  display: block;
}

.where-question {
  color: var(--heading-text-color);
}

.label {
  display: block;
  color: var(--subheading-text-color);
}

.center {
  margin: auto;
  margin-bottom: 1em;
}
</style>
