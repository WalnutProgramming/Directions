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
  // 2nd floor science wing (2700s)
  new Hallway([
    new (class extends Fork<ConnectionNodeId> {
      onLeave() {
        return "";
      }
    })(FRONT, "2700s to arcade", "the arcade"),
    new Stairs(LEFT, onFloor("stair science a", 2)),
    new Stairs(LEFT, onFloor("elevator science", 2), "the elevator"),
    new Room("2701"),
    new Room("2702", RIGHT),
    new Room("2703"),
    new Room("2704", RIGHT),
    new Room("2705"),
    new Room("2707"),
    new Room("2709"),
    new Room("Forum", RIGHT, { prefix: "the", aliases: ["2740"] }),
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
  ]),

  // 3rd floor science wing (3700s)
  new Hallway([
    new Stairs(LEFT, onFloor("stair science a", 3)),
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
  ]),
];
export default hallways;