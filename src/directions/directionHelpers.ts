export { dirToString, dirToTurnString, isLeftOrRight };

import Direction from "./Direction";

const { LEFT, RIGHT, FRONT, BACK } = Direction;

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
