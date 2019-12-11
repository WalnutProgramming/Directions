<template>
  <CustomButton v-if="showButton" @customclick="install">
    Install as app
  </CustomButton>
</template>

<script lang="ts">
import Vue from "vue";
import CustomButton from "./CustomButton.vue";
import BeforeInstallPromptEvent from "./BeforeInstallPromptEvent";

export default Vue.extend({
  components: {
    CustomButton,
  },
  data() {
    return {
      showButton: false,
      deferredPrompt: undefined as BeforeInstallPromptEvent | undefined,
    };
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      this.showButton = true;
      this.deferredPrompt = e as BeforeInstallPromptEvent;
    });
  },
  methods: {
    install() {
      this.showButton = false;
      if (this.deferredPrompt != undefined) this.deferredPrompt.prompt();
    },
  },
});
</script>
