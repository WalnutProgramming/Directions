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

  /**
   * @param {-1 | 1} forwardOrBackward Whether we're going forward or backward through this hallway
   * @param {Room | Turn} prevRoom The previous room
   * @return {string} What we should say when you pass this room
   */
  onPass(forwardOrBackward, prevRoom) {
    return '';
  }

  /**
   * 
   * @param {-1 | 1} forwardOrBackward Whether we're going forward or backward through this hallway
   * @return {string} What we should say when we go out of this room
   */
  onLeave(forwardOrBackward) {
    let ret = '';
    if (isLeftOrRight(this.side)) {
      ret += dirToTurnString(forwardOrBackward * this.side);
      ret += ` out of ${this.fullName}`;
      ret += '\n';
    }
    return ret;
  }

  /**
   * 
   * @param {-1 | 1} forwardOrBackward Whether we're going forward or backward through this hallway
   * @return {string} What we should say when we enter this room
   */
  onArrive(forwardOrBackward) {
    let ret = '';
    ret += `Continue until you arrive at ${this.fullName}`;
    if (isLeftOrRight(this.side)) {
      ret += ` on your ${dirToString(this.side * forwardOrBackward)}`
    }
    ret += '\n'
    return ret;
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

  /**
   * @param {-1 | 1} forwardOrBackward Whether we're going forward or backward through this hallway
   * @param {Room | Turn} prevRoom The previous room
   * @return {string} What we should say when you pass this turn
   */
  onPass(forwardOrBackward, prevRoom) {
    let ret = '';
    const direction = this.direction * forwardOrBackward;
    ret += 'Continue, then ' + dirToTurnString(direction, true);
    if (prevRoom instanceof Room && isLeftOrRight(prevRoom.side)) {
      ret += ` (after passing ${prevRoom.fullName} on your ${dirToString(prevRoom.side * forwardOrBackward)})`;
    }
    ret += '\n';
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

    ret += fromRoom.onLeave(forwardOrBackward);
    
    for (let i = from; i != to; i += forwardOrBackward) {
      const current = this.partList[i];
      const prevInd = i - forwardOrBackward;
      const prevRoom = prevInd >= 0 && prevInd < this.partList.length && this.partList[i - forwardOrBackward];
      ret += current.onPass(forwardOrBackward, prevRoom);
    }

    ret += toRoom.onArrive(forwardOrBackward);

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
  new Fork(FRONT, '2600s to arcade', 'the arcade'),
]);

/** @type {Hallway} */
const arcade = new Hallway([
  new Fork(0, 'arcade to 2600s', 'the 2600s'),
  new Fork(0, 'arcade to 2700s', 'the 2700s'),
  new Fork(0, 'arcade to musicEntrance', 'the music lyceum'),
  new Room('Senior High Gym', 0, null, "the")
  // add other hallways at the end
]);

arcade.getDirectionsFromIndices = function(from, to) {
  const LANGUAGES = 0, SCIENCE = 1, MUSIC = 2, GYM = 3;
  switch (from) {
    case LANGUAGES:
      switch (to) {
        case SCIENCE: return 'Go straight and a bit to the right to get to the 2700s, the science wing\n'
        //case MUSIC: return 'Turn left, then walk down to the end of the arcade and turn right\nWalk down the hallway, and turn right when you get to the doors\n'
        case MUSIC: return 'Go straight and a bit to the left through the long narrow hallway\nTurn right when you get to the doors labeled "Music Lyceum" and enter the doors\n'
        case GYM: return 'Go straight and a bit to left, and go to the end of the hall\nThe Senior High Gym is straight ahead. Walk inside'
      }
    case SCIENCE:
      switch (to) {
        case LANGUAGES: return 'Go straight and a bit to the right to get to the 2600s, the modern languages wing\n'
        case MUSIC: return 'Turn right, then walk down to the end of the arcade and turn right\nWalk down the hallway, and turn right when you get to the doors\n'
        case GYM: return 'Turn right when you leave the science wing.\nWalk forward and turn right again, then walk down to the end of the narrow hallway\n'
      }
    case MUSIC:
      switch (to) {
        case SCIENCE: return 'Turn left after walking through the doors, then walk down the hallway\nWhen you get to the end of the hallway, turn left into the arcade, then walk down the arcade and turn left into the science wing\n'
        case LANGUAGES: return 'Turn left after walking through the doors, then walk down the hallway\nWhen you get to the end of the hallway, turn left into the arcade, then walk down the arcade and turn right into the modern foreign languages wing\n'
        case GYM: return 'Turn left after walking through the doors, then walk forward until you get to the gym\n'
      }
    case GYM:
      const str = 'Exit the gym and walk out via the narrow hallway on the right\n';
      switch (to) {
        case SCIENCE: return str + 'Walk until the narrow hallway empties into the Arcade\nTurn left, walk a little bit, and turn left again to get to the science wing\n'
        case LANGUAGES: return str + 'Walk until the narrow hallway empties into the Arcade\nGo straight and a bit to the left; walk forward into the language wing\n'
        case MUSIC: return str + 'After entering the narrow hallway, immediately turn left into the double doors labeled "Music Lyceum"\n'
      }
  }
};

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

const musicEntrance = new Hallway([
  new Stairs(BACK, 'music-entrance-to-1'),
  new Fork(RIGHT, 'musicEntrance to arcade', 'the arcade'),
  new Stairs(FRONT, 'music-entrance-to-2'),
]);

const musicLyceum1 = new Hallway([
  new Stairs(BACK, 'music-1-to-entrance'),
  new Room('1852', RIGHT),
  new Turn(LEFT),
  new Turn(LEFT),
  new Room('1853', RIGHT),
  new Room('1852'),
  new Room('1850', RIGHT),
  new Room('1857', RIGHT),
  new Room('1851', RIGHT),
  new Room('1849', RIGHT),
  new Fork(RIGHT, 'music1 to musicLittleCorner', 'the little corner'),
  new Turn(LEFT),
  new Room('1843', LEFT),
  new Room('1840', RIGHT),
  new Room('1841', LEFT),
  new Room('1824', RIGHT),
  new Room('1823', RIGHT),
]);

const musicLittleCorner = new Hallway([
  new Fork(BACK, 'musicLittleCorner to music1', 'the music hallway'),
  new Room('1842'),
  new Room('1849', RIGHT),
  new Room('1846', RIGHT),
  new Room('1845', FRONT),
]);

const musicLyceum2 = new Hallway([
  new Stairs(LEFT, 'music-2-to-entrance'),
  new Room('2855'),
  new Room('2853'),
  new Room('2851'),
  new Room('2849'),
  new Room('2852', RIGHT),
  new Room('2847'),
  new Room('2857', RIGHT),
  new Room('2848', RIGHT),
  new Turn(LEFT),
  new Room('2846', RIGHT),
  new Room('2844', RIGHT),
  new Room('2842', RIGHT),
  new Room('2843'),
  new Room('2840', RIGHT),
]);

/** @type {Hallway[]} */
const hallways = [
  hallway1,
  hallway1100s, 
  hallway2, 
  hallway3, 
  modernLanguagesWing1, 
  modernLanguagesWing2, 
  arcade, 
  scienceWing2, 
  scienceWing3, 
  musicEntrance, 
  musicLyceum1, 
  musicLyceum2, 
  musicLittleCorner,
];


//When listing stairs, the furthest down entrance to the stairs goes first
/** @type string[][] */
const stairConnections = [
  ['stair-a1', 'stair-a2', 'stair-a3'],
  ['stair-b1', 'stair-b2', 'stair-b3'],
  ['stair-c2', 'stair-c3'],
  ['stair-d2', 'stair-d3'],
  ['stair-f1', 'stair-f2', 'stair-f3'],
  ['stair-science-a1', 'stair-science-a2', 'stair-science-a3'],
  ['music-entrance-to-2', 'music-2-to-entrance'],
  ['music-1-to-entrance', 'music-entrance-to-1'],
];

/** @type [string, string][] */
const hallwayConnections = [
  ['1300s to 1600s', '1600s to 1300s'],
  ['2300s to 2600s', '2600s to 2300s'],
  ['2600s to arcade', 'arcade to 2600s'],
  ['2700s to arcade', 'arcade to 2700s'],
  ['musicEntrance to arcade', 'arcade to musicEntrance'],
  ['music1 to musicLittleCorner', 'musicLittleCorner to music1'],
]

