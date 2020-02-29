<template>
  <label class="switch">
    <input type="checkbox" />
    <span class="slider" />
  </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  /* should include:
    getting the state of the slider
    putting the slider in the right state when the user loads the page
  */
  props: {},
});
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 24vh;
  height: 7.2vh;
}

/* The slider */
.slider {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: url("../../assets/cityscape.svg");
  background-repeat: inherit;
  background-size: cover;
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
  background-size: 100% 100%;
  background-color: white;
}

.slider,
.slider:before {
  position: absolute;
  cursor: pointer;
  transition: var(--fast-middle-ease);
  border-radius: 3.6vh;
}

input:checked + .slider {
  background-position-y: 99%;
}

input:checked + .slider:before {
  transform: translateX(16.8vh);
  background: url("../../assets/moon.svg");
}
</style>
