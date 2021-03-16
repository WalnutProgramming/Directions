/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import {
  Direction,
  Room,
  Turn,
  Hallway,
  Stairs,
  Fork,
  SimpleHallway,
  Building,
  onFloor,
  reverseConnection,
} from "room-finder";

const COVID_ONE_WAY_HALLWAY_AND_STAIRS = true;

const { LEFT, RIGHT, FRONT } = Direction;

type StairNodeId =
  | "stair a"
  | "stair b"
  | "stair c"
  | "stair d"
  | "stair f"
  | "stair science a"
  | "stair music entrance to 1"
  | "stair music entrance to 2"
  | "stair arts a"
  | "stair arts b"
  | "elevator a"
  | "elevator b"
  | "elevator science"
  | "elevator music";

type ConnectionNodeId =
  | "1108 & 1105 to 1100s"
  | "1300s to 1600s"
  | "2300s to 2600s"
  | "2600s to arcade"
  | "2700s to arcade"
  | "music entrance to arcade"
  | "music 1 to music little corner"
  | "lobby to 2200s"
  | "lobby to 2240"
  | "alumni hall to 2200s"
  | "alumni hall to arcade"
  | "2500s to alumni hall"
  | "2500s to 2600s"
  | "2600s to 2600s little hallway"
  | "3500s corner to 3500s"
  | "2500s corner to 2500s"
  | "enter 2216"
  | "enter 2215"
  | "2100s to 2401"
  | "2404 to 2100s";

const hallways: Hallway<ConnectionNodeId, StairNodeId>[] = [
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
    new Room("Auditorium", LEFT, {
      prefix: "the",
      aliases: ["2500", "Westheimer Auditorium"],
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
    new Room("2201", RIGHT, { aliases: ["Registrar"] }),
    new Fork(LEFT, "lobby to 2240", "the entrance area"),
    new Fork(RIGHT, "lobby to 2200s", "the 2200s"),
    new Room("2210", LEFT, { aliases: ["Conference Room"] }),
    new Room("2209", RIGHT, {
      aliases: ["10-11 Administration Office", "10th and 11th Grade Office"],
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
      aliases: ["7-9 Administration Offices", "7th, 8th, and 9th Grade Office"],
    }),
    new Room("2229"),
    new Room("2212", LEFT, { aliases: ["Medical Room", "Nurse"] }),
    new Room("2214"),
    new Room("2211", RIGHT),
    new Room("2216", LEFT, { nodeId: "enter 2216" }),
    new Room("2215", RIGHT, {
      nodeId: "enter 2215",
      aliases: ["Alumni Foundation", "Alumni Office"],
    }),
    new Room("2218"),
  ]),

  // hallway 2401
  new Hallway([
    new Fork(FRONT, reverseConnection("2100s to 2401"), "the 2100s"),
    new Room("2401", LEFT, {
      aliases: ["Athletic Director's Office"],
    }),
    new Room("Junior High Gym", FRONT, {
      prefix: "the",
      aliases: ["2402", "Junior Gymnasium"],
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
    new Stairs(LEFT, onFloor("stair science a", 1), undefined, 4),
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

  // arcade
  new (class extends Hallway<ConnectionNodeId, StairNodeId> {
    getDirectionsFromIndices(from: number, to: number) {
      const LANGUAGES = 1;
      const SCIENCE = 2;
      const MUSIC = 3;
      const GYM = 4;
      const ALUMNI = 0;
      switch (from) {
        case LANGUAGES:
          switch (to) {
            case SCIENCE:
              return "go straight and a bit to the right to get to the 2700s, the science wing\n";
            case MUSIC:
              return (
                "go straight and a bit to the left through the long narrow hallway\n" +
                'turn right when you get to the doors labeled "Music Lyceum"\n' +
                "after going through the doors, "
              );
            case GYM:
              return (
                "go straight and a bit to left, and go to the end of the hall\n" +
                "the Senior High Gym is straight ahead. Go inside\n"
              );
            case ALUMNI:
              return "turn right, go to the end of the arcade, go up the ramp, turn right, and go through the doors\n";
            default:
              return "";
          }
        case SCIENCE:
          switch (to) {
            case LANGUAGES:
              return "go straight and a bit to the right to get to the 2600s, the modern languages wing\n";
            case MUSIC:
              return (
                "turn right, then go down to the end of the arcade and turn right\n" +
                "go down the hallway, and turn right when you get to the doors\n" +
                "after going through the doors, "
              );
            case GYM:
              return "turn right when you leave the science wing\nGo forward and turn right again, then go down to the end of the narrow hallway\n";
            case ALUMNI:
              return "turn left\ngo to the end of the arcade, go up the ramp, turn right, and go through the doors\n";
            default:
              return "";
          }
        case MUSIC:
          switch (to) {
            case SCIENCE:
              return (
                "turn left after going through the doors, then go down the hallway\n" +
                "when you get to the end of the hallway, turn left into the arcade, then go down the arcade and turn left into the science wing\n"
              );
            case LANGUAGES:
              return (
                "turn left after going through the doors, then go down the hallway\n" +
                "when you get to the end of the hallway, turn left into the arcade, then go down the arcade and turn right into the modern foreign languages wing\n"
              );
            case GYM:
              return "turn right after going through the doors, then go forward until you get to the gym\n";
            case ALUMNI:
              return (
                "turn left after going through the doors, then go down the hallway\n" +
                "go to the end of the arcade, go up the ramp, turn right, and go through the doors\n"
              );
            default:
              return "";
          }
        case GYM:
          (() => {
            const str =
              "exit the gym and go out via the narrow hallway on the right\n";
            switch (to) {
              case SCIENCE:
                return `${str}go until the narrow hallway empties into the Arcade\nTurn left, go a little bit, and turn left again to get to the science wing\n`;
              case LANGUAGES:
                return `${str}go until the narrow hallway empties into the Arcade\nGo straight and a bit to the left; go forward into the language wing\n`;
              case MUSIC:
                return `${str}After entering the narrow hallway, immediately turn left into the double doors labeled "Music Lyceum"\n`;
              case ALUMNI:
                return `${str}Go to the end of the arcade, go up the ramp, turn right, and go through the doors\n`;
              default:
                return "";
            }
          })();
          return "";
        case ALUMNI:
          switch (to) {
            case SCIENCE:
              return "turn left\ngo down the ramp, go through the arcade, and turn right into the 2700s (science wing)\n";
            case LANGUAGES:
              return "turn left\ngo down the ramp, go through the arcade, and turn left into the 2600s (modern foreign languages wing)\n";
            case MUSIC:
              return (
                "turn left\ngo down the ramp, and go through to the end of the arcade\n" +
                "turn right and through the long narrow hallway\n" +
                'turn right when you get to the doors labeled "Music Lyceum" and enter the doors\n'
              );
            case GYM:
              return (
                "turn left\ngo down the ramp, and go through to the end of the arcade\n" +
                "turn right and through the long narrow hallway\n" +
                "the Senior High Gym is straight ahead. Go inside\n"
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
        reverseConnection("music entrance to arcade"),
        "the music lyceum"
      ),
      new Room("Senior High Gym", FRONT, {
        prefix: "the",
        aliases: ["2800", "2801", "High School Gymnasium"],
      }),
    ],
    { allowFrontConnectionsInMiddle: true }
  ),

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
        aliases: ["Black Box Theatre", "Black Box Theater", "Theater"],
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

  // entrance to music wing
  // (go up to get the 2nd floor, down to get the 1st floor science wing)
  new Hallway([
    new Stairs(FRONT, onFloor("stair music entrance to 1", 2)),
    new Fork(RIGHT, "music entrance to arcade", "the long narrow hallway"),
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
  ]),
];

const walnutAll = new Building<ConnectionNodeId, StairNodeId>(
  hallways
  //  ,{
  //   oneWayStaircases: COVID_ONE_WAY_HALLWAY_AND_STAIRS
  //     ? {
  //         "stair a": "down",
  //         "stair b": "down",
  //         "stair c": "up",

  //         // TODO: add stair C for floor 1. Really weird directions otherwise.

  //         // TODO: need cafeteria to uncomment both of these next 2
  //         "stair d": "down",
  //         "stair f": "down",

  //         // TODO: top stairs, near locker room
  //         // TODO: top stairs, other way from orchestra
  //         // TODO: these next 2 (relies on previous 2)
  //         "stair music entrance to 1": "down",
  //         "stair music entrance to 2": "up",
  //       }
  //     : {},
  // }
);

export const walnutNonAccessible = walnutAll.withAllowedConnectionTypes(
  (s) => !s.includes("elevator")
);

export const walnutAccessible = walnutAll.withAllowedConnectionTypes(
  // TODO!!! Since we currently don't know of a way to get to the 3500s without stairs,
  // we are allowing "stair arts a" and "stair arts b".
  (s) =>
    (!s.includes("stair") || s === "stair arts a" || s === "stair arts b") &&
    (COVID_ONE_WAY_HALLWAY_AND_STAIRS || s !== "2500s to 2600s") &&
    s !== "alumni hall to 2200s"
);

// expose to console
Object.assign(window, { walnutAll, walnutNonAccessible, walnutAccessible });
