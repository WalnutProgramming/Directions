<template>
  <label>
    <span class="switch">
      <input v-model="accessibilityMode" type="checkbox" />
      <span class="slider" />
    </span>
    Accessibility Mode*
  </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    accessibilityMode: {
      get() {
        return this.$store.state.isAccessibilityMode;
      },
      set(newVal) {
        this.$store.commit("setAccessibilityMode", newVal);
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
  background-color: #ccc;
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
  background: url("../../assets/accessibilityicongrayscale.svg");
}

input:checked + .slider {
  background-color: #03a1fc;
}

input:checked + .slider:before {
  background: url("../../assets/accessibilityicon.svg");
  transform: translateX(16.8vh);
}

.slider,
.slider:before {
  position: absolute;
  cursor: pointer;
  transition: var(--fast-middle-ease);
  border-radius: 3.6vh;
}

.slider:before,
input:checked + .slider:before {
  background-size: 75% 75%;
  background-position: 50%, 50%;
  background-repeat: no-repeat;
  background-color: white;
}
</style>
