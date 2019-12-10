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
  data() {
    return {
      showButton: false,
      deferredPrompt: undefined as BeforeInstallPromptEvent | undefined,
    };
  },
  components: {
    CustomButton,
  },
  methods: {
    install() {
      this.showButton = false;
      if (this.deferredPrompt != undefined) this.deferredPrompt.prompt();
    },
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      this.showButton = true;
      this.deferredPrompt = e as BeforeInstallPromptEvent;
    });
  },
});
</script>
