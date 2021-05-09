<template>
  <input
    :id="name"
    class="roomInput"
    :name="name"
    placeholder="type or select"
    autocomplete="off"
    :value="modelValue"
    list="roomsList"
    @input="$emit('update:modelValue', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // TODO compat
  compatConfig: {
    MODE: 3,
    INSTANCE_EVENT_HOOKS: true,
    COMPONENT_V_MODEL: false,
  },
  props: {
    modelValue: { type: String, required: true },
    name: { type: String, required: true },
  },
  emits: ["update:modelValue", "change"],
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
  color: var(--input-text-color);
  background-color: var(--input-background-color);
  transition: background-color var(--linear-ease);
}

.roomInput:focus {
  background-color: var(--input-selection-color);
  color: var(--input-selection-text-color);
  transition: background-color var(--linear-ease);
}

.roomInput::placeholder {
  color: var(--input-placeholder-text-color); /*#6e7f8d;*/
  transition: background-color var(--linear-ease);
}

.roomInput:focus::placeholder {
  color: var(--input-selection-color);
  transition: background-color var(--linear-ease);
}
</style>
