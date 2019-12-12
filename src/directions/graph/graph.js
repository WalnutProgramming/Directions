// @ts-check

"use strict";
import dijkstra from "dijkstrajs";

export { getGraph, getShortestPath };

/**
 *
 * @param {{nodeId: string, edgeLengthFromPreviousNodeInHallway: number}[][]} hallConnectors an array of each hallway's array of nodes
 * @param {string[][]} stairConnections an array of stairs, where each stair has
 * a list of nodes going from the top to the bottom
 * @param {[string, string][]} hallwayConnections an array of the pairs of connected hallway nodes
 * @return {*} The graph to be used by getShortestPath
 */
function getGraph(hallConnectors, stairConnections, hallwayConnections) {
  /** @type {{[key: string]: {[key: string]: number}}} */
  const graph = {};
  hallConnectors.forEach(hall => {
    return hall.forEach((node, ind) => {
      const id = node.nodeId;
      /** @type {{[key: string]: number}} */
      const edgesTo = {};
      if (ind != 0) {
        edgesTo[hall[ind - 1].nodeId] =
          hall[ind].edgeLengthFromPreviousNodeInHallway;
      }
      if (ind != hall.length - 1) {
        edgesTo[hall[ind + 1].nodeId] =
          hall[ind + 1].edgeLengthFromPreviousNodeInHallway;
      }
      stairConnections.forEach(stairList => {
        const myFloorNum = stairList.indexOf(id);
        if (myFloorNum != -1) {
          stairList.forEach((otherId, otherFloorNum) => {
            if (otherId != id) {
              const diff = Math.abs(myFloorNum - otherFloorNum);
              // We set the weight to slightly less than the number
              // of staircases we're going up because it's easier to go
              // up multiple stairs at once than to go up one flight, then
              // go to another set of stairs
              edgesTo[otherId] = diff * (1 - 0.001 * diff);
            }
          });
        }
      });
      hallwayConnections.forEach(([bottom, top]) => {
        if (bottom === id) {
          edgesTo[top] = 1;
        } else if (top === id) {
          edgesTo[bottom] = 1;
        }
      });
      graph[id] = edgesTo;
    });
  });
  return graph;
}

function getShortestPath(graph, idFrom, idTo) {
  return dijkstra.find_path(graph, idFrom, idTo);
}
