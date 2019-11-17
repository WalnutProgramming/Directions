// @ts-check

"use strict";

export {
  LEFT,
  RIGHT,
  BACK,
  FRONT,
  hallways,
  stairConnections,
  hallwayConnections,
  Room,
  Turn,
  Hallway,
  Stairs,
  Fork,
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

/** @enum {string} */
const StairNode = {
  A1: "StairNode.A1",
  A2: "StairNode.A2",
  A3: "StairNode.A3",
  B1: "StairNode.B1",
  B2: "StairNode.B2",
  B3: "StairNode.B3",
  C2: "StairNode.C2",
  C3: "StairNode.C3",
  D2: "StairNode.D2",
  D3: "StairNode.D3",
  F1: "StairNode.F1",
  F2: "StairNode.F2",
  F3: "StairNode.F3",
  SCIENCE_A1: "StairNode.SCIENCE_A1",
  SCIENCE_A2: "StairNode.SCIENCE_A2",
  SCIENCE_A3: "StairNode.SCIENCE_A3",
  MUSIC_ENTRANCE_TO_1: "StairNode.MUSIC_ENTRANCE_TO_1",
  MUSIC_1_TO_ENTRANCE: "StairNode.MUSIC_1_TO_ENTRANCE",
  MUSIC_ENTRANCE_TO_2: "StairNode.MUSIC_ENTRANCE_TO_2",
  MUSIC_2_TO_ENTRANCE: "StairNode.MUSIC_2_TO_ENTRANCE",
  ARTS_A2: "StairNode.ARTS_A2",
  ARTS_A3: "StairNode.ARTS_A3",
  ARTS_B2: "StairNode.ARTS_B2",
  ARTS_B3: "StairNode.ARTS_B3",
};

//When listing stairs, the furthest down entrance to the stairs goes first
/** @type string[][] */
const stairConnections = [
  [StairNode.A1, StairNode.A2, StairNode.A3],
  [StairNode.B1, StairNode.B2, StairNode.B3],
  [StairNode.C2, StairNode.C3],
  [StairNode.D2, StairNode.D3],
  [StairNode.F1, StairNode.F2, StairNode.F3],
  [StairNode.SCIENCE_A1, StairNode.SCIENCE_A2, StairNode.SCIENCE_A3],
  [StairNode.MUSIC_ENTRANCE_TO_2, StairNode.MUSIC_2_TO_ENTRANCE],
  [StairNode.MUSIC_1_TO_ENTRANCE, StairNode.MUSIC_ENTRANCE_TO_1],
  [StairNode.ARTS_A2, StairNode.ARTS_A3],
  [StairNode.ARTS_B2, StairNode.ARTS_B3],
];

/** @enum {string} */
const ConnectionNode = {
  C1300S_TO_1600S: "ConnectionNode.C1300S_TO_1600S",
  C1600S_TO_1300S: "ConnectionNode.C1600S_TO_1300S",
  C2300S_TO_2600S: "ConnectionNode.C2300S_TO_2600S",
  C2600S_TO_2300S: "ConnectionNode.C2600S_TO_2300S",
  C2600S_TO_ARCADE: "ConnectionNode.C2600S_TO_ARCADE",
  ARCADE_TO_2600S: "ConnectionNode.ARCADE_TO_2600S",
  C2700S_TO_ARCADE: "ConnectionNode.C2700S_TO_ARCADE",
  ARCADE_TO_2700S: "ConnectionNode.ARCADE_TO_2700S",
  MUSIC_ENTRANCE_TO_ARCADE: "ConnectionNode.MUSIC_ENTRANCE_TO_ARCADE",
  ARCADE_TO_MUSIC_ENTRANCE: "ConnectionNode.ARCADE_TO_MUSIC_ENTRANCE",
  MUSIC1_TO_MUSIC_LITTLE_CORNER: "ConnectionNode.MUSIC1_TO_MUSIC_LITTLE_CORNER",
  MUSIC_LITTLE_CORNER_TO_MUSIC1: "ConnectionNode.MUSIC_LITTLE_CORNER_TO_MUSIC1",
  LOBBY_TO_2200S: "ConnectionNode.LOBBY_TO_2200S",
  C2200S_TO_LOBBY: "ConnectionNode.C2200S_TO_LOBBY",
  LOBBY_TO_2240: "ConnectionNode.LOBBY_TO_2240",
  C2240_TO_LOBBY: "ConnectionNode.C2240_TO_LOBBY",
  ALUMNI__HALL_TO_2200S: "ConnectionNode.ALUMNI__HALL_TO_2200S",
  C2200S_TO_ALUMNI_HALL: "ConnectionNode.C2200S_TO_ALUMNI_HALL",
  ALUMNI_HALL_TO_ARCADE: "ConnectionNode.ALUMNI_HALL_TO_ARCADE",
  ARCADE_TO_ALUMNI_HALL: "ConnectionNode.ARCADE_TO_ALUMNI_HALL",
  C2500S_TO_ALUMNI_HALL: "ConnectionNode.C2500S_TO_ALUMNI_HALL",
  ALUMNI_HALL_TO_2500S: "ConnectionNode.ALUMNI_HALL_TO_2500S",
  C2500S_TO_2600S: "ConnectionNode.C2500S_TO_2600S",
  C2600S_TO_2500S: "ConnectionNode.C2600S_TO_2500S",
  C2600S_TO_2600S_LITTLE_HALLWAY:
    "ConnectionNode.C2600S_TO_2600S_LITTLE_HALLWAY",
  C2600S_LITTLE_HALLWAY_TO_2600S:
    "ConnectionNode.C2600S_LITTLE_HALLWAY_TO_2600S",
  C3500S_CORNER_TO_3500S: "ConnectionNode.C3500S_CORNER_TO_3500S",
  C3500S_TO_3500S_CORNER: "ConnectionNode.C3500S_TO_3500S_CORNER",
  C2500S_CORNER_TO_2500S: "ConnectionNode.C2500S_CORNER_TO_2500S",
  C2500S_TO_2500S_CORNER: "ConnectionNode.C2500S_TO_2500S_CORNER",
  ENTER_2216: "ConnectionNode.ENTER_2216",
  EXIT_2216: "ConnectionNode.EXIT_2216",
  ENTER_2215: "ConnectionNode.ENTER_2215",
  EXIT_2215: "ConnectionNode.EXIT_2215",
};

/** @type [string, string][] */
const hallwayConnections = [
  [ConnectionNode.C1300S_TO_1600S, ConnectionNode.C1600S_TO_1300S],
  [ConnectionNode.C2300S_TO_2600S, ConnectionNode.C2600S_TO_2300S],
  [ConnectionNode.C2600S_TO_ARCADE, ConnectionNode.ARCADE_TO_2600S],
  [ConnectionNode.C2700S_TO_ARCADE, ConnectionNode.ARCADE_TO_2700S],
  [
    ConnectionNode.MUSIC_ENTRANCE_TO_ARCADE,
    ConnectionNode.ARCADE_TO_MUSIC_ENTRANCE,
  ],
  [
    ConnectionNode.MUSIC1_TO_MUSIC_LITTLE_CORNER,
    ConnectionNode.MUSIC_LITTLE_CORNER_TO_MUSIC1,
  ],
  [ConnectionNode.LOBBY_TO_2200S, ConnectionNode.C2200S_TO_LOBBY],
  [ConnectionNode.LOBBY_TO_2240, ConnectionNode.C2240_TO_LOBBY],
  [ConnectionNode.ALUMNI__HALL_TO_2200S, ConnectionNode.C2200S_TO_ALUMNI_HALL],
  [ConnectionNode.ALUMNI_HALL_TO_ARCADE, ConnectionNode.ARCADE_TO_ALUMNI_HALL],
  [ConnectionNode.C2500S_TO_ALUMNI_HALL, ConnectionNode.ALUMNI_HALL_TO_2500S],
  [ConnectionNode.C2500S_TO_2600S, ConnectionNode.C2600S_TO_2500S],
  [
    ConnectionNode.C2600S_TO_2600S_LITTLE_HALLWAY,
    ConnectionNode.C2600S_LITTLE_HALLWAY_TO_2600S,
  ],
  [
    ConnectionNode.C3500S_CORNER_TO_3500S,
    ConnectionNode.C3500S_TO_3500S_CORNER,
  ],
  [
    ConnectionNode.C2500S_CORNER_TO_2500S,
    ConnectionNode.C2500S_TO_2500S_CORNER,
  ],
  [ConnectionNode.ENTER_2216, ConnectionNode.EXIT_2216],
  [ConnectionNode.ENTER_2215, ConnectionNode.EXIT_2215],
];

/** @type {Hallway} */
const hallway3 = new Hallway([
  new Stairs(LEFT, StairNode.A3, "2018"),
  new Room("3314", LEFT),
  new Room("3315", RIGHT),
  new Room("3312", LEFT),
  new Room("3313", RIGHT),
  new Room("3311", RIGHT),
  new Turn(LEFT),
  new Room("3310", RIGHT), // these 2 rooms sometimes give weird directions
  new Room("3309", RIGHT), //
  new Turn(RIGHT),
  new Stairs(LEFT, StairNode.B3, "2025", 2),
  new Room("3305", RIGHT),
  new Room("3302", LEFT),
  new Room("3303", RIGHT),
  new Room("3301", RIGHT, undefined, undefined, ["Writing Center"]),
  new Stairs(LEFT, StairNode.C3, "2024"),
  new Room("3210", LEFT),
  new Room("3207", LEFT),
  new Room("3205", RIGHT),
  new Room("3208", LEFT),
  //rooms without room numbers have prefix 'the'
  new Room("Library", RIGHT, null, "the", ["3214", "Libary (misspelled)"]),
  new Room("3206", LEFT),
  new Room("3204", LEFT),
  new Room("3202", LEFT),
  new Room("3201", RIGHT, undefined, undefined, [
    "Computer Lab - Library",
    "Library Computer Lab",
  ]),
  new Stairs(LEFT, StairNode.D3, "2015", 3),
  new Room("3102", LEFT),
  new Room("3101", RIGHT),
  new Room("3104", LEFT),
  new Room("3103", RIGHT),
  new Room("3105", RIGHT),
  new Turn(RIGHT),
  new Room("3112", LEFT),
  new Room("3110", RIGHT),
  new Room("3111", RIGHT),
  new Turn(LEFT),
  new Room("3113", RIGHT),
  new Room("3114", LEFT),
  new Room("3115", RIGHT),
  new Room("3117", RIGHT),
  new Stairs(LEFT, StairNode.F3, "2010"),
]);

/** @type {Hallway} */
const hallway2 = new Hallway([
  new Stairs(LEFT, StairNode.A2, "2018"),
  new Room("2310"),
  new Room("2311", RIGHT),
  new Room("2308"),
  new Room("2309", RIGHT),
  new Room("2307", RIGHT),
  new Turn(LEFT),
  new Room("2306", RIGHT),
  new Turn(RIGHT),
  new Fork(LEFT, ConnectionNode.C2300S_TO_2600S, "the 2600s"),
  new Stairs(LEFT, StairNode.B2, "2025"),
  new Room("2302", RIGHT),
  new Room("Auditorium", LEFT, undefined, "the", [
    "2500",
    "Westheimer Auditorium",
  ]),
  new Room("2301", RIGHT),
  new Room("2205", RIGHT),
  new Stairs(LEFT, StairNode.C2, "2024"),
  new Fork(LEFT, ConnectionNode.C2200S_TO_ALUMNI_HALL, "the Alumni Hall"),
  new Room("2204", undefined, undefined, undefined, ["Principal's Office"]),
  new Room("2203", RIGHT, undefined, undefined, ["Counseling Office"]),
  new Room("2202"),
  new Room("2201", RIGHT, undefined, undefined, ["Registrar"]),
  new Fork(LEFT, ConnectionNode.LOBBY_TO_2240, "the entrance area"),
  new Fork(RIGHT, ConnectionNode.LOBBY_TO_2200S, "the 2200s"),
  new Room("2210", undefined, undefined, undefined, ["Conference Room"]),
  new Room("2209", RIGHT, undefined, undefined, ["7-8 Administration Office"]),
  new Stairs(LEFT, StairNode.D2, "2015"),
  new Room("2101", RIGHT),
  new Room("Junior High Gym", LEFT, undefined, "the", [
    "2402",
    "Gymnasium - Junior High",
    "Gymnasium - Junior High School",
    "Junior High Gymnasium",
    "Junior Gym",
    "Junior Gymnasium",
    "Junior High School Gym",
    "Junior High School Gymnasium",
  ]),
  new Room("2103", RIGHT),
  new Room("2105", RIGHT),
  new Turn(RIGHT),
  new Room("2109", RIGHT),
  new Room("2112"),
  new Room("2110", RIGHT),
  new Turn(LEFT),
  new Room("2111", RIGHT),
  new Room("2114"),
  new Room("2113", RIGHT),
  new Room("2115", RIGHT),
  new Stairs(LEFT, StairNode.F2, "2010"),
]);

/** @type Hallway */
const entranceArea = new Hallway([
  new Fork(BACK, ConnectionNode.C2240_TO_LOBBY, "the lobby"),
  new Room("2200", LEFT, undefined, undefined, ["Main Office"]),
]);

/** @type Hallway */
const administrativeCenter = new Hallway([
  new Fork(BACK, ConnectionNode.C2200S_TO_LOBBY, "the lobby"),
  new Room("2207", RIGHT, undefined, undefined, [
    "9-12 Administration Offices",
  ]),
  new Room("2229"),
  new Room("2212", undefined, undefined, undefined, ["Medical Room", "Nurse"]),
  new Room("2214"),
  new Room("2211", RIGHT),
  new Room("2216", LEFT, ConnectionNode.ENTER_2216),
  new Room("2215", RIGHT, ConnectionNode.ENTER_2215, undefined, [
    "Alumni Foundation",
    "Alumni Office",
  ]),
  new Room("2218"),
]);

const inside2216 = new SimpleHallway(
  ConnectionNode.EXIT_2216,
  [new Room("2222")],
  "room 2216"
);

const inside2215 = new SimpleHallway(
  ConnectionNode.EXIT_2215,
  [new Room("2219"), new Room("2221")],
  "room 2215"
);

/** @type {Hallway} */
const hallway1 = new Hallway([
  new Stairs(LEFT, StairNode.A1, "2018"),
  new Room("1314"),
  new Room("1315", RIGHT),
  new Room("1312"),
  new Room("1313", RIGHT),
  new Room("1311", RIGHT),
  new Turn(LEFT),
  new Room("1310", RIGHT),
  new Room("1309", RIGHT),
  new Turn(RIGHT),
  new Fork(LEFT, ConnectionNode.C1300S_TO_1600S, "the 1600s"),
  new Stairs(LEFT, StairNode.B1, "2025"),
  new Room("1305", RIGHT),
  new Room("1302", RIGHT),
  new Room("1301", RIGHT),
]);

const hallway1100s = new Hallway([
  new Room("1105", RIGHT),
  new Room("1108"),
  new Turn(LEFT),
  new Room("1109", RIGHT),
  new Room("1110"),
  new Room("1111", RIGHT),
  new Room("1113", RIGHT),
  new Stairs(LEFT, StairNode.F1, "2010"),
]);

/** @type Hallway */
const modernLanguagesWing1 = new Hallway([
  new Fork(BACK, ConnectionNode.C1600S_TO_1300S, "the 1300s"),
  new Turn(LEFT),
  new Room("1601"),
  new Room("1602"),
  new Turn(RIGHT),
  new (class extends Room {
    onLeave(forwardOrBackward) {
      return super
        .onLeave(forwardOrBackward)
        .replace("\n", " through the door closest to the desk\n");
    }
  })("1604", RIGHT, undefined, undefined, ["Language Lab"]),
  new Room("1603"),
  new Room("1605"),
  new Room("1606"),
  new Room("1607"),
  new Room("1608"),
  new Stairs(LEFT, StairNode.SCIENCE_A1, undefined, 4),
]);

/** @type {Hallway} */
const modernLanguagesWing2 = new Hallway([
  new Fork(BACK, ConnectionNode.C2600S_TO_2300S, "the 2300s"),
  new Turn(LEFT),
  new Room("2604", RIGHT),
  new Room("2601"),
  new Room("2602"),
  new Turn(RIGHT),
  new Room("2603"),
  new Room("2605"),
  new Fork(
    RIGHT,
    ConnectionNode.C2600S_TO_2600S_LITTLE_HALLWAY,
    "the little hallway"
  ),
  new Room("2607"),
  new Room("2609"),
  new Room("2611"),
  new Fork(FRONT, ConnectionNode.C2600S_TO_ARCADE, "the arcade"),
]);

const little2600sHallway = new Hallway([
  new Fork(BACK, ConnectionNode.C2600S_LITTLE_HALLWAY_TO_2600S, "the 2600s"),
  // There are a few stairs right here
  new (class extends Room {
    onPass(forwardOrBackward, prevRoom) {
      return `Go ${forwardOrBackward === -1 ? "up" : "down"} the 3 steps\n`;
    }
  })(),
  new Fork(LEFT, ConnectionNode.C2600S_TO_2500S, "the door"),
]);

/** @type {Hallway} */
const arcade = new Hallway([
  // The directions that we use here (FRONT) don't matter since we
  // override the instructions for the arcade anyway.
  new Fork(FRONT, ConnectionNode.ARCADE_TO_ALUMNI_HALL, "Alumni Hall"),
  new Fork(FRONT, ConnectionNode.ARCADE_TO_2600S, "the 2600s"),
  new Fork(FRONT, ConnectionNode.ARCADE_TO_2700S, "the 2700s"),
  new Fork(FRONT, ConnectionNode.ARCADE_TO_MUSIC_ENTRANCE, "the music lyceum"),
  new Room("Senior High Gym", FRONT, null, "the", [
    "2800",
    "Gymnasium - High School",
    "Senior Gym",
    "High School Gymnasium",
    "High School Gym",
  ]),
]);

arcade.getDirectionsFromIndices = function(from, to) {
  const LANGUAGES = 1,
    SCIENCE = 2,
    MUSIC = 3,
    GYM = 4,
    ALUMNI = 0;
  switch (from) {
    case LANGUAGES:
      switch (to) {
        case SCIENCE:
          return "Go straight and a bit to the right to get to the 2700s, the science wing\n";
        case MUSIC:
          return (
            "Go straight and a bit to the left through the long narrow hallway\n" +
            'Turn right when you get to the doors labeled "Music Lyceum" and enter the doors\n'
          );
        case GYM:
          return (
            "Go straight and a bit to left, and go to the end of the hall\n" +
            "The Senior High Gym is straight ahead. Walk inside\n"
          );
        case ALUMNI:
          return "Turn right, go to the end of the arcade, walk up the ramp, turn right, and go through the doors\n";
      }
    case SCIENCE:
      switch (to) {
        case LANGUAGES:
          return "Go straight and a bit to the right to get to the 2600s, the modern languages wing\n";
        case MUSIC:
          return (
            "Turn right, then walk down to the end of the arcade and turn right\n" +
            "Walk down the hallway, and turn right when you get to the doors\n"
          );
        case GYM:
          return "Turn right when you leave the science wing\nWalk forward and turn right again, then walk down to the end of the narrow hallway\n";
        case ALUMNI:
          return "Turn left, go to the end of the arcade, walk up the ramp, turn right, and go through the doors\n";
      }
    case MUSIC:
      switch (to) {
        case SCIENCE:
          return (
            "Turn left after walking through the doors, then walk down the hallway\n" +
            "When you get to the end of the hallway, turn left into the arcade, then walk down the arcade and turn left into the science wing\n"
          );
        case LANGUAGES:
          return (
            "Turn left after walking through the doors, then walk down the hallway\n" +
            "When you get to the end of the hallway, turn left into the arcade, then walk down the arcade and turn right into the modern foreign languages wing\n"
          );
        case GYM:
          return "Turn right after walking through the doors, then walk forward until you get to the gym\n";
        case ALUMNI:
          return (
            "Turn left after walking through the doors, then walk down the hallway\n" +
            "Go to the end of the arcade, walk up the ramp, turn right, and go through the doors\n"
          );
      }
    case GYM:
      const str =
        "Exit the gym and walk out via the narrow hallway on the right\n";
      switch (to) {
        case SCIENCE:
          return (
            str +
            "Walk until the narrow hallway empties into the Arcade\nTurn left, walk a little bit, and turn left again to get to the science wing\n"
          );
        case LANGUAGES:
          return (
            str +
            "Walk until the narrow hallway empties into the Arcade\nGo straight and a bit to the left; walk forward into the language wing\n"
          );
        case MUSIC:
          return (
            str +
            'After entering the narrow hallway, immediately turn left into the double doors labeled "Music Lyceum"\n'
          );
        case ALUMNI:
          return (
            str +
            "Go to the end of the arcade, walk up the ramp, turn right, and go through the doors\n"
          );
      }
    case ALUMNI:
      switch (to) {
        case SCIENCE:
          return "After walking through the doors, turn left, walk down the ramp, walk through the arcade, and turn right into the 2700s (science wing)\n";
        case LANGUAGES:
          return "After walking through the doors, turn left, walk down the ramp, walk through the arcade, and turn left into the 2600s (modern foreign languages wing)\n";
        case MUSIC:
          return (
            "After walking through the doors, turn left, walk down the ramp, and walk through to the end of the arcade\n" +
            "Turn right and through the long narrow hallway\n" +
            'Turn right when you get to the doors labeled "Music Lyceum" and enter the doors\n'
          );
        case GYM:
          return (
            "After walking through the doors, turn left, walk down the ramp, and walk through to the end of the arcade\n" +
            "Turn right and through the long narrow hallway\n" +
            "The Senior High Gym is straight ahead. Walk inside\n"
          );
      }
  }
};

const alumniHall = new Hallway([
  new Fork(BACK, ConnectionNode.ALUMNI__HALL_TO_2200S, "the 2200s"),
  new Fork(LEFT, ConnectionNode.ALUMNI_HALL_TO_2500S, "the narrow hallway"),
  new Fork(FRONT, ConnectionNode.ALUMNI_HALL_TO_ARCADE, "the arcade"),
]);

const performingArtsCenter2 = new Hallway([
  new Fork(BACK, ConnectionNode.C2500S_TO_ALUMNI_HALL, "Alumni Hall"),
  new Room("2503", RIGHT, undefined, undefined, [
    "Black Box Theatre",
    "Black Box Theater",
    "Theatre",
    "Theater",
  ]),
  new Room("2505", RIGHT, undefined, undefined, ["Scene Shop"]),
  new Fork(
    RIGHT,
    ConnectionNode.C2500S_TO_2500S_CORNER,
    "the corner with the stairs"
  ),
  new Room("2510", RIGHT),
  new Fork(LEFT, ConnectionNode.C2500S_TO_2600S, "the door"),
  new Stairs(FRONT, StairNode.ARTS_B2),
]);

const performingArtsCenter2StairCorner = new Hallway([
  new Fork(
    BACK,
    ConnectionNode.C2500S_CORNER_TO_2500S,
    "the main 2500s hallway"
  ),
  new Stairs(RIGHT, StairNode.ARTS_A2),
]);

const performingArtsCenter3 = new Hallway([
  new Fork(
    RIGHT,
    ConnectionNode.C3500S_TO_3500S_CORNER,
    "the corner with the stairs"
  ),
  new Room("3505", RIGHT),
  new Stairs(FRONT, StairNode.ARTS_B3),
]);

const performingArtsCenter3StairCorner = new Hallway([
  new Fork(
    BACK,
    ConnectionNode.C3500S_CORNER_TO_3500S,
    "the main 3500s hallway"
  ),
  new Stairs(RIGHT, StairNode.ARTS_A3),
  new Room("3503", LEFT),
  new Room("3504", FRONT),
]);

const scienceWing2 = new Hallway([
  new Fork(BACK, ConnectionNode.C2700S_TO_ARCADE, "the arcade"),
  new Stairs(LEFT, StairNode.SCIENCE_A2),
  new Room("2701"),
  new Room("2702", RIGHT),
  new Room("2703"),
  new Room("2704", RIGHT),
  new Room("2705"),
  new Room("2707"),
  new Room("2709"),
  new Room("2740"),
  new Room("2739"),
  new Room("2713"),
  new Room("2715"),
  new Turn(RIGHT),
  new Room("2717"),
  new Room("2719"),
  new Room("2714", RIGHT),
  new Room("2716", RIGHT),
  new Room("2723"),
  new Room("2720", RIGHT),
  new Room("2722", RIGHT),
]);

const scienceWing3 = new Hallway([
  new Stairs(LEFT, StairNode.SCIENCE_A3),
  new Room("3702", RIGHT),
  new Room("3704", RIGHT),
  new Room("3703"),
  new Room("3707"),
  new Room("3709"),
  new Room("3711"),
  new Turn(RIGHT),
  new Room("3713"),
  new Room("3714", RIGHT),
  new Room("3715"),
  new Room("3716", RIGHT),
  new Room("3717"),
  new Room("3724", RIGHT),
  new Room("3726", RIGHT),
]);

const musicEntrance = new Hallway([
  new Stairs(BACK, StairNode.MUSIC_ENTRANCE_TO_1),
  new Fork(
    RIGHT,
    ConnectionNode.MUSIC_ENTRANCE_TO_ARCADE,
    "the long narrow hallway"
  ),
  new Stairs(FRONT, StairNode.MUSIC_ENTRANCE_TO_2),
]);

const musicLyceum1 = new Hallway([
  new Stairs(BACK, StairNode.MUSIC_1_TO_ENTRANCE),
  new Room("1852", RIGHT),
  new Turn(LEFT),
  new Turn(LEFT),
  new Room("1853", RIGHT),
  new Room("1852"),
  new Room("1850", RIGHT, undefined, undefined, ["Band (1850)"]),
  new Room("1857", RIGHT),
  new Room("1851", RIGHT),
  new Fork(
    RIGHT,
    ConnectionNode.MUSIC1_TO_MUSIC_LITTLE_CORNER,
    "the little corner"
  ),
  new Turn(LEFT),
  new Room("1843", LEFT),
  new Room("1840", RIGHT, undefined, undefined, [
    "Instrumental",
    "Band (1840)",
  ]),
  new Room("1841", LEFT),
  new Room("1824", RIGHT),
  new Room("1823", RIGHT),
]);

const musicLittleCorner = new Hallway([
  new Fork(
    BACK,
    ConnectionNode.MUSIC_LITTLE_CORNER_TO_MUSIC1,
    "the music hallway"
  ),
  new Room("1842"),
  new Room("1849", RIGHT),
  new Room("1846", RIGHT),
  new Room("1845", FRONT, undefined, undefined, ["Band (1845)"]),
]);

const musicLyceum2 = new Hallway([
  new Stairs(LEFT, StairNode.MUSIC_2_TO_ENTRANCE),
  new Room("2855"),
  new Room("2853"),
  new Room("2851"),
  new Room("2849"),
  new Room("2852", RIGHT, undefined, undefined, [
    "Schott Recital Hall",
    "Recital Hall",
  ]),
  new Room("2847"),
  new Room("2857", RIGHT),
  new Room("2848", RIGHT, undefined, undefined, ["Strings"]),
  new Turn(LEFT),
  new Room("2846", RIGHT),
  new Room("2844", RIGHT),
  new Room("2842", RIGHT),
  new Room("2843"),
  new Room("2840", RIGHT, undefined, undefined, ["Choir"]),
]);

/** @type {Hallway[]} */
const hallways = [
  hallway1,
  hallway1100s,
  hallway2,
  administrativeCenter,
  entranceArea,
  hallway3,
  modernLanguagesWing1,
  modernLanguagesWing2,
  little2600sHallway,
  performingArtsCenter2,
  performingArtsCenter2StairCorner,
  performingArtsCenter3,
  performingArtsCenter3StairCorner,
  alumniHall,
  arcade,
  scienceWing2,
  scienceWing3,
  musicEntrance,
  musicLyceum1,
  musicLyceum2,
  musicLittleCorner,
  inside2216,
  inside2215,
];
