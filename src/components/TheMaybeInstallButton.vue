<template>
  <CustomButton v-if="showButton" @click="install">
    Install as app
  </CustomButton>
</template>

<script lang="ts">
import Vue from "vue";
import CustomButton from "./buttons/CustomButton.vue";

export default Vue.extend({
  components: {
    CustomButton,
  },
  data() {
    return {
      showButton: false,
      deferredPrompt: undefined as any,
    };
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      this.showButton = true;
      this.deferredPrompt = e as any;
    });
  },
  methods: {
    install() {
      this.showButton = false;
      if (this.deferredPrompt !== undefined) this.deferredPrompt.prompt();
    },
  },
});
</script>
