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
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: var(--fast-middle-ease);
  border-radius: 3.6vh;
}

/* hide default */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider:before {
  position: absolute;
  content: "";
  height: 6vh;
  width: 6vh;
  background: url("../../assets/accessibilityicon.svg");
  background-size: 75% 75%;
  background-position: 50%, 50%;
  background-repeat: no-repeat;
  left: 0.6vh;
  top: 0.6vh;
  background-color: white;
  transition: var(--fast-middle-ease);
  filter: grayscale(100%) brightness(150%);
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #03a1fc;
}

input:focus + .slider {
  box-shadow: 0 0 1px #03a1fc;
}

input:checked + .slider:before {
  transform: translateX(16.8vh);
  filter: grayscale(0%) brightness(100%);
}
</style>
