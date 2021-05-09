<template>
  <BasicButton type="button" class="minus" @click="$emit('click')">
    <slot />
  </BasicButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BasicButton from "./BasicButton.vue";

export default defineComponent({
  compatConfig: { MODE: 3, INSTANCE_EVENT_HOOKS: true },
  components: { BasicButton },
  emits: ["click"],
});
</script>

<style scoped>
.btn-hover-area ::v-deep(.active-button) {
  color: var(--button-text-color);
  height: 1.5em;
  width: 1.5em;

  padding-left: 0px; /* for some reason ios has uneven button spacing by default, so that needs to be corrected */
  padding-right: 0px;

  background: var(--minus-button-color);
  border-radius: 15px;

  transition: var(--long-decay-ease);

  display: flex;
  align-items: center;
  justify-content: center;

  /*outline: none;*/
}

.btn-hover-area ::v-deep(.active-button:hover) {
  cursor: pointer;
}

@media (hover: hover) {
  .btn-hover-area ::v-deep(.active-button:hover) {
    background: rgba(0, 0, 0, 0);
    color: var(--minus-button-color-hover);
    transition: var(--long-decay-ease);
    border-radius: 7.5px;
  }
}
</style>
