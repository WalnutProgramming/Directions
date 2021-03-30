<template>
  <BasicButton type="button" class="plus" @click="$emit('click')">
    <slot />
  </BasicButton>
</template>

<script lang="ts">
import Vue from "vue";
import BasicButton from "./BasicButton.vue";

export default Vue.extend({
  components: { BasicButton },
});
</script>

<style scoped>
.btn-hover-area >>> .active-button {
  color: var(--button-text-color);
  height: 6vh;
  width: 6vh;

  padding-left: 0px; /* for some reason ios has uneven button spacing by default, so that needs to be corrected */
  padding-right: 0px;

  background: var(--plus-button-color);
  border-radius: 7.5px;

  transition: var(--long-decay-ease);
}

.btn-hover-area >>> .active-button:hover {
  cursor: pointer;
}

@media (hover: hover) {
  .btn-hover-area >>> .active-button:hover {
    background-color: var(--plus-button-hover-color);
    color: var(--button-text-color);
    transition: var(--long-decay-ease);
    border-radius: 25px;
  }
}
</style>
