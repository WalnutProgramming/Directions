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
  // 2nd floor main building (2100s, 2200s, 2300s)
  new Hallway([
    new Stairs(LEFT, onFloor("stair a", 2), "the 2018 stairs"),
    new Room("2310"),
    new Room("2311", RIGHT),
    new Room("2308"),
    new Room("2309", RIGHT),
    new Room("2307", RIGHT),
    new Turn(LEFT),
    new Room("2306", RIGHT),
    new Stairs(LEFT, onFloor("elevator a", 2), "the elevator"),
    new Turn(RIGHT),
    new Fork(LEFT, "2300s to 2600s", "the 2600s"),
    new Stairs(LEFT, onFloor("stair b", 2), "the 2025 stairs"),
    new Room("2302", RIGHT),
    new Room("Westheimer Auditorium", LEFT, {
      prefix: "the",
      aliases: ["2500"],
    }),
    new Room("2301", RIGHT),
    new Room("2205", RIGHT),
    new Stairs(LEFT, onFloor("stair c", 2), "the 2024 stairs"),
    new Fork(
      LEFT,
      reverseConnection("alumni hall to 2200s"),
      "the Alumni Hall"
    ),
    new Room("2204", LEFT, { aliases: ["Principal's Office"] }),
    new Room("2203", RIGHT, { aliases: ["Counseling Office"] }),
    new Room("2202"),
    new Room("2201", RIGHT, { aliases: [] }),
    new Fork(LEFT, "lobby to 2240", "the entrance area"),
    new Fork(RIGHT, "lobby to 2200s", "the 2200s"),
    new Room("2210", LEFT, { aliases: ["Conference Room"] }),
    new Room("2209", RIGHT, {
      aliases: ["10-11 Administration Office"],
    }),
    new Stairs(LEFT, onFloor("stair d", 2), "the 2015 stairs"),
    new Room("2101", RIGHT),
    new Fork(
      LEFT,
      "2100s to 2401",
      "the tiny hallway that's across from room 2101"
    ),
    new Room("2103", RIGHT),
    new Fork(
      LEFT,
      reverseConnection("2404 to 2100s"),
      "the tiny hallway near the elevator"
    ),
    new Room("2105", RIGHT),
    new Stairs(LEFT, onFloor("elevator b", 2), "the elevator"),
    new Turn(RIGHT),
    new Room("2109", RIGHT),
    new Room("2112"),
    new Room("2110", RIGHT),
    new Turn(LEFT),
    new Room("2111", RIGHT),
    new Room("2114"),
    new Room("2113", RIGHT),
    new Room("2115", RIGHT),
    new Stairs(LEFT, onFloor("stair f", 2), "the 2010 stairs"),
  ]),

  // entrance area
  new Hallway([
    new Fork(FRONT, reverseConnection("lobby to 2240"), "the lobby"),
    new Room("2200", LEFT, { aliases: ["Main Office"] }),
  ]),

  // administrative center
  new Hallway([
    new Fork(FRONT, reverseConnection("lobby to 2200s"), "the lobby"),
    new Room("2207", RIGHT, {
      aliases: ["7th, 8th, and 9th Grade Office"],
    }),
    new Room("2229"),
    new Room("2212", LEFT, { aliases: ["Medical Room", "Nurse"] }),
    new Room("2214", LEFT, {
      aliases: ["COVID Isolation Room"],
    }),
    new Room("2211", RIGHT),
    new Room("2216", LEFT, { nodeId: "enter 2216", aliases: ["Registrar"] }),
    new Room("2215", RIGHT, {
      nodeId: "enter 2215",
      aliases: ["Alumni Office"],
    }),
    new Room("2218", LEFT, { aliases: ["Counselor"] }),
  ]),

  // hallway 2401
  new Hallway([
    new Fork(FRONT, reverseConnection("2100s to 2401"), "the 2100s"),
    new Room("2401", LEFT, {
      aliases: ["Athletic Director's Office"],
    }),
    new Room("Junior High Gym", FRONT, {
      prefix: "the",
      aliases: ["2402"],
    }),
  ]),

  // 2404 hallway
  new Hallway([
    new Fork(FRONT, "2404 to 2100s", "the 2100s"),
    new Room("2404", RIGHT),
    new Room("2403", LEFT),
  ]),

  // inside 2216
  new SimpleHallway(
    reverseConnection("enter 2216"),
    [new Room("2222")],
    "room 2216"
  ),

  // inside 2215
  new SimpleHallway(
    reverseConnection("enter 2215"),
    [new Room("2219"), new Room("2221")],
    "room 2215"
  ),
];
export default hallways;
