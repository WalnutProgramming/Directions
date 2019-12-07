type Graph = any;

export function getGraph(
  hallConnectors: {
    nodeId: string;
    edgeLengthFromPreviousNodeInHallway: number;
  }[][],
  stairConnections: string[][],
  hallwayConnections: [string, string][]
): Graph;

export function getShortestPath(
  graph: Graph,
  idFrom: string,
  idTo: string
): string[];
