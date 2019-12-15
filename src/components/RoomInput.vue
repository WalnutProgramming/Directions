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
input {
  margin-bottom: 1em;
  font-size: 25px;
  text-align: center;
  border-radius: 10px;
  border-width: 0px;
  transition: var(--text-input-ease);
}

input:focus {
  background-color: var(--placeholder-color);
  transition: var(--text-input-ease);
}

input::placeholder {
  color: #c0c0c0;
  transition: var(--text-input-ease);
}

input:focus::placeholder {
  color: var(--placeholder-color);
  transition: var(--text-input-ease);
}
</style>
