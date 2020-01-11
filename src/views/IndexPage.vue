<template>
  <div>
    <div style="text-align:center">
      <TheMaybeInstallButton></TheMaybeInstallButton>

      <main>
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

          <CustomButton @customclick="submit">
            Go
          </CustomButton>
        </form>
      </main>
    </div>

    <TheIOSDownloadSuggestion />
  </div>
</template>

<script>
import Vue from "vue";
import CustomButton from "../components/CustomButton.vue";
import TheMaybeInstallButton from "../components/TheMaybeInstallButton.vue";
import RoomInput from "../components/RoomInput.vue";
import TheIOSDownloadSuggestion from "../components/TheIOSDownloadSuggestion.vue";
import walnut from "../walnut";

export default Vue.extend({
  components: {
    CustomButton,
    TheMaybeInstallButton,
    RoomInput,
    TheIOSDownloadSuggestion,
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
        walnut.isValidRoomName(this.fromRoom) &&
        walnut.isValidRoomName(this.toRoom)
      ) {
        this.$router.push({
          path: "/directions",
          query: { fromRoom: this.fromRoom, toRoom: this.toRoom },
        });
      }
    },
    validateInput(inputName, allowBlank = true) {
      let message = "";
      if (this[inputName] === "") {
        if (!allowBlank) message = "Please type a room number";
      } else if (!walnut.isValidRoomName(this[inputName])) {
        message = `I can't find a room with the name "${this[inputName]}"`;
      }
      document.getElementById(inputName).setCustomValidity(message);
      document.getElementById("roomForm").reportValidity();
    },
  },
  metaInfo: {
    title: "",
  },
});
</script>

<style scoped>
#roomForm {
  display: block;
}

.where-question {
  color: var(--main-text-color);
}

.label {
  display: block;
  color: var(--main-text-color);
}

.center {
  margin: auto;
  margin-bottom: 1em;
}
</style>
