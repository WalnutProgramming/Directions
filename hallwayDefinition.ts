export {
  LEFT,
  RIGHT,
  BACK,
  FRONT,
  Room,
  Turn,
  Hallway,
  Stairs,
  Fork,
  SimpleHallway,
};
// This is where we actually specify the layout
// of our school

// A direction can be LEFT or RIGHT, or if you're
// at the end of a hallway, it can be FRONT or BACK

enum Direction {
  LEFT = -1,
  RIGHT = 1,
  BACK = -2,
  FRONT = 2,
}
const LEFT = Direction.LEFT,
  RIGHT = Direction.RIGHT,
  BACK = Direction.BACK,
  FRONT = Direction.FRONT;

/**
 * @param dir - A direction (LEFT,RIGHT,FRONT,BACK)
 * @returns 'left', 'right', 'front', or 'back'
 */
function dirToString(dir: Direction): string {
  if (dir === LEFT) return "left";
  else if (dir === RIGHT) return "right";
  else if (dir === FRONT) return "front";
  else return "back";
}

/**
 * @param dir - A direction (LEFT,RIGHT,FRONT,BACK)
 * @param lowercase - Should the result start with a lowercase letter?
 * @returns 'Go straight', 'Turn left', or 'Turn right'
 */
function dirToTurnString(dir: Direction, lowercase: boolean = false): string {
  if (dir === FRONT || dir === BACK) {
    return (lowercase ? "g" : "G") + "o straight";
  } else {
    return (lowercase ? "t" : "T") + "urn " + dirToString(dir);
  }
}

function isLeftOrRight(dir: Direction): boolean {
  return dir === LEFT || dir === RIGHT;
}

class Room {
  name: (string | null) | undefined;
  side: Direction;
  nodeId: (string | null) | undefined = null;
  prefix: string | undefined = "room";
  aliases: string[] | undefined = [];
  edgeLengthFromPreviousNodeInHallway: (number | null) | undefined = null;

  constructor(
    name?: (string | null) | undefined,
    side: Direction | undefined = LEFT,
    nodeId: (string | null) | undefined = null,
    prefix: string | undefined = "room",
    aliases: string[] | undefined = [],
    edgeLengthFromPreviousNodeInHallway: (number | null) | undefined = null
  ) {
    this.name = name;
    this.side = side;
    this.nodeId = nodeId;
    this.prefix = prefix;
    this.aliases = aliases;
    this.edgeLengthFromPreviousNodeInHallway = edgeLengthFromPreviousNodeInHallway;
  }

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

class Stairs extends Room {
  stairNumber: string | undefined;
  constructor(
    side?: Direction | undefined,
    nodeId?: (string | null) | undefined,
    stairNumber?: string | undefined,
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
    this.stairNumber = stairNumber;
  }

  get fullName() {
    if (this.stairNumber) {
      return "the " + this.stairNumber + " stairs";
    }
    return "the stairs";
  }
}

class Fork extends Room {
  destinationName: string;
  constructor(
    side: Direction,
    nodeId: string,
    destinationName: string,
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
    this.destinationName = destinationName;
  }

  get fullName() {
    return this.destinationName;
  }
}

class Turn {
  direction: Direction;

  constructor(direction: -1 | 1) {
    this.direction = direction;
  }

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

class Hallway {
  partList: (Room | Turn)[];
  name: string | null | undefined;

  constructor(partList: (Room | Turn)[], name?: string | null) {
    this.partList = partList;
    this.name = name;
  }

  /**
   * @param - name The name of the room
   * @returns The index of the room, or -1 if
   *  there's no room with that name
   */
  getRoomInd(name: string): number {
    return this.partList.findIndex(elem => {
      return (
        "name" in elem &&
        elem.name != null &&
        (elem.name.toUpperCase() === name.toUpperCase() ||
          elem.aliases!.map(a => a.toUpperCase()).includes(name.toUpperCase()))
      );
    });
  }

  /**
   * @param roomInd - The index of the room in the hallway
   * @returns The id of the "closest" node to the room
   * in the hallway
   */
  idOfClosestNodeToIndex(roomInd: number): string {
    let closestNodeInd: number;
    this.partList.forEach((r, currentInd) => {
      if (
        "nodeId" in r &&
        r.nodeId &&
        (closestNodeInd === undefined ||
          Math.abs(currentInd - roomInd) < Math.abs(closestNodeInd - roomInd))
      ) {
        closestNodeInd = currentInd;
      }
    });

    const closest = this.partList[closestNodeInd!];
    return (closest as Room).nodeId!;
  }

  get nodes(): {
    nodeId: string;
    edgeLengthFromPreviousNodeInHallway: number;
  }[] {
    return this.partList.filter(r => "nodeId" in r && r.nodeId != null) as {
      nodeId: string;
      edgeLengthFromPreviousNodeInHallway: number;
    }[];
  }

  /**
   * Gives the directions to get from one room to another
   * in a single hallway given the hallway and the indices
   * of the rooms in the hallway.
   * @param from - The index of the starting room
   * @param to - The index of the room to go to
   * @returns The directions, with steps separated with newlines
   */
  getDirectionsFromIndices(from: number, to: number): string {
    const fromRoom = this.partList[from] as Room;

    const toRoom = this.partList[to] as Room;

    if (from === to) {
      return `Bruh. You at ${fromRoom.fullName}\n`;
    }

    let ret = "";
    const forwardOrBackward = to > from ? 1 : -1;

    ret += fromRoom.onLeave(forwardOrBackward);

    for (let i = from; i !== to; i += forwardOrBackward) {
      const current = this.partList[i];
      const prevInd = i - forwardOrBackward;
      const prevRoom =
        prevInd >= 0 &&
        prevInd < this.partList.length &&
        this.partList[i - forwardOrBackward];
      ret += current.onPass(forwardOrBackward, prevRoom as Room);
    }

    ret += toRoom.onArrive(forwardOrBackward);

    return ret;
  }
}

class SimpleHallway extends Hallway {
  hallwayName: string;

  constructor(nodeId: string, partList: Room[], hallwayName: string) {
    super([new Fork(FRONT, nodeId, ""), ...partList]);
    this.hallwayName = hallwayName;
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
