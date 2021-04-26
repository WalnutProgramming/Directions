<template>
  <div>
    <p style="font-size: 0.5em">
      This is the graph/network used to calculate directions in Walnut.Direct
      using Dijkstra's algorithm. It'll take a minute to load. Scroll to zoom.
    </p>
    <div id="mynetwork" ref="mynetwork">Loading...</div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import { Network } from "vis-network/standalone";
import { walnutNonAccessible as walnut } from "@/walnut";

function nodeName(node: string) {
  const [kind, name, thing] = node.split("-$-");
  switch (kind) {
    case "BasicRoomNode":
      return name;
    case "StairNode":
      return `${name}, floor ${thing}`;
    case "ForkNode":
      return thing === "true" ? `${name}, reversed` : name;
    default:
      return `${name}, ${thing}`;
  }
}

export default Vue.extend({
  mounted() {
    const { graph } = walnut;

    const n = [];
    const e: any[] = [];
    for (const node in graph) {
      console.log(node);
      n.push({ id: n.length, label: nodeName(node) });
    }
    for (const node in graph) {
      for (const node2 in graph[node]) {
        if (
          e.filter(
            ({ from, to }) =>
              from === Object.keys(graph).indexOf(node2) &&
              to === Object.keys(graph).indexOf(node)
          ).length === 0
        )
          e.push({
            from: Object.keys(graph).indexOf(node),
            to: Object.keys(graph).indexOf(node2),
          });
      }
    }
    console.log({ n, e });

    // create a network
    const container = this.$refs.mynetwork as any;
    const data = {
      nodes: n,
      edges: e,
    };
    const options = {
      layout: { improvedLayout: false },
    };
    new Network(container, data, options);
  },
});
</script>

<style scoped>
#mynetwork {
  /* width: 100%; */
  height: 80vh;
  border: 1px solid lightgray;
}
</style>
