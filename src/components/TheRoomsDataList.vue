<template>
  <datalist id="roomsList">
    <option v-for="roomName in roomsList" :key="roomName">
      {{ roomName }}
    </option>
  </datalist>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { walnutNonAccessible } from "@/walnut";

const { roomsList } = walnutNonAccessible;

export default defineComponent({
  compatConfig: { MODE: 3 },
  computed: {
    roomsList: () => roomsList,
  },
});
</script>
