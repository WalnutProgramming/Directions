<template>
  <button
    :type="type"
    class="plus-button"
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
.plus-button {
  color: var(--button-text-color);
  border: none;
  height: 6vh;
  width: 6vh;
  font-size: 1em;

  padding-left: 0px; /* for some reason ios has uneven button spacing by default, so that needs to be corrected */
  padding-right: 0px;

  background: rgb(120, 200, 120);
  display: inline-block;
  border-radius: 7.5px;

  user-select: none;

  transition: var(--long-decay-ease);
}

.plus-button:hover {
  background: rgb(93, 158, 93);
  color: var(--button-text-color);
  transition: var(--long-decay-ease);
  cursor: pointer;
  border-radius: 25px;
}
</style>
