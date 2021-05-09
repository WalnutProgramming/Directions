<template>
  <span class="btn-hover-area" @click.stop.prevent="$emit('click')">
    <button :type="type" class="active-button" :style="buttonStyle">
      <slot></slot>
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  compatConfig: { MODE: 3, INSTANCE_EVENT_HOOKS: true },
  props: {
    type: { type: String, default: "submit" },
    buttonStyle: { type: String, default: "" },
  },
  emits: ["click"],
});
</script>

<style scoped>
.active-button {
  border: none;
  font-size: 1em;
  display: inline-block;
  user-select: none;
}
</style>
