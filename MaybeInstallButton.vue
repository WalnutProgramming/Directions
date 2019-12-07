<template>
  <CustomButton v-if="showButton" @customclick="install">
    Install as app
  </CustomButton>
</template>

<script>
import Vue from "vue";
import CustomButton from "./CustomButton";

export default Vue.extend({
  data() {
    return {
      showButton: false,
      deferredPrompt: undefined,
    };
  },
  components: {
    CustomButton,
  },
  methods: {
    install() {
      this.showButton = false;
      this.deferredPrompt.prompt();
    },
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      this.showButton = true;
      this.deferredPrompt = e;
    });
  },
});
</script>
