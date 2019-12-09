<template>
  <div>
    <div style="text-align:center">
      <MaybeInstallButton></MaybeInstallButton>

      <main>
        <h1>Where do you need to go?</h1>
        <form id="roomForm">
          <label for="fromRoom"> I'm at room: </label>
          <RoomInput
            name="fromRoom"
            placeholder="type or select"
            v-model="fromRoom"
            @change="validateInput('fromRoom')"
          ></RoomInput>
          <label for="toRoom"> I'm going to room: </label>
          <RoomInput
            name="toRoom"
            placeholder="type or select"
            v-model="toRoom"
            @change="validateInput('toRoom')"
          ></RoomInput>
          <br />

          <CustomButton @customclick="submit">
            Go
          </CustomButton>
        </form>
      </main>
    </div>

    <div v-if="showiOSDownloadSuggestion" id="iosDownloadSuggestion">
      <p>
        To install this page as an app, press
        <img
          src="iosDownload.png"
          alt="iosDownload"
          style="width:14px;height:20px;margin-left:.25em;margin-right:.25em;"
        />
        at the bottom of the page and then press "Add to Home Screen" in the
        menu that appears.
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Directions from "./DirectionsV";
import CustomButton from "./CustomButton";
import MaybeInstallButton from "./MaybeInstallButton";
import RoomInput from "./RoomInput";
import walnut from "./walnut";

export default Vue.extend({
  data() {
    return {
      fromRoom: "",
      toRoom: "",
    };
  },
  computed: {
    showiOSDownloadSuggestion() {
      // If it's an iOS device and we're not already in the PWA, unhide the #iosDownloadSuggestion
      const iOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const isInstalledPWA = window.matchMedia("(display-mode: standalone)")
        .matches;
      return iOS && !isInstalledPWA;
    },
  },
  components: {
    Directions,
    CustomButton,
    MaybeInstallButton,
    RoomInput,
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
});
</script>

<style scoped>
#iosDownloadSuggestion {
  font-size: 15px;
}

form {
  display: block;
}

h1 {
  color: var(--main-text-color);
}

label {
  display: block;
  color: var(--main-text-color);
}

.center {
  margin: auto;
  margin-bottom: 1em;
}
</style>
