<template>
  <span class="btn-hover-area" @click.stop.prevent="$emit('customclick')">
    <button :type="type" class="active-button">
      <slot></slot>
    </button>
  </span>
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
.active-button {
  color: white;
  border: none;
  padding: 12px 40px;
  font-size: 1em;

  background-color: #03a1fc;
  display: inline-block;
  border-radius: 100px;

  margin-top: 0;
  margin-bottom: 6px;
  box-shadow: 0px 6px #007dc4, 0px 6px 0 6px rgb(209, 226, 228);
  /*** these 6px values need to be the same (see below with ***) */

  transition: var(--back-ease);

  user-select: none;
}

.btn-hover-area {
  display: inline-block;
  border-radius: 100px;
}

.btn-hover-area:hover button {
  margin-top: 6px;
  margin-bottom: 0px;
  box-shadow: 0px 0px #007dc4, 0px 0px 0 6px rgb(209, 226, 228);
  /*** these 6px values need to be the same (see above with ***) */

  transition: var(--sine-ease);

  cursor: pointer;
}
</style>
