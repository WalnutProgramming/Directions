<template>
  <div>
    <div style="text-align:center">
      <MaybeInstallButton></MaybeInstallButton>

      <main>
        <h1>Where do you need to go?</h1>
        <form id="roomForm">
          <label for="fromRoom"> I'm at room: </label>
          <input
            id="fromRoom"
            class="roomInput"
            name="fromRoom"
            list="roomsList"
            placeholder="type or select"
            autocomplete="off"
            v-model="fromRoom"
            @change="validateInput('fromRoom')"
          />
          <label for="toRoom"> I'm going to room: </label>
          <input
            id="toRoom"
            class="roomInput"
            name="toRoom"
            list="roomsList"
            placeholder="type or select"
            autocomplete="off"
            v-model="toRoom"
            @change="validateInput('toRoom')"
          />
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

    <datalist id="roomsList">
      <option v-for="roomName in roomsList" :key="roomName">
        {{ roomName }}
      </option>
    </datalist>
  </div>
</template>

<script>
import Vue from "vue";
import Directions from "./DirectionsV";
import CustomButton from "./CustomButton";
import MaybeInstallButton from "./MaybeInstallButton";
import { hallways } from "./walnut";
import { getHallwayIndexAndIndex } from "./directions";

function isValid(name) {
  return typeof name === "string" && getHallwayIndexAndIndex(name) != null;
}

export default Vue.extend({
  data() {
    return {
      fromRoom: "",
      toRoom: "",
    };
  },
  computed: {
    roomsList() {
      return hallways
        .reduce((acc, h) => acc.concat(h.partList), [])
        .filter(a => a.name)
        .reduce((acc, r) => acc.concat(r.aliases).concat(r.name), [])
        .sort();
    },
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
  },
  methods: {
    submit() {
      this.validateInput("fromRoom", false);
      this.validateInput("toRoom", false);
      if (isValid(this.fromRoom) && isValid(this.toRoom)) {
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
      } else if (!isValid(this[inputName])) {
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

input {
  margin-bottom: 1em;
  font-size: 25px;
  text-align: center;
  border-radius: 10px;
  border-width: 0px;
  transition: var(--text-input-ease);
}

input:focus {
  background-color: var(--placeholder-color);
  transition: var(--text-input-ease);
}

input::placeholder {
  color: #c0c0c0;
  transition: var(--text-input-ease);
}

input:focus::placeholder {
  color: var(--placeholder-color);
  transition: var(--text-input-ease);
}

.center {
  margin: auto;
  margin-bottom: 1em;
}
</style>
