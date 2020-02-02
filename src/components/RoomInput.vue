<template>
  <input
    :id="name"
    class="roomInput"
    :name="name"
    placeholder="type or select"
    autocomplete="off"
    :value="value"
    list="roomsList"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    name: { type: String, required: true },
  },
  data() {
    return { value: "" };
  },
});
</script>

<style scoped>
.roomInput {
  margin-bottom: 1em;
  font-size: 25px;
  text-align: center;
  border-radius: 10px;
  border-width: 0px;
  background-color: #f5f8fa;
  transition: var(--text-input-ease);
}

.roomInput:focus {
  background-color: var(--input-selection-color);
  transition: var(--text-input-ease);
}

.roomInput::placeholder {
  color: var(--input-placeholder-text-color); /*#6e7f8d;*/
  transition: var(--text-input-ease);
}

.roomInput:focus::placeholder {
  color: var(--input-selection-color);
  transition: var(--text-input-ease);
}
</style>
