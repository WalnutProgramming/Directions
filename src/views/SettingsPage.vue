<template>
  <div>
    <div>
      <button @click="clearStorage">Clear localStorage</button>
    </div>

    <div>
      <button @click="reloadPage">Refresh page</button>
    </div>

    <div>
      <button @click="checkForUpdates">Check for updates</button>
    </div>

    <ThemeSlider /> <br /><br />
    <AccessibilitySlider /> (Currently does nothing) <br /><br />
    <RefreshButton @click="reloadPage" /> Refresh Page <br /><br />
    <CheckUpdatesButton @click="checkForUpdates" /> Check For Updates
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccessibilitySlider from "@/components/settings/AccessibilitySlider.vue";
import ThemeSlider from "@/components/settings/ThemeSlider.vue";
import RefreshButton from "@/components/settings/RefreshButton.vue";
import CheckUpdatesButton from "@/components/settings/CheckUpdatesButton.vue";

export default Vue.extend({
  components: {
    AccessibilitySlider,
    RefreshButton,
    CheckUpdatesButton,
    ThemeSlider,
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

<style scoped>
div {
  color: var(--par-text-color);
}
</style>
