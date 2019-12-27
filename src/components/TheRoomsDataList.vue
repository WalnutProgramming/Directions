<template>
  <datalist id="roomsList">
    <option v-for="roomName in roomsList" :key="roomName">
      {{ roomName }}
    </option>
  </datalist>
</template>

<script lang="ts">
import Vue from "vue";
import walnut from "../walnut";

const { roomsList } = walnut;

export default Vue.extend({
  computed: {
    roomsList: () => roomsList,
  },
});
</script>
