import Direction from "./Direction";
import { isLeftOrRight, dirToTurnString } from "./directionHelpers";

type Turn = typeof import("./Turn");

/**
 * This class represents a single element in a hallway that is not a [[Turn]].
 * This can be a room, but it can also be a [[Fork]] or [[Stairs]].
 */
export default class Room {
  constructor(
    public name?: (string | null) | undefined,
    public side: Direction = Direction.LEFT,
    public nodeId: (string | null) | undefined = null,
    public prefix: string | undefined = "room",
    public aliases: string[] | undefined = [],
    public edgeLengthFromPreviousNodeInHallway: number | null | undefined = null
  ) {}

  get fullName(): string {
    return (this.prefix === "" ? "" : this.prefix + " ") + this.name;
  }

  /**
   * @param forwardOrBackward - Whether we're going forward or backward through this hallway
   * @param prevRoom - The previous room
   * @returns What we should say when you pass this room
   */
  onPass(forwardOrBackward: -1 | 1, prevRoom: Room | Turn): string {
    return "";
  }

  /**
   *
   * @param forwardOrBackward - Whether we're going forward or backward through this hallway
   * @returns What we should say when we go out of this room
   */
  onLeave(forwardOrBackward: -1 | 1): string {
    let ret = "";
    if (isLeftOrRight(this.side)) {
      ret += dirToTurnString(forwardOrBackward * this.side);
      if (this.fullName) ret += ` out of ${this.fullName}`;
      ret += "\n";
    }
    return ret;
  }

  onArrive(forwardOrBackward: -1 | 1): string {
    return `Continue, then ${dirToTurnString(
      this.side * forwardOrBackward,
      true
    )} into ${this.fullName}\n`;
  }
}
