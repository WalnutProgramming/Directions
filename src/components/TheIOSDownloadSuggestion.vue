<template>
  <div v-if="showiOSDownloadSuggestion" id="iosDownloadSuggestion">
    <p>
      To install this page as an app, press
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
      at the bottom of the page and then press "Add to Home Screen" in the menu
      that appears.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
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
