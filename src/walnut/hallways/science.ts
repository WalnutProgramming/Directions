import {
  Direction,
  Room,
  Turn,
  Stairs,
  Fork,
  onFloor,
  reverseConnection,
} from "room-finder";
import type { ConnectionNodeId} from "../shared";
import { WalnutHallway } from "../shared";

const { LEFT, RIGHT, FRONT } = Direction;

const hallways: WalnutHallway[] = [
  // 2nd floor science wing (2700s)
  new WalnutHallway([
    new (class extends Fork<ConnectionNodeId> {
      onLeave() {
        return "";
      }
    })(FRONT, "2700s to arcade", "the arcade"),
    new Stairs(LEFT, onFloor("stair science a3", 2)),
    new Stairs(LEFT, onFloor("stair science a1", 2)),
    new Stairs(LEFT, onFloor("elevator science", 2), "the elevator"),
    new Room("2701"),
    new Room("2702", RIGHT),
    new Room("2703"),
    new Room("2704", RIGHT),
    new Room("2705"),
    new Room("2707"),
    new Room("Forum", RIGHT, { prefix: "the", aliases: ["2740"] }),
    new Fork(LEFT, "2700s to 2739", "Area Across the Forum"),
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
    new Stairs(LEFT, onFloor("stair science b", 2)),
  ]),
  // 2739 (Area across the Forum)
  new WalnutHallway([
    new Fork(
      FRONT,
      reverseConnection("2700s to 2739"),
      "Area Across the Forum"
    ),
    new Room("2709"),
    new Room("2711", RIGHT),
  ]),
  // 3rd floor science wing (3700s)
  new WalnutHallway([
    new Stairs(LEFT, onFloor("stair science a3", 3)),
    new Stairs(LEFT, onFloor("elevator science", 3), "the elevator"),
    new Room("3701", LEFT, { aliases: ["Computer Lab - Engineering"] }),
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
    new Stairs(LEFT, onFloor("stair science b", 3)),
  ]),
];
export default hallways;
