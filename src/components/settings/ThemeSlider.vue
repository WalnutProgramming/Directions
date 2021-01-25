<template>
  <label style="display: flex; flex-direction: row; align-items: center">
    <span class="switch" style="min-width: 24vh">
      <input id="dark-setting" v-model="darkTheme" type="checkbox" />
      <span class="slider" />
    </span>
    <span style="margin-left: 1vw"> Dark Theme </span>
  </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    darkTheme: {
      get() {
        return this.$store.state.isDarkMode;
      },
      set(newVal) {
        this.$store.commit("setDarkTheme", newVal);
      },
    },
  },
});
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 24vh;
  height: 7.2vh;
  vertical-align: middle;
}

/* The slider */
.slider {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: url("../../assets/cityscape.svg");
  background-size: 100%;
}

/* hide default */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider:before {
  height: 6vh;
  width: 6vh;
  left: 0.6vh;
  top: 0.6vh;

  content: "";
  background: url("../../assets/sun.svg");
}

.slider,
.slider:before {
  position: absolute;
  cursor: pointer;
  transition: all var(--fast-middle-ease);
  border-radius: 3.6vh;
}

input:checked + .slider {
  background-position-y: 99%;
}

input:checked + .slider:before {
  background: url("../../assets/moon.svg");
  transform: translateX(16.8vh);
}
</style>
