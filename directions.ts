export { getHallwayIndexAndIndex, getDirections };

import { hallways, stairConnections, hallwayConnections } from "./walnut";
import { getGraph, getShortestPath } from "./Graph/graph";
// This JavaScript file adds the directions to
// the HTML file based on the query parameters
// given to directions.js

/**
 * @param name - The name of the room
 * @return An array, where the first element
 * is the index of the hallway where the room is located, and
 * the second element is the index of the room in the hallway. If
 * the room doesn't exist, `null` is returned.
 */
function getHallwayIndexAndIndex(name: string): [number, number] | null {
  const inds = hallways.map(h => h.getRoomInd(name));
  const hallwayInd = inds.findIndex(a => a !== -1);
  return hallwayInd === -1 ? null : [hallwayInd, inds[hallwayInd]];
}

/**
 * @param nodeId - The id of the node
 * @return An array, where the first element
 * is the index of the hallway where the node is located, and
 * the second element is the index of the node in the hallway
 */
function getHallwayIndexAndIndexFromNode(nodeId: string): [number, number] {
  const inds = hallways.map(h =>
    h.partList.findIndex(r => "nodeId" in r && r.nodeId === nodeId)
  );
  const hallwayInd = inds.findIndex(a => a !== -1);
  return [hallwayInd, inds[hallwayInd]];
}

const hallwayNodes: {
  nodeId: string;
  edgeLengthFromPreviousNodeInHallway: number;
}[][] = hallways.map(h => {
  return h.nodes;
});
const graph = getGraph(hallwayNodes, stairConnections, hallwayConnections);

/**
 *
 * @param id1
 * @param id2
 * @return Is the connection between these two nodes
 * a Stairs connection? (as opposed to a Fork)
 */
function isConnectionStairs(id1: string, id2: string): boolean {
  return (
    stairConnections.findIndex(arr => arr.includes(id1) && arr.includes(id2)) !=
    -1
  );
}

function getStairConnectionInstruction(
  id1: string,
  id2: string,
  numFlights: number
): string {
  const goingUp = stairConnections.find(
    arr =>
      arr.includes(id1) &&
      arr.includes(id2) &&
      arr.indexOf(id2) > arr.indexOf(id1)
  );
  const maybeS = numFlights > 1 ? "s" : "";
  return `Go ${
    goingUp ? "up" : "down"
  } ${numFlights} floor${maybeS} of stairs\n`;
}

function getHallwayConnectionInstruction(id2: string): string {
  const [hi2, i2] = getHallwayIndexAndIndexFromNode(id2);
  if (hallways[hi2].name) {
    return "Enter " + hallways[hi2].name + "\n";
  } else {
    return "";
  }
}

/**
 * @param {string} from - The name of the starting room
 * @param {string} to - The name of the destination room
 * @return {string} The directions to get from room `from` to room `to`
 */
function getDirections(from: string, to: string): string {
  // Find the indices of the hallways of the rooms
  // and the indices of the rooms in the hallways
  const [fromHallwayInd, fromInd] = getHallwayIndexAndIndex(from)!;
  const [toHallwayInd, toInd] = getHallwayIndexAndIndex(to)!;
  // Find IDs of the nodes (stairs or hallways) closest to these rooms
  const closestNodeFromInd = hallways[fromHallwayInd].idOfClosestNodeToIndex(
    fromInd
  );
  const closestNodeToInd = hallways[toHallwayInd].idOfClosestNodeToIndex(toInd);

  // Get the shortest path between the 2 nodes closest to the rooms
  const shortest = getShortestPath(graph, closestNodeFromInd, closestNodeToInd);
  let directions = "";
  let [currentHallwayInd, currentInd] = [fromHallwayInd, fromInd];
  // Loop through the shortest path to convert them to directions
  for (let i = 1; i < shortest.length; i++) {
    const id = shortest[i];
    const [hallwayInd, ind] = getHallwayIndexAndIndexFromNode(id);
    const [prevHallwayInd, prevInd] = getHallwayIndexAndIndexFromNode(
      shortest[i - 1]
    );
    if (
      isConnectionStairs(
        shortest[i - 1],
        shortest[i]
      ) /* going up or down stairs */
    ) {
      directions += hallways[currentHallwayInd].getDirectionsFromIndices(
        currentInd,
        prevInd
      );
      const numStairFlights = Math.ceil(graph[shortest[i - 1]][shortest[i]]);
      directions += getStairConnectionInstruction(
        shortest[i - 1],
        shortest[i],
        numStairFlights
      );
      [currentHallwayInd, currentInd] = getHallwayIndexAndIndexFromNode(
        shortest[i]
      );
    } else if (hallwayInd !== currentHallwayInd /* it's a fork */) {
      directions += hallways[currentHallwayInd].getDirectionsFromIndices(
        currentInd,
        prevInd
      );
      directions += getHallwayConnectionInstruction(shortest[i]);
      [currentHallwayInd, currentInd] = [hallwayInd, ind];
    }
  }
  directions += hallways[currentHallwayInd].getDirectionsFromIndices(
    currentInd,
    toInd
  );
  return directions;
}
