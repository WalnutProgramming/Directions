/* eslint-disable default-case */
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
import { WalnutHallway, ConnectionNodeId, StairNodeId } from "../shared";

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
    // TODO: is the following staircase actually labelled 2024?
    new Stairs(LEFT, onFloor("stair c", 1)),
    new Room("1300"),
    new Fork(RIGHT, "1300s to cafeteria", "the cafeteria"),
  ]),

  // cafeteria
  new (class extends Hallway<ConnectionNodeId, StairNodeId> {
    getDirectionsFromIndices(
      from: number,
      to: number,
      options: {
        isBeginningOfDirections: boolean;
        isEndOfDirections: boolean;
        entranceWasStraight: boolean;
      }
    ) {
      const [H1300S, CAFETERIA, DELIVERY] = [0, 1, 2];

      if (from === CAFETERIA) {
        switch (to) {
          case H1300S:
            return "Go out of the cafeteria by the left entrance to get to the 1300s";
          case DELIVERY:
            return "Go out of the cafeteria by the right entrance through the twisty hallway to get to the delivery hallway";
        }
      } else if (to === CAFETERIA) {
        return "";
      }

      return super.getDirectionsFromIndices(from, to, options);
    }
  })([
    new Fork(LEFT, reverseConnection("1300s to cafeteria"), "the 1300s"),
    new Room("Cafeteria", LEFT, {
      aliases: ["Student Dining", "1230", "Lunchroom"],
    }),
    new Fork(
      LEFT,
      "cafeteria to delivery hallway",
      "the twisty hallway to the delivery hallway"
    ),
  ]),

  // delivery hallway
  new Hallway([
    new Fork(
      RIGHT,
      reverseConnection("cafeteria to delivery hallway"),
      "the twisty hallway to the cafeteria"
    ),
    new Fork(
      LEFT,
      "delivery hallway to lower 1400s",
      "the door to the lower 1400s"
    ),
    new Fork(RIGHT, "delivery hallway to 1100s", "the 1100s"),
  ]),

  // lower 1400s
  new Hallway([
    new Room("Fitness Room", FRONT, { aliases: ["1418"], prefix: "the" }),
    // 1410 and 1412 are both the Multi-Purpose Room, so we choose one
    // to call the Multi-Purpose Room
    new Room("1412"),
    new Room("1410", LEFT, { aliases: ["Multi-Purpose Room"] }),
    new Turn(RIGHT),
    new Fork(
      LEFT,
      reverseConnection("delivery hallway to lower 1400s"),
      "the delivery hallway"
    ),
  ]),

  // the 1.5th floor landing
  new Hallway([
    new Stairs(LEFT, onFloor("stair d", 1.5), "the stairs"),
    new Fork(LEFT, "1.5th floor landing to upper 1400s", "the upper 1400s"),
    new Stairs(RIGHT, onFloor("stair 1100s to 1.5th floor", 2), "the stairs"),
    new Room("1458"),
    new Stairs(LEFT, onFloor("elevator b", 1.5), "the elevator"),
  ]),

  new Hallway([
    new Room("1457"),
    new Room("1454", RIGHT),
    new Room("1453", RIGHT),
    new Room("1452", RIGHT),
    new Room("1451", RIGHT),
    new Room("1450", RIGHT),
    new Fork(
      FRONT,
      reverseConnection("1.5th floor landing to upper 1400s"),
      "the 1.5th floor landing"
    ),
  ]),

  // early 1100s
  new Hallway([
    new Fork(
      LEFT,
      reverseConnection("delivery hallway to 1100s"),
      "the delivery hallway"
    ),
    new Room("1101"),

    // There are a few stairs right here
    new (class extends Room<ConnectionNodeId> {
      onPass(forwardOrBackward: -1 | 1, prevRoom: Room<string>) {
        return `Go ${
          forwardOrBackward === -1 ? "down" : "up"
        } the small set of stairs\n`;
      }
    })(),

    new Stairs(LEFT, onFloor("stair 1100s to 1.5th floor", 1), "the stairs"),

    new Stairs(LEFT, onFloor("elevator b", 1), "the elevator"),
    new Turn(RIGHT),
    new Room("1105", RIGHT),
    new Room("1108", LEFT),
    new Fork(FRONT, "1108 & 1105 to 1100s", "the latter 1100s"),
  ]),

  // latter 1100s
  new Hallway([
    // these 2 rooms are in the corner
    new Room("1106", FRONT),
    new Room("1107", RIGHT),

    // main 1100s continued
    new Fork(
      LEFT,
      reverseConnection("1108 & 1105 to 1100s"),
      "the early 1100s"
    ),
    new Room("1109", RIGHT),
    new Room("1110"),
    new Room("1111", RIGHT),
    new Room("1113", RIGHT),
    new Stairs(LEFT, onFloor("stair f", 1), "the 2010 stairs"),
  ]),
];
export default hallways;
