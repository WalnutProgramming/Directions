import Direction from "./Direction";
import Room from "./Room";

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
