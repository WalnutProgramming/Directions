// @ts-check

'use strict';

export {LEFT, RIGHT, BACK, FRONT, hallways, stairConnections, hallwayConnections, Room, Turn, Hallway, Stairs, Fork}
// This is where we actually specify the layout
// of our school

// A direction can be LEFT or RIGHT, or if you're
// at the end of a hallway, it can be FRONT or BACK

/** @typedef {-1 | 1 | -2 | 2} Direction */
const LEFT = -1, RIGHT = 1, BACK = -2, FRONT = 2;

/**
 * @param {number} dir A direction (LEFT,RIGHT,FRONT,BACK)
 * @return {string} 'left', 'right', 'front', or 'back'
 */
function dirToString(dir) {
  if (dir == LEFT)
    return 'left';
  else if (dir == RIGHT)
    return 'right'
  else if (dir == FRONT)
    return 'front'
  else
    return 'back'
}

/**
 * @param {number} dir A direction (LEFT,RIGHT,FRONT,BACK)
 * @param {boolean=} lowercase Should the result start with a lowercase letter?
 * @return {string} 'Go straight', 'Turn left', or 'Turn right'
 */
function dirToTurnString(dir, lowercase) {
  if (dir == FRONT || dir == BACK) {
    return (lowercase ? 'g' : 'G') + 'go straight';
  } else {
    return (lowercase ? 't' : 'T') + 'urn ' + dirToString(dir);
  }
}

/**
 * 
 * @param {Direction} dir 
 * @return {boolean}
 */
function isLeftOrRight(dir) {
  return dir == LEFT || dir == RIGHT;
}

class Room {
  /**
   * 
   * @param {?string=} name
   * @param {Direction=} side 
   * @param {?string=} nodeId 
   * @param {string=} prefix 
   */
  constructor(name, side = LEFT, nodeId = null, prefix = 'room') {
    this.name = name;
    this.side = side;
    this.nodeId = nodeId;
    this.prefix = prefix;
  }

  get fullName() {
    if ('name' in this && this.name) {
      return (this.prefix == '' ? '' : (this.prefix + ' ')) + this.name;
    }
  }
}

class Stairs extends Room {
  /**
   * @param {Direction=} side
   * @param {?string=} nodeId
   * @param {string=} stairNumber
   */
  constructor(side, nodeId, stairNumber) {
    super(null, side, nodeId);
    this.stairNumber = stairNumber;
  }

  get fullName() {
    if (this.stairNumber) {
      return 'the ' + this.stairNumber + ' stairs';
    }
    return 'the stairs';
  }
}

class Fork extends Room {
  constructor(side, nodeId, destinationName) {
    super(null, side, nodeId);
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
    return this.partList.findIndex(elem => 'name' in elem && elem.name != null && elem.name.toUpperCase() == name.toUpperCase());
  }

  /**
   * @param {number} ind The index of the room in the hallway
   * @return {string} The id of the "closest" node to the room
   * in the hallway
   */
  idOfClosestNodeToIndex(ind) {
    /** @type {number} */
    let closestInd;
    this.partList.forEach((r, i) => {
      if ('nodeId' in r && r.nodeId && (!closestInd || Math.abs(i - ind) < closestInd)) {
        closestInd = i;
      }
    });

    const closest = this.partList[closestInd]
    if ('nodeId' in closest)
      return closest.nodeId;
  }

  /**
   * @return {string[]}
   */
  get nodes() {
    return this.partList.filter(r => 'nodeId' in r && r.nodeId).map(r => 'nodeId' in r && r.nodeId);
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

    if (from == to) {
      return `Bruh. You at ${fromRoom.fullName}\n`;
    }

    let ret = '';
    const forwardOrBackward = to > from ? 1 : -1;

    if (isLeftOrRight(fromRoom.side)) {
      ret += dirToTurnString(forwardOrBackward * fromRoom.side);
      ret += ` out of ${fromRoom.fullName}`;
      ret += '\n';
    }
    
    for (let i = from; i != to; i += forwardOrBackward) {
      const current = this.partList[i];
      if (current instanceof Turn) {
        const direction = current.direction * forwardOrBackward;
        const prevRoom = this.partList[i - forwardOrBackward];
        ret += 'Continue, then ' + dirToTurnString(direction, true);
        if (prevRoom instanceof Room && isLeftOrRight(prevRoom.side)) {
          ret += ` (after passing ${prevRoom.fullName} on your ${dirToString(prevRoom.side * forwardOrBackward)})`;
        }
        ret += '\n';
      }
    }

    ret += `Continue until you arrive at ${toRoom.fullName}`;
    console.log(toRoom);
    if (isLeftOrRight(toRoom.side)) {
      ret += ` on your ${dirToString(toRoom.side * forwardOrBackward)}`
    }
    ret += '\n'

    return ret;
  }
}


/** @type {Hallway} */
const hallway3 = new Hallway([
  new Stairs(LEFT, 'stair-a3', '2018'),
  new Room('3314', LEFT),
  new Room('3315', RIGHT),
  new Room('3312', LEFT),
  new Room('3313', RIGHT),
  new Room('3311', RIGHT),
  new Turn(LEFT),
  new Room('3310', RIGHT), // these 2 rooms sometimes give weird directions
  new Room('3309', RIGHT), // 
  new Turn(RIGHT),
  new Stairs(LEFT, 'stair-b3', '2025'),
  new Room('3305', RIGHT),
  new Room('3302', LEFT),
  new Room('3303', RIGHT),
  new Room('3301', RIGHT),
  new Stairs(LEFT, 'stair-c3', '2024'),
  new Room('3210', LEFT),
  new Room('3207', LEFT),
  new Room('3205', RIGHT),
  new Room('3208', LEFT),
  //rooms without room numbers have prefix 'the'
  new Room('Library', RIGHT, null, 'the'), 
  new Room('3206', LEFT),
  new Room('3204', LEFT),
  new Room('3202', LEFT),
  new Room('3201', RIGHT),
  new Stairs(LEFT, 'stair-d3', '2015'),
  new Room('3102', LEFT),
  new Room('3101', RIGHT),
  new Room('3104', LEFT),
  new Room('3103', RIGHT),
  new Room('3105', RIGHT),
  new Turn(RIGHT),
  new Room('3112', LEFT),
  new Room('3110', RIGHT),
  new Room('3111', RIGHT),
  new Turn(LEFT),
  new Room('3113', RIGHT),
  new Room('3114', LEFT),
  new Room('3115', RIGHT),
  new Room('3117', RIGHT),
  new Stairs(LEFT, 'stair-f3', '2010'),
]);

/** @type {Hallway} */
const hallway2 = new Hallway([
  new Stairs(LEFT, 'stair-a2', '2018'),
  new Room('2310'),
  new Room('2311', RIGHT),
  new Room('2308'),
  new Room('2309', RIGHT),
  new Room('2307', RIGHT),
  new Turn(LEFT),
  new Room('2306', RIGHT),
  new Turn(RIGHT),
  new Fork(LEFT, '2300s to 2600s', 'the 2600s'),
  new Stairs(LEFT, 'stair-b2', '2025'),
  new Room('2302', RIGHT),
  new Room('2301', RIGHT),
  new Room('2205', RIGHT),
  new Stairs(LEFT, 'stair-c2', '2024'),
  new Room('2204'),
  new Room('2203', RIGHT),
  new Room('2202'),
  new Room('2207', RIGHT),
  new Room('2210'),
  new Room('2209', RIGHT),
  new Stairs(LEFT, 'stair-d2', '2015'),
  new Room('2101', RIGHT),
  new Room('2103', RIGHT),
  new Room('2105', RIGHT),
  new Turn(RIGHT),
  new Room('2109', RIGHT),
  new Room('2112'),
  new Room('2110', RIGHT),
  new Turn(LEFT),
  new Room('2111', RIGHT),
  new Room('2114'),
  new Room('2113', RIGHT),
  new Room('2115', RIGHT),
  new Stairs(LEFT, 'stair-f2', '2010'),
]);

/** @type {Hallway} */
const hallway1 = new Hallway([
  new Stairs(LEFT, 'stair-a1', '2018'),
  new Room('1314'),
  new Room('1315', RIGHT),
  new Room('1312'),
  new Room('1313', RIGHT),
  new Room('1311', RIGHT),
  new Turn(LEFT),
  new Room('1310', RIGHT),
  new Room('1309', RIGHT),
  new Turn(RIGHT),
  new Fork(LEFT, '1300s to 1600s', 'the 1600s'),
  new Stairs(LEFT, 'stair-b1', '2025'),
  new Room('1305', RIGHT),
  new Room('1302', RIGHT),
  new Room('1301', RIGHT),
]);

const hallway1100s = new Hallway([
  new Room('1105', RIGHT),
  new Room('1108'),
  new Turn(LEFT),
  new Room('1109', RIGHT),
  new Room('1110'),
  new Room('1111', RIGHT),
  new Room('1113', RIGHT),
  new Stairs(LEFT, 'stair-f1', '2010'),
]);

/** @type Hallway */
const modernLanguagesWing1 = new Hallway([
  new Fork(BACK, '1600s to 1300s', 'the 1300s'),
  new Turn(LEFT),
  new Room('1601'),
  new Room('1602'),
  new Turn(RIGHT),
  new Room('1604', RIGHT),
  new Room('1603'),
  new Room('1605'),
  new Room('1604', RIGHT),
  new Room('1606'),
  new Room('1607'),
  new Room('1608'),
  new Stairs(LEFT, 'stair-science-a1'),
]);

/** @type {Hallway} */
const modernLanguagesWing2 = new Hallway([
  new Fork(BACK, '2600s to 2300s', 'the 2300s'),
  new Turn(LEFT),
  new Room('2604', RIGHT),
  new Room('2601'),
  new Room('2602'),
  new Turn(RIGHT),
  new Room('2603'),
  new Room('2605'),
  new Room('2607'),
  new Room('2609'),
  new Room('2611'),
  new Fork(FRONT, '2600s to arcade'),
]);

/** @type {Hallway} */
const arcade = new Hallway([
  new Fork(FRONT, 'arcade to 2600s', 'the 2600s'),
  new Fork(FRONT, 'arcade to 2700s', 'the 2700s'),
]);

const scienceWing2 = new Hallway([
  new Fork(BACK, '2700s to arcade', 'the arcade'),
  new Stairs(LEFT, 'stair-science-a2'),
  new Room('2701'),
  new Room('2702', RIGHT),
  new Room('2703'),
  new Room('2704', RIGHT),
  new Room('2705'),
  new Room('2707'),
  new Room('2709'),
  new Room('2740'),
  new Room('2739'),
  new Room('2713'),
  new Room('2715'),
  new Turn(RIGHT),
  new Room('2717'),
  new Room('2719'),
  new Room('2714', RIGHT),
  new Room('2716', RIGHT),
  new Room('2723'),
  new Room('2720', RIGHT),
  new Room('2722', RIGHT),
]);

const scienceWing3 = new Hallway([
  new Stairs(LEFT, 'stair-science-a3'),
  new Room('3702', RIGHT),
  new Room('3704', RIGHT),
  new Room('3703'),
  new Room('3707'),
  new Room('3709'),
  new Room('3711'),
  new Turn(RIGHT),
  new Room('3713'),
  new Room('3714', RIGHT),
  new Room('3715'),
  new Room('3716', RIGHT),
  new Room('3717'),
  new Room('3724', RIGHT),
  new Room('3726', RIGHT),
]);

arcade.getDirectionsFromIndices = function(from, to) {
  if (from == 0 && to == 1) {
    return 'Go straight and a bit to the right to get to the 2700s, the science wing\n'
  } else {
    return 'Go straight and a bit to the right to get to the 2600s, the modern languages wing\n'
  }
};

/** @type {Hallway[]} */
const hallways = [hallway1, hallway1100s, hallway2, hallway3, modernLanguagesWing1, modernLanguagesWing2, arcade, scienceWing2, scienceWing3];

/** @type string[][] */
const stairConnections = [
  ['stair-a1', 'stair-a2', 'stair-a3'],
  ['stair-b1', 'stair-b2', 'stair-b3'],
  ['stair-c2', 'stair-c3'],
  ['stair-d2', 'stair-d3'],
  ['stair-f1', 'stair-f2', 'stair-f3'],
  ['stair-science-a1', 'stair-science-a2', 'stair-science-a3'],
];

/** @type [string, string][] */
const hallwayConnections = [
  ['1300s to 1600s', '1600s to 1300s'],
  ['2300s to 2600s', '2600s to 2300s'],
  ['2600s to arcade', 'arcade to 2600s'],
  ['2700s to arcade', 'arcade to 2700s'],
]

