<template>
  <div style="width: 96vw; left: 2vw; top: 2vw">
    <AccessibilitySlider /> <br /><br />
    <ThemeSlider /> <br /><br />
    <CheckUpdatesButton /> <br /><br />
    <RefreshButton /> <br /><br />
    <DeleteDataButton />

    <br /><br /><br />
    <div style="font-size: 0.5em">
      * We don't currently know a way to get to the 3500s without using stairs.
      If you know of a way, please tell us on the Feedback page.
    </div>
    <div style="font-size: 0.5em; margin-top: 1rem">
      The trash icon is provided by
      <a href="https://heroicons.com/">Heroicons</a> under the
      <a href="https://github.com/tailwindlabs/heroicons/blob/master/LICENSE"
        >MIT License</a
      >.
    </div>

    <teleport to="head">
      <title>Walnut.Direct - Settings</title>
      <meta
        name="description"
        content="Straightforward directions between rooms in Walnut Hills High School. Created by the Walnut Hills Programming Club."
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AccessibilitySlider from "@/components/settings/AccessibilitySlider.vue";
import ThemeSlider from "@/components/settings/ThemeSlider.vue";
import RefreshButton from "@/components/settings/RefreshButton.vue";
import CheckUpdatesButton from "@/components/settings/CheckUpdatesButton.vue";
import DeleteDataButton from "@/components/settings/DeleteDataButton.vue";

export default defineComponent({
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
