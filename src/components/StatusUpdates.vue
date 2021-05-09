<template>
  <div class="container">
    <details class="details">
      <summary>
        Walnut.Direct COVID-19 Updates
        <br />
        (click to expand/collapse)
      </summary>
      <p>
        Be sure to stay distanced, walk on the right side of the hallway, and
        follow all rules given by the administration for COVID-19 safety.
        <b>
          When our directions tell you to turn left out of a classroom, you may
          have to turn right out of the classroom, then make a U-turn at the end
          of the hallway.
        </b>
        Walnut.Direct takes the new one-way staircase rules into account when
        providing directions.
      </p>
      <p>
        Walnut.Direct does not currently include outdoor routes, but if you know
        how to get to a room by going outdoors, we recommend that.
      </p>
    </details>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  compatConfig: { MODE: 3 },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
}

.details {
  font-size: 16px;
  padding: 1rem 1rem;
  max-width: 70rem;
}

p {
  margin: 0.5rem;
}
</style>
