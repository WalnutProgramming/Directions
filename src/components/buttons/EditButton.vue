<template>
  <BasicButton class="edit" @click="$emit('click')"> <slot /> </BasicButton>
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
  padding: 8px 25px;

  background-color: var(--edit-button-color);
  border-radius: 100px;

  margin-top: 0;
  margin-bottom: 6px;
  box-shadow: 0px 6px var(--edit-button-shade-color),
    0px 6px 0 6px var(--edit-button-hold-color);
  /*** these 6px values need to be the same (see below with ***) */

  transition: var(--back-ease);
}

.btn-hover-area {
  display: inline-block;
  border-radius: 100px;
}

.btn-hover-area:hover >>> .active-button {
  margin-top: 6px;
  margin-bottom: 0px;
  box-shadow: 0px 0px var(--edit-button-shade-color),
    0px 0px 0 6px var(--edit-button-hold-color);
  /*** these 6px values need to be the same (see above with ***) */

  transition: var(--sine-ease);

  cursor: pointer;
}
</style>
