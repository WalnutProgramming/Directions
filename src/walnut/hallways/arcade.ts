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
import { ConnectionNodeId, WalnutHallway, StairNodeId } from "../shared";

const { LEFT, RIGHT, FRONT } = Direction;

const hallways: WalnutHallway[] = [
  // arcade
  new (class extends Hallway<ConnectionNodeId, StairNodeId> {
    getDirectionsFromIndices(from: number, to: number) {
      const LANGUAGES = 1;
      const SCIENCE = 2;
      const LONG_HALLWAY = 3;
      const ALUMNI = 0;
      switch (from) {
        case LANGUAGES:
          switch (to) {
            case SCIENCE:
              return "go straight and a bit to the right to get to the 2700s, the science wing\n";
            case LONG_HALLWAY:
              return "go straight and a bit to the left to get to the long narrow hallway\n";
            case ALUMNI:
              return "turn right, go to the end of the arcade, go up the ramp, and go through the doors on your right\n";
            default:
              return "";
          }
        case SCIENCE:
          switch (to) {
            case LANGUAGES:
              return "go straight and a bit to the right to get to the 2600s, the modern languages wing\n";
            case LONG_HALLWAY:
              return "turn right\ngo to the end of the arcade and turn right into the narrow hallway\n";
            case ALUMNI:
              return "turn left\ngo to the end of the arcade, go up the ramp, and go through the doors on your right\n";
            default:
              return "";
          }
        case LONG_HALLWAY:
          switch (to) {
            case SCIENCE:
              return "turn left and go down the arcade and turn left into the science wing\n";
            case LANGUAGES:
              return "turn left and go down the arcade and turn right into the modern foreign languages wing\n";
            case ALUMNI:
              return "turn left and go to the end of the arcade\ngo up the ramp, then go through the doors on your right\n";
            default:
              return "";
          }
        case ALUMNI:
          switch (to) {
            case SCIENCE:
              return "turn left\ngo down the ramp, go through the arcade, and turn right into the 2700s (science wing)\n";
            case LANGUAGES:
              return "turn left\ngo down the ramp, go through the arcade, and turn left into the 2600s (modern foreign languages wing)\n";
            case LONG_HALLWAY:
              return (
                "turn left\ngo down the ramp, and go all the way to the other end of the arcade\n" +
                "turn right to get to the long narrow hallway\n"
              );
            default:
              return "";
          }
        default:
          return "";
      }
    }
  })(
    [
      // The directions that we use here don't matter since we
      // override the instructions for the arcade anyway.
      new Fork(
        FRONT,
        reverseConnection("alumni hall to arcade"),
        "Alumni Hall"
      ),
      new Fork(FRONT, reverseConnection("2600s to arcade"), "the 2600s"),
      new Fork(FRONT, reverseConnection("2700s to arcade"), "the 2700s"),
      new Fork(
        FRONT,
        reverseConnection("long hallway to arcade"),
        "the long, narrow hallway"
      ),
    ],
    { allowFrontConnectionsInMiddle: true }
  ),

  // long hallway between arcade and music wing
  new Hallway([
    new Fork(FRONT, "long hallway to arcade", "the arcade"),
    new Fork(
      RIGHT,
      reverseConnection("music entrance to long hallway"),
      'the doors labeled "Music Lyceum"'
    ),
    new Turn(RIGHT),
    new Room("Senior High Gym", LEFT, {
      prefix: "the",
      aliases: ["2800", "2801"],
    }),
    new Stairs(RIGHT, onFloor("stair music 2 back", 2)),
    new Stairs(LEFT, onFloor("stair to 1800s", 2)),
  ]),
];
export default hallways;
