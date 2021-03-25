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
import { WalnutHallway } from "../shared";

const { LEFT, RIGHT, FRONT } = Direction;

const hallways: WalnutHallway[] = [
  // 1300s
  new Hallway([
    new Stairs(LEFT, onFloor("stair a", 1), "the 2018 stairs"),
    new Room("1314"),
    new Room("1315", RIGHT),
    new Room("1312"),
    new Room("1313", RIGHT),
    new Room("1311", RIGHT),
    new Turn(LEFT),
    new Room("1310", RIGHT),
    new Room("1309", RIGHT),
    new Stairs(LEFT, onFloor("elevator a", 1), "the elevator"),
    new Turn(RIGHT),
    new Fork(LEFT, "1300s to 1600s", "the 1600s"),
    new Stairs(LEFT, onFloor("stair b", 1), "the 2025 stairs"),
    new Room("1305", RIGHT),
    new Room("1303", RIGHT),
    new Room("1304", LEFT),
    new Room("1301", RIGHT),
    new Room("1300"),
  ]),

  // 1100s
  new Hallway([
    new Room("1106", FRONT),
    new Room("1107", RIGHT),
    new Fork(
      LEFT,
      reverseConnection("1108 & 1105 to 1100s"),
      "the 1108 and 1105 hallway"
    ),
    new Room("1109", RIGHT),
    new Room("1110"),
    new Room("1111", RIGHT),
    new Room("1113", RIGHT),
    new Stairs(LEFT, onFloor("stair f", 1), "the 2010 stairs"),
  ]),

  // 1108 and 1105
  new Hallway([
    new Fork(FRONT, "1108 & 1105 to 1100s", "the latter 1100s"),
    new Room("1108", RIGHT),
    new Room("1105", LEFT),
    new Turn(LEFT),
    new Stairs(RIGHT, onFloor("elevator b", 1), "the elevator"),
    // fork to the wacky confusing cafeteria part goes here
  ]),
];
export default hallways;
