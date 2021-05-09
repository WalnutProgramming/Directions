<template>
  <div v-if="showiOSDownloadSuggestion" id="iosDownloadSuggestion">
    <p>
      To install this page as an app,
      {{ isSafari ? "" : "open this page in Safari, then " }}press
      <img
        src="@/assets/iosDownload.png"
        alt="iosDownload"
        style="
          width: 14px;
          height: 20px;
          margin-left: 0.25em;
          margin-right: 0.25em;
        "
      />
      in the bottom bar. Then, press "Add to Home Screen" in the menu that
      appears.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  compatConfig: { MODE: 3 },
  computed: {
    showiOSDownloadSuggestion() {
      // If it's an iOS device and we're not already in the PWA, unhide the #iosDownloadSuggestion
      const iOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const isInstalledPWA =
        "matchMedia" in window &&
        window.matchMedia("(display-mode: standalone)").matches;
      return iOS && !isInstalledPWA;
    },

    // non-Safari iOS browsers can't install PWAs
    isSafari() {
      // Given that we're on iOS:
      // non-Safari browsers seem to have, for example, "FxiOS/" or "CriOS/" or "OPiOS/" instead of "Version/"
      return navigator.userAgent.includes("Version/");
    },
  },
});
</script>

<style scoped>
#iosDownloadSuggestion {
  font-size: 17px;
  padding: 0 1rem;
  padding-bottom: 4rem;
}
</style>
