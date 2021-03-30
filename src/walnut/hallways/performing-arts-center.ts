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
import {
  ConnectionNodeId,
  WalnutHallway,
  StairNodeId,
  COVID_ONE_WAY_HALLWAY_AND_STAIRS,
} from "../shared";

const { LEFT, RIGHT, FRONT } = Direction;

const hallways: WalnutHallway[] = [
  // alumni hall
  new Hallway<ConnectionNodeId, StairNodeId>([
    new Fork(FRONT, "alumni hall to 2200s", "the 2200s"),
    new Fork(
      LEFT,
      reverseConnection("2500s to alumni hall"),
      "the narrow hallway"
    ),
    new Fork(FRONT, "alumni hall to arcade", "the arcade"),
  ]),

  // 2500s (2nd floor Performing Arts Center, behind the auditorium)
  new Hallway(
    [
      new Fork(FRONT, "2500s to alumni hall", "Alumni Hall"),
      new Room("2503", RIGHT, {
        aliases: ["Black Box Theater"],
      }),
      new Room("2505", RIGHT, { aliases: ["Scene Shop"] }),
      new Fork(
        RIGHT,
        reverseConnection("2500s corner to 2500s"),
        "the corner with the stairs"
      ),
      new Room("2510", RIGHT),
      new Fork(LEFT, "2500s to 2600s", "the door"),
      new Stairs(FRONT, onFloor("stair arts b", 2)),
    ],
    { oneWay: COVID_ONE_WAY_HALLWAY_AND_STAIRS && "forward" }
  ),

  // 2500s stair corner
  new Hallway([
    new Fork(FRONT, "2500s corner to 2500s", "the main 2500s hallway"),
    new Stairs(RIGHT, onFloor("stair arts a", 2)),
  ]),

  // performingArtsCenter3
  new Hallway([
    new Fork(
      RIGHT,
      reverseConnection("3500s corner to 3500s"),
      "the corner with the stairs"
    ),
    new Room("3505", RIGHT),
    new Stairs(FRONT, onFloor("stair arts b", 3)),
  ]),

  // 3500s (3rd floor Performing Arts Center, behind the auditorium)
  new Hallway([
    new Fork(FRONT, "3500s corner to 3500s", "the main 3500s hallway"),
    new Stairs(RIGHT, onFloor("stair arts a", 3)),
    new Room("3503", LEFT),
    new Room("3504", FRONT),
  ]),
];
export default hallways;
