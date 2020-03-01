<template>
  <div style="text-align:center">
    <br />
    <ThemeSlider /> Toggle Theme <br /><br />
    <AccessibilitySlider /> Accessibility Mode* <br /><br />
    <RefreshButton /> Refresh App <br /><br />
    <CheckUpdatesButton /> Check For Updates <br /><br />
    <div>
      <button @click="clearStorage">Clear localStorage</button>
    </div>
    <br /><br /><br />
    <div style="font-size: 0.5em;">
      * does not change directions yet
    </div>
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
      window.location.reload();
    },
  },
});
</script>

<style scoped>
div {
  color: var(--par-text-color);
}
</style>
