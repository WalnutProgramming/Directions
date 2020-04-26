<template>
  <div style="width: 96vw; left: 2vw; top: 2vw;">
    <ThemeSlider /> <br /><br />
    <AccessibilitySlider /> <br /><br />
    <RefreshButton /> <br /><br />
    <CheckUpdatesButton /> <br /><br />
    <DeleteDataButton />

    <br /><br /><br />
    <div style="font-size: 0.5em;">
      * We don't currently know a way to get to the 3500s without using stairs.
      If you know of a way, please tell us on the Feedback page.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccessibilitySlider from "@/components/settings/AccessibilitySlider.vue";
import ThemeSlider from "@/components/settings/ThemeSlider.vue";
import RefreshButton from "@/components/settings/RefreshButton.vue";
import CheckUpdatesButton from "@/components/settings/CheckUpdatesButton.vue";
import DeleteDataButton from "@/components/settings/DeleteDataButton.vue";

export default Vue.extend({
  components: {
    AccessibilitySlider,
    RefreshButton,
    CheckUpdatesButton,
    ThemeSlider,
    DeleteDataButton,
  },
});
</script>

<style scoped>
div {
  color: var(--par-text-color);
}
</style>
