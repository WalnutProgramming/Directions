import { Room, Hallway } from "./hallwayDefinition";
import { getGraph, getShortestPath } from "./Graph/graph";

export default class Building {
  readonly hallwayNodes: {
    nodeId: string;
    edgeLengthFromPreviousNodeInHallway: number;
  }[][];
  readonly graph: any;
  readonly roomsList: string[];

  constructor(
    readonly hallways: Hallway[],
    readonly hallwayConnections: [string, string][] = [],
    readonly stairConnections: string[][] = []
  ) {
    this.hallwayNodes = this.hallways.map(h => {
      return h.nodes;
    });
    this.graph = getGraph(
      this.hallwayNodes,
      stairConnections,
      hallwayConnections
    );
    this.roomsList = hallways
      .flatMap(h => h.partList)
      .filter(a => "name" in a && a.name != null)
      .flatMap(r => (r as Room).name!)
      .sort();
  }

  /**
   * @param name - The name of the room
   * @return An array, where the first element
   * is the index of the hallway where the room is located, and
   * the second element is the index of the room in the hallway. If
   * the room doesn't exist, `null` is returned.
   */
  public getHallwayIndexAndIndex(name: string): [number, number] | null {
    const inds = this.hallways.map(h => h.getRoomInd(name));
    const hallwayInd = inds.findIndex(a => a !== -1);
    return hallwayInd === -1 ? null : [hallwayInd, inds[hallwayInd]];
  }

  /**
   * @param nodeId - The id of the node
   * @return An array, where the first element
   * is the index of the hallway where the node is located, and
   * the second element is the index of the node in the hallway
   */
  protected getHallwayIndexAndIndexFromNode(nodeId: string): [number, number] {
    const inds = this.hallways.map(h =>
      h.partList.findIndex(r => "nodeId" in r && r.nodeId === nodeId)
    );
    const hallwayInd = inds.findIndex(a => a !== -1);
    return [hallwayInd, inds[hallwayInd]];
  }

  /**
   *
   * @param id1
   * @param id2
   * @return Is the connection between these two nodes
   * a Stairs connection? (as opposed to a Fork)
   */
  protected isConnectionStairs(id1: string, id2: string): boolean {
    return (
      this.stairConnections.findIndex(
        arr => arr.includes(id1) && arr.includes(id2)
      ) != -1
    );
  }

  protected getStairConnectionInstruction(
    id1: string,
    id2: string,
    numFlights: number
  ): string {
    const goingUp = this.stairConnections.find(
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

  protected getHallwayConnectionInstruction(id2: string): string {
    const [hi2, i2] = this.getHallwayIndexAndIndexFromNode(id2);
    if (this.hallways[hi2].name) {
      return "Enter " + this.hallways[hi2].name + "\n";
    } else {
      return "";
    }
  }

  /**
   * @param {string} from - The name of the starting room
   * @param {string} to - The name of the destination room
   * @return {string} The directions to get from room `from` to room `to`
   */
  public getDirections(from: string, to: string): string {
    // Find the indices of the hallways of the rooms
    // and the indices of the rooms in the hallways
    const [fromHallwayInd, fromInd] = this.getHallwayIndexAndIndex(from)!;
    const [toHallwayInd, toInd] = this.getHallwayIndexAndIndex(to)!;
    // Find IDs of the nodes (stairs or hallways) closest to these rooms
    const closestNodeFromInd = this.hallways[
      fromHallwayInd
    ].idOfClosestNodeToIndex(fromInd);
    const closestNodeToInd = this.hallways[toHallwayInd].idOfClosestNodeToIndex(
      toInd
    );

    // Get the shortest path between the 2 nodes closest to the rooms
    const shortest = getShortestPath(
      this.graph,
      closestNodeFromInd,
      closestNodeToInd
    );
    let directions = "";
    let [currentHallwayInd, currentInd] = [fromHallwayInd, fromInd];
    // Loop through the shortest path to convert them to directions
    for (let i = 1; i < shortest.length; i++) {
      const id = shortest[i];
      const [hallwayInd, ind] = this.getHallwayIndexAndIndexFromNode(id);
      const [prevHallwayInd, prevInd] = this.getHallwayIndexAndIndexFromNode(
        shortest[i - 1]
      );
      if (
        this.isConnectionStairs(
          shortest[i - 1],
          shortest[i]
        ) /* going up or down stairs */
      ) {
        directions += this.hallways[currentHallwayInd].getDirectionsFromIndices(
          currentInd,
          prevInd
        );
        const numStairFlights = Math.ceil(
          this.graph[shortest[i - 1]][shortest[i]]
        );
        directions += this.getStairConnectionInstruction(
          shortest[i - 1],
          shortest[i],
          numStairFlights
        );
        [currentHallwayInd, currentInd] = this.getHallwayIndexAndIndexFromNode(
          shortest[i]
        );
      } else if (hallwayInd !== currentHallwayInd /* it's a fork */) {
        directions += this.hallways[currentHallwayInd].getDirectionsFromIndices(
          currentInd,
          prevInd
        );
        directions += this.getHallwayConnectionInstruction(shortest[i]);
        [currentHallwayInd, currentInd] = [hallwayInd, ind];
      }
    }
    directions += this.hallways[currentHallwayInd].getDirectionsFromIndices(
      currentInd,
      toInd
    );
    return directions;
  }

  public isValidRoomName(name: string) {
    return (
      typeof name === "string" && this.getHallwayIndexAndIndex(name) != null
    );
  }
}
