// migrate TODO remove
// @ts-nocheck

import {
  Direction,
  Room,
  Turn,
  Hallway,
  Stairs,
  Fork,
  SimpleHallway,
  onFloor,
  reverseConnection,
} from "room-finder";
import { ConnectionNodeId, WalnutHallway } from "../shared";

const { LEFT, RIGHT, FRONT } = Direction;

const hallways: WalnutHallway[] = [
  // 1st floor modern languages wing (1600s)
  new Hallway([
    new Fork(FRONT, reverseConnection("1300s to 1600s"), "the 1300s"),
    new Turn(LEFT),
    new Room("1601"),
    new Room("1602"),
    new Turn(RIGHT),
    new (class extends Room<ConnectionNodeId> {
      onLeave(forwardOrBackward: -1 | 1) {
        return super
          .onLeave(forwardOrBackward, true, false)
          .replace("\n", " through the door closest to the desk\n");
      }
    })("1604", RIGHT, { aliases: ["Language Lab"] }),
    new Room("1603"),
    new Room("1605"),
    new Room("1606"),
    new Room("1607"),
    new Room("1608"),
    new Stairs(LEFT, onFloor("stair science a1", 1), undefined, 4),
  ]),

  // 2nd floor modern languages wing (2600s)
  new Hallway([
    new Fork(FRONT, reverseConnection("2300s to 2600s"), "the 2300s"),
    new Turn(LEFT),
    new Room("2604", RIGHT),
    new Room("2601"),
    new Room("2602"),
    new Turn(RIGHT),
    new Room("2603"),
    new Room("2605"),
    new Fork(RIGHT, "2600s to 2600s little hallway", "the little hallway"),
    new Room("2607"),
    new Room("2609"),
    new Room("2611"),
    new Fork(FRONT, "2600s to arcade", "the arcade"),
  ]),

  // little corner in the 2600s (go through here to get to the 2500s behind the auditorium)
  new Hallway([
    new Fork(
      FRONT,
      reverseConnection("2600s to 2600s little hallway"),
      "the 2600s"
    ),
    // There are a few stairs right here
    new (class extends Room<ConnectionNodeId> {
      onPass(forwardOrBackward: -1 | 1, prevRoom: Room<string>) {
        return `Go ${forwardOrBackward === -1 ? "up" : "down"} the 3 steps\n`;
      }
    })(),
    new Fork(LEFT, reverseConnection("2500s to 2600s"), "the door"),
  ]),
];
export default hallways;
