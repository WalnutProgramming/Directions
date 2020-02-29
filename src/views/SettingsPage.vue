<template>
  <div>
    <div>
      <label for="dark-setting">Use Dark Mode</label>
      <input id="dark-setting" v-model="darkTheme" type="checkbox" />
    </div>

    <div>
      <button @click="clearStorage">Clear localStorage</button>
    </div>

    <div>
      <button @click="reloadPage">Refresh page</button>
    </div>

    <div>
      <button @click="checkForUpdates">Check for updates</button>
    </div>

    <RefreshButton /> <br />
    <AccessibilitySlider /> <br />
    <CheckUpdatesButton />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccessibilitySlider from "@/components/settings/AccessibilitySlider.vue";
import RefreshButton from "@/components/settings/RefreshButton.vue";
import CheckUpdatesButton from "@/components/settings/CheckUpdatesButton.vue";

export default Vue.extend({
  components: {
    AccessibilitySlider,
    RefreshButton,
    CheckUpdatesButton,
  },
  computed: {
    darkTheme: {
      get() {
        return this.$store.state.isDarkMode;
      },
      set(newVal) {
        this.$store.commit("setDarkTheme", newVal);
      },
    },
  },
  methods: {
    clearStorage() {
      localStorage.clear();
      this.reloadPage();
    },
    reloadPage() {
      window.location.reload();
    },
    checkForUpdates() {
      document.dispatchEvent(new Event("check-for-updates"));
    },
  },
});
</script>
