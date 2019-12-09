import Room from "./Room";
import {
  dirToString,
  dirToTurnString,
  isLeftOrRight,
} from "./directionHelpers";

export default class Turn {
  constructor(public direction: -1 | 1) {}

  onPass(forwardOrBackward: -1 | 1, prevRoom: Room | Turn): string {
    let ret = "";
    const direction = this.direction * forwardOrBackward;
    ret += "Continue, then " + dirToTurnString(direction, true);
    if (prevRoom instanceof Room && isLeftOrRight(prevRoom.side)) {
      ret += ` (after passing ${prevRoom.fullName} on your ${dirToString(
        prevRoom.side * forwardOrBackward
      )})`;
    }
    ret += "\n";
    return ret;
  }
}
