import Direction from "./Direction";
import Room from "./Room";

/**
 * A [[Stair]] represents one entrance to a set of stairs in a
 * [[Hallway]]. You can connect the [[Stair]]s of 2 hallways by
 * adding to the `stairConnections` argument of the [[Hallway]]
 * constructor.
 */
export default class Stairs extends Room {
  constructor(
    side?: Direction | undefined,
    nodeId?: (string | null) | undefined,
    public stairNumber?: string | undefined,
    edgeLengthFromPreviousNodeInHallway?: number | undefined
  ) {
    super(
      null,
      side,
      nodeId,
      undefined,
      undefined,
      edgeLengthFromPreviousNodeInHallway
    );
  }

  get fullName() {
    if (this.stairNumber) {
      return "the " + this.stairNumber + " stairs";
    }
    return "the stairs";
  }
}
