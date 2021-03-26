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
import { ConnectionNodeId, WalnutHallway, StairNodeId } from "../shared";

const { LEFT, RIGHT, FRONT } = Direction;

const hallways: WalnutHallway[] = [
  // entrance to music wing
  // (go up to get the 2nd floor, down to get the 1st floor science wing)
  new Hallway([
    new Stairs(FRONT, onFloor("stair music entrance to 1", 2)),
    new Fork(
      RIGHT,
      "music entrance to long hallway",
      "the long narrow hallway"
    ),
    // TODO
    new Stairs(LEFT, onFloor("elevator music", 1.5), "the elevator"),
    new Stairs(FRONT, onFloor("stair music entrance to 2", 1)),
  ]),

  // music lyceum 1st floor (1800s)
  new Hallway<ConnectionNodeId, StairNodeId>([
    new Stairs(FRONT, onFloor("stair music entrance to 1", 1)),
    new Room("1852", RIGHT),
    new Turn(LEFT),
    new Turn(LEFT),
    new Room("1853", RIGHT),
    new Stairs(RIGHT, onFloor("elevator music", 1), "the elevator"),
    new Room("1850", RIGHT, { aliases: ["Band (1850)"] }),
    new Room("1857", RIGHT),
    new Room("1851", RIGHT),
    new Fork(RIGHT, "music 1 to music little corner", "the little corner"),
    new Turn(LEFT),
    new Room("1843", LEFT),
    new Room("1840", RIGHT, { aliases: ["Instrumental", "Band (1840)"] }),
    new Room("1841", LEFT),
    new Room("1824", RIGHT),
    new Room("1823", RIGHT),
    new Turn(RIGHT),
    new Turn(RIGHT),
    new Stairs(FRONT, onFloor("stair to 1800s", 1)),
  ]),

  // little corner in the 1st floor music wing
  new Hallway([
    new Fork(
      FRONT,
      reverseConnection("music 1 to music little corner"),
      "the music hallway"
    ),
    new Room("1842"),
    new Room("1849", RIGHT),
    new Room("1846", RIGHT),
    new Room("1845", FRONT, { aliases: ["Band (1845)"] }),
  ]),

  // 2nd floor music wing (2800s)
  new Hallway([
    new Stairs(LEFT, onFloor("stair music entrance to 2", 2)),
    new Stairs(LEFT, onFloor("elevator music", 2), "the elevator"),
    new Room("2855"),
    new Room("2853"),
    new Room("2851"),
    new Room("2849"),
    new Room("2852", RIGHT, {
      aliases: ["Schott Recital Hall", "Recital Hall"],
    }),
    new Room("2847"),
    new Room("2857", RIGHT),
    new Room("2848", RIGHT, { aliases: ["Strings", "Orchestra"] }),
    new Turn(LEFT),
    new Room("2846", RIGHT),
    new Room("2844", RIGHT),
    new Room("2842", RIGHT),
    new Room("2843"),
    new Room("2840", RIGHT, { aliases: ["Choir"] }),
    new Stairs(FRONT, onFloor("stair music 2 back", 3)),
  ]),
];
export default hallways;
