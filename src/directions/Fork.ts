import Direction from "./Direction";
import Room from "./Room";

/**
 * A Fork represents a connection between 2 [[Hallway]]s on the same
 * floor. You can connect the [[Forks]]s of 2 hallways by
 * adding to the `hallwayConnections` argument of the [[Hallway]]
 * constructor.
 */
export default class Fork extends Room {
  constructor(
    side: Direction,
    nodeId: string,
    public destinationName: string,
    edgeLengthFromPreviousNodeInHallway: number | undefined = 1
  ) {
    super(null, side, { nodeId, edgeLengthFromPreviousNodeInHallway });
  }

  get fullName() {
    return this.destinationName;
  }
}
