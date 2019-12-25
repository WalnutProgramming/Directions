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
  color: green;
  border: none;
  height: 6vh;
  width: 6vh;
  font-size: 1em;

  background: rgba(120, 200, 120, 0);
  display: inline-block;
  border-radius: 7.5px;

  user-select: none;

  transition: var(--long-decay-ease);
}

.plus-button:hover {
  background: rgb(120, 200, 120, 1);
  color: white;
  transition: var(--long-decay-ease);
  cursor: pointer;
  border-radius: 25px;
}
</style>
