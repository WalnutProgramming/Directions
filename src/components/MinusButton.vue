<template>
  <button :type="type" class="minus-button" @click.stop.prevent="$emit('customclick')">
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
  color: white;
  border: none;
  height: 4.5vh;
  width: 4.5vh;
  font-size: 1em;

  background: rgba(255, 120, 120, 1);
  display: inline-block;
  border-radius: 15px;

  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */

  transition: var(--long-decay-ease);
}

.minus-button:hover {
  background: rgb(255, 120, 120, 0);
  color: red;
  transition: var(--long-decay-ease);
  cursor: pointer;
  border-radius: 7.5px;
}
</style>