<template>
  <label style="display: flex; flex-direction: row; align-items: center">
    <span class="switch" style="min-width: 24vh">
      <input v-model="accessibilityMode" type="checkbox" />
      <span class="slider" />
    </span>
    <span style="margin-left: 1vw"> Elevators Only* </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  compatConfig: { MODE: 3, INSTANCE_EVENT_HOOKS: true },
  computed: {
    accessibilityMode: {
      get(): boolean {
        // @ts-ignore TODO migrate
        return this.$store.state.isAccessibilityMode;
      },
      set(newVal: boolean) {
        // @ts-ignore TODO migrate
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
