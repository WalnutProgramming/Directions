// @ts-check

"use strict";

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

/** @typedef {-1 | 1 | -2 | 2} Direction */
const LEFT = -1,
  RIGHT = 1,
  BACK = -2,
  FRONT = 2;

/**
 * @param {number} dir A direction (LEFT,RIGHT,FRONT,BACK)
 * @return {string} 'left', 'right', 'front', or 'back'
 */
function dirToString(dir) {
  if (dir === LEFT) return "left";
  else if (dir === RIGHT) return "right";
  else if (dir === FRONT) return "front";
  else return "back";
}

/**
 * @param {number} dir A direction (LEFT,RIGHT,FRONT,BACK)
 * @param {boolean=} lowercase Should the result start with a lowercase letter?
 * @return {string} 'Go straight', 'Turn left', or 'Turn right'
 */
function dirToTurnString(dir, lowercase) {
  if (dir === FRONT || dir === BACK) {
    return (lowercase ? "g" : "G") + "o straight";
  } else {
    return (lowercase ? "t" : "T") + "urn " + dirToString(dir);
  }
}

/**
 *
 * @param {Direction} dir
 * @return {boolean}
 */
function isLeftOrRight(dir) {
  return dir === LEFT || dir === RIGHT;
}

class Room {
  /**
   *
   * @param {?string=} name
   * @param {Direction=} side
   * @param {?string=} nodeId
   * @param {string=} prefix
   * @param {string[]=} aliases
   * @param {?number=} edgeLengthFromPreviousNodeInHallway
   */
  constructor(
    name,
    side = LEFT,
    nodeId = null,
    prefix = "room",
    aliases = [],
    edgeLengthFromPreviousNodeInHallway = null
  ) {
    this.name = name;
    this.side = side;
    this.nodeId = nodeId;
    this.prefix = prefix;
    this.aliases = aliases;
    this.edgeLengthFromPreviousNodeInHallway = edgeLengthFromPreviousNodeInHallway;
  }

  get fullName() {
    if ("name" in this && this.name) {
      return (this.prefix === "" ? "" : this.prefix + " ") + this.name;
    }
  }

  /**
   * @param {-1 | 1} forwardOrBackward Whether we're going forward or backward through this hallway
   * @param {Room | Turn} prevRoom The previous room
   * @return {string} What we should say when you pass this room
   */
  onPass(forwardOrBackward, prevRoom) {
    return "";
  }

  /**
   *
   * @param {-1 | 1} forwardOrBackward Whether we're going forward or backward through this hallway
   * @return {string} What we should say when we go out of this room
   */
  onLeave(forwardOrBackward) {
    let ret = "";
    if (isLeftOrRight(this.side)) {
      ret += dirToTurnString(forwardOrBackward * this.side);
      if (this.fullName) ret += ` out of ${this.fullName}`;
      ret += "\n";
    }
    return ret;
  }

  /**
   *
   * @param {-1 | 1} forwardOrBackward Whether we're going forward or backward through this hallway
   * @return {string} What we should say when we enter this room
   */
  onArrive(forwardOrBackward) {
    return `Continue, then ${dirToTurnString(
      this.side * forwardOrBackward,
      true
    )} into ${this.fullName}\n`;
  }
}

class Stairs extends Room {
  /**
   * @param {Direction=} side
   * @param {?string=} nodeId
   * @param {string=} stairNumber
   * @param {number=} edgeLengthFromPreviousNodeInHallway
   */
  constructor(side, nodeId, stairNumber, edgeLengthFromPreviousNodeInHallway) {
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
  /**
   *
   * @param {Direction} side
   * @param {string} nodeId
   * @param {string} destinationName
   * @param {number=} edgeLengthFromPreviousNodeInHallway
   */
  constructor(
    side,
    nodeId,
    destinationName,
    edgeLengthFromPreviousNodeInHallway = 1
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
  /**
   * @param {-1 | 1} direction
   */
  constructor(direction) {
    this.direction = direction;
  }

  /**
   * @param {-1 | 1} forwardOrBackward Whether we're going forward or backward through this hallway
   * @param {Room | Turn} prevRoom The previous room
   * @return {string} What we should say when you pass this turn
   */
  onPass(forwardOrBackward, prevRoom) {
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
  /**
   * @param {(Room | Turn)[]} partList
   * @param {?string=} name
   */
  constructor(partList, name) {
    this.partList = partList;
    this.name = name;
  }

  /**
   * @param {string} name The name of the room
   * @return {number} The index of the room, or -1 if
   *  there's no room with that name
   */
  getRoomInd(name) {
    return this.partList.findIndex(elem => {
      return (
        "name" in elem &&
        elem.name != null &&
        (elem.name.toUpperCase() === name.toUpperCase() ||
          elem.aliases.map(a => a.toUpperCase()).includes(name.toUpperCase()))
      );
    });
  }

  /**
   * @param {number} roomInd The index of the room in the hallway
   * @return {string} The id of the "closest" node to the room
   * in the hallway
   */
  idOfClosestNodeToIndex(roomInd) {
    /** @type {number} */
    let closestNodeInd;
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

    const closest = this.partList[closestNodeInd];
    if ("nodeId" in closest) return closest.nodeId;
  }

  /**
   * @return {{nodeId: string, edgeLengthFromPreviousNodeInHallway: number}[]}
   */
  get nodes() {
    return this.partList
      .filter(r => "nodeId" in r && r.nodeId)
      .map(r => "nodeId" in r && r);
  }

  /**
   * Gives the directions to get from one room to another
   * in a single hallway given the hallway and the indices
   * of the rooms in the hallway.
   * @param {number} from The index of the starting room
   * @param {number} to The index of the room to go to
   * @return {string} The directions, with steps separated with newlines
   */
  getDirectionsFromIndices(from, to) {
    const fr = this.partList[from];
    /** @type Room */
    const fromRoom = fr instanceof Room && fr;

    const t = this.partList[to];
    /** @type Room */
    const toRoom = t instanceof Room && t;

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
      ret += current.onPass(forwardOrBackward, prevRoom);
    }

    ret += toRoom.onArrive(forwardOrBackward);

    return ret;
  }
}

class SimpleHallway extends Hallway {
  /**
   *
   * @param {string} nodeId
   * @param {Room[]} partList
   * @param {string} hallwayName
   */
  constructor(nodeId, partList, hallwayName) {
    super([new Fork(FRONT, nodeId, ""), ...partList]);
    this.hallwayName = hallwayName;
  }

  getDirectionsFromIndices(from, to) {
    const toRoomName = /** @type {Room} */ (this.partList[to]).fullName;
    const fromRoomName = /** @type {Room} */ (this.partList[from]).fullName;
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
