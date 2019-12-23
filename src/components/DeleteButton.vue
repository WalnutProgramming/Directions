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
  padding: 5px 15px;
  font-size: 1em;

  background-color: #fc3d03ef;
  display: inline-block;
  border-radius: 70px;

  margin-top: 0;
  margin-bottom: 1px;
  box-shadow: 0px 1px #007dc4, 0px 1px 0 1px rgb(209, 226, 228);
  /*** these 1px values need to be the same (see below with ***) */

  transition: var(--back-ease);

  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */
}

.btn-hover-area {
  display: inline-block;
  border-radius: 70px;
}

.btn-hover-area:hover button {
  margin-top: 1px;
  margin-bottom: 0px;
  box-shadow: 0px 0px #007dc4, 0px 0px 0 1px rgb(209, 226, 228);
  /*** these 1px values need to be the same (see above with ***) */

  transition: var(--sine-ease);

  cursor: pointer;
}
</style>
