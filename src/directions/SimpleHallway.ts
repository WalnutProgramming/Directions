import Hallway from "./Hallway";
import Room from "./Room";
import Fork from "./Fork";
import Direction from "./Direction";

export default class SimpleHallway extends Hallway {
  constructor(nodeId: string, partList: Room[], public hallwayName: string) {
    super([new Fork(Direction.FRONT, nodeId, ""), ...partList]);
  }

  getDirectionsFromIndices(from: number, to: number) {
    const toRoomName = (this.partList[to] as Room).fullName;
    const fromRoomName = (this.partList[from] as Room).fullName;
    if (from === 0) {
      // We're starting from the fork and going into the room
      return `Enter ${toRoomName}, which is in ${this.hallwayName}\n`;
    } else if (to === 0) {
      // We're starting at the room and going out of the fork
      return `Exit ${fromRoomName}\n`;
    } else {
      return `Exit ${fromRoomName} and enter ${toRoomName} (both of which are in ${this.hallwayName})\n`;
    }
  }
}
