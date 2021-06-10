<template>
  <span class="btn-hover-area">
    <button
      :type="type"
      class="active-button"
      :style="buttonStyle"
      v-bind="$attrs"
    >
      <slot></slot>
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inheritAttrs: false,
  props: {
    type: { type: String, default: "submit" },
    buttonStyle: { type: String, default: "" },
  },
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
