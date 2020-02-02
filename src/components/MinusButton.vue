<template>
  <button
    :type="type"
    class="minus-button"
    @click.stop.prevent="$emit('customclick')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    type: { type: String, default: "submit" },
  },
});
</script>

<style scoped>
.minus-button {
  color: var(--button-text-color);
  border: none;
  height: 4.5vh;
  width: 4.5vh;
  font-size: 1em;

  padding-left: 0px; /* for some reason ios has uneven button spacing by default, so that needs to be corrected */
  padding-right: 0px;

  background: var(--minus-button-color);
  display: inline-block;
  border-radius: 15px;

  user-select: none;

  transition: var(--long-decay-ease);
}

.minus-button:hover {
  background: rgba(0, 0, 0, 0);
  color: var(--minus-button-color-hover);
  transition: var(--long-decay-ease);
  cursor: pointer;
  border-radius: 7.5px;
}
</style>
