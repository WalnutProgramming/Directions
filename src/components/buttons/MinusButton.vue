<template>
  <BasicButton type="button" class="minus" @click="$emit('click')">
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
  height: 4.5vh;
  width: 4.5vh;

  padding-left: 0px; /* for some reason ios has uneven button spacing by default, so that needs to be corrected */
  padding-right: 0px;

  background: var(--minus-button-color);
  border-radius: 15px;

  transition: var(--long-decay-ease);
}

.btn-hover-area >>> .active-button:hover {
  cursor: pointer;
}

@media (hover: hover) {
  .btn-hover-area >>> .active-button:hover {
    background: rgba(0, 0, 0, 0);
    color: var(--minus-button-color-hover);
    transition: var(--long-decay-ease);
    border-radius: 7.5px;
  }
}
</style>
