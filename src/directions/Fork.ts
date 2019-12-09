import Direction from "./Direction";
import Room from "./Room";

export default class Fork extends Room {
  constructor(
    side: Direction,
    nodeId: string,
    public destinationName: string,
    edgeLengthFromPreviousNodeInHallway: number | undefined = 1
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
    return this.destinationName;
  }
}
