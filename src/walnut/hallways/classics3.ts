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
import { WalnutHallway } from "../shared";

const { LEFT, RIGHT, FRONT } = Direction;

const hallways: WalnutHallway[] = [
  // 3rd floor main building (3100s, 3200s, 3300s)
  new Hallway([
    new Stairs(LEFT, onFloor("stair a", 3), "the 2018 stairs"),
    new Room("3314", LEFT),
    new Room("3315", RIGHT),
    new Room("3312", LEFT),
    new Room("3313", RIGHT),
    new Room("3311", RIGHT),
    new Turn(LEFT),
    new Room("3310", RIGHT), // these 2 rooms sometimes give weird directions
    new Room("3309", RIGHT), //
    new Stairs(LEFT, onFloor("elevator a", 3), "the elevator", 2),
    new Turn(RIGHT),
    new Stairs(LEFT, onFloor("stair b", 3), "the 2025 stairs", 2),
    new Room("3305", RIGHT),
    new Room("3302", LEFT),
    new Room("3303", RIGHT),
    new Room("3301", RIGHT, { aliases: ["Writing Center"] }),
    new Stairs(LEFT, onFloor("stair c", 3), "the 2024 stairs"),
    new Room("3210", LEFT),
    new Room("3207", LEFT),
    new Room("3205", RIGHT),
    new Room("3208", LEFT),
    // rooms without room numbers have prefix 'the'
    new Room("Library", RIGHT, { prefix: "the", aliases: ["3214"] }),
    new Room("3206", LEFT),
    new Room("3204", LEFT),
    new Room("3202", LEFT),
    new Room("3201", RIGHT, {
      aliases: ["Computer Lab - Library"],
    }),
    new Stairs(LEFT, onFloor("stair d", 3), "the 2015 stairs", 3),
    new Room("3102", LEFT),
    new Room("3101", RIGHT),
    new Room("3104", LEFT, { aliases: ["Computer Lab"] }),
    new Room("3103", RIGHT),
    new Stairs(LEFT, onFloor("elevator b", 3), "the elevator", 6),
    new Room("3105", RIGHT),
    new Turn(RIGHT),
    new Room("3112", LEFT),
    new Room("3110", RIGHT),
    new Room("3111", RIGHT),
    new Turn(LEFT),
    new Room("3113", RIGHT),
    new Room("3114", LEFT),
    new Room("3115", RIGHT),
    new Room("3117", RIGHT),
    new Stairs(LEFT, onFloor("stair f", 3), "the 2010 stairs"),
  ]),
];
export default hallways;
