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
} from "room-finder";

const { LEFT, RIGHT, FRONT, BACK } = Direction;

enum StairNode {
  A1 = "StairNode.A1",
  A2 = "StairNode.A2",
  A3 = "StairNode.A3",
  B1 = "StairNode.B1",
  B2 = "StairNode.B2",
  B3 = "StairNode.B3",
  C2 = "StairNode.C2",
  C3 = "StairNode.C3",
  D2 = "StairNode.D2",
  D3 = "StairNode.D3",
  F1 = "StairNode.F1",
  F2 = "StairNode.F2",
  F3 = "StairNode.F3",
  SCIENCE_A1 = "StairNode.SCIENCE_A1",
  SCIENCE_A2 = "StairNode.SCIENCE_A2",
  SCIENCE_A3 = "StairNode.SCIENCE_A3",
  MUSIC_ENTRANCE_TO_1 = "StairNode.MUSIC_ENTRANCE_TO_1",
  MUSIC_1_TO_ENTRANCE = "StairNode.MUSIC_1_TO_ENTRANCE",
  MUSIC_ENTRANCE_TO_2 = "StairNode.MUSIC_ENTRANCE_TO_2",
  MUSIC_2_TO_ENTRANCE = "StairNode.MUSIC_2_TO_ENTRANCE",
  ARTS_A2 = "StairNode.ARTS_A2",
  ARTS_A3 = "StairNode.ARTS_A3",
  ARTS_B2 = "StairNode.ARTS_B2",
  ARTS_B3 = "StairNode.ARTS_B3",
}

// When listing stairs, the furthest down entrance to the stairs goes first
const stairConnections: string[][] = [
  [StairNode.A1, StairNode.A2, StairNode.A3],
  [StairNode.B1, StairNode.B2, StairNode.B3],
  [StairNode.C2, StairNode.C3],
  [StairNode.D2, StairNode.D3],
  [StairNode.F1, StairNode.F2, StairNode.F3],
  [StairNode.SCIENCE_A1, StairNode.SCIENCE_A2, StairNode.SCIENCE_A3],
  [StairNode.MUSIC_ENTRANCE_TO_2, StairNode.MUSIC_2_TO_ENTRANCE],
  [StairNode.MUSIC_1_TO_ENTRANCE, StairNode.MUSIC_ENTRANCE_TO_1],
  [StairNode.ARTS_A2, StairNode.ARTS_A3],
  [StairNode.ARTS_B2, StairNode.ARTS_B3],
];

enum ConnectionNode {
  C1100S_TO_1108_AND_1105 = "ConnectionNode.C1100S_TO_1108_AND_1105",
  C1108_AND_1105_TO_1100S = "ConnectionNode.C1108_AND_1105_TO_1100S",
  C1300S_TO_1600S = "ConnectionNode.C1300S_TO_1600S",
  C1600S_TO_1300S = "ConnectionNode.C1600S_TO_1300S",
  C2300S_TO_2600S = "ConnectionNode.C2300S_TO_2600S",
  C2600S_TO_2300S = "ConnectionNode.C2600S_TO_2300S",
  C2600S_TO_ARCADE = "ConnectionNode.C2600S_TO_ARCADE",
  ARCADE_TO_2600S = "ConnectionNode.ARCADE_TO_2600S",
  C2700S_TO_ARCADE = "ConnectionNode.C2700S_TO_ARCADE",
  ARCADE_TO_2700S = "ConnectionNode.ARCADE_TO_2700S",
  MUSIC_ENTRANCE_TO_ARCADE = "ConnectionNode.MUSIC_ENTRANCE_TO_ARCADE",
  ARCADE_TO_MUSIC_ENTRANCE = "ConnectionNode.ARCADE_TO_MUSIC_ENTRANCE",
  MUSIC1_TO_MUSIC_LITTLE_CORNER = "ConnectionNode.MUSIC1_TO_MUSIC_LITTLE_CORNER",
  MUSIC_LITTLE_CORNER_TO_MUSIC1 = "ConnectionNode.MUSIC_LITTLE_CORNER_TO_MUSIC1",
  LOBBY_TO_2200S = "ConnectionNode.LOBBY_TO_2200S",
  C2200S_TO_LOBBY = "ConnectionNode.C2200S_TO_LOBBY",
  LOBBY_TO_2240 = "ConnectionNode.LOBBY_TO_2240",
  C2240_TO_LOBBY = "ConnectionNode.C2240_TO_LOBBY",
  ALUMNI__HALL_TO_2200S = "ConnectionNode.ALUMNI__HALL_TO_2200S",
  C2200S_TO_ALUMNI_HALL = "ConnectionNode.C2200S_TO_ALUMNI_HALL",
  ALUMNI_HALL_TO_ARCADE = "ConnectionNode.ALUMNI_HALL_TO_ARCADE",
  ARCADE_TO_ALUMNI_HALL = "ConnectionNode.ARCADE_TO_ALUMNI_HALL",
  C2500S_TO_ALUMNI_HALL = "ConnectionNode.C2500S_TO_ALUMNI_HALL",
  ALUMNI_HALL_TO_2500S = "ConnectionNode.ALUMNI_HALL_TO_2500S",
  C2500S_TO_2600S = "ConnectionNode.C2500S_TO_2600S",
  C2600S_TO_2500S = "ConnectionNode.C2600S_TO_2500S",
  C2600S_TO_2600S_LITTLE_HALLWAY = "ConnectionNode.C2600S_TO_2600S_LITTLE_HALLWAY",
  C2600S_LITTLE_HALLWAY_TO_2600S = "ConnectionNode.C2600S_LITTLE_HALLWAY_TO_2600S",
  C3500S_CORNER_TO_3500S = "ConnectionNode.C3500S_CORNER_TO_3500S",
  C3500S_TO_3500S_CORNER = "ConnectionNode.C3500S_TO_3500S_CORNER",
  C2500S_CORNER_TO_2500S = "ConnectionNode.C2500S_CORNER_TO_2500S",
  C2500S_TO_2500S_CORNER = "ConnectionNode.C2500S_TO_2500S_CORNER",
  ENTER_2216 = "ConnectionNode.ENTER_2216",
  EXIT_2216 = "ConnectionNode.EXIT_2216",
  ENTER_2215 = "ConnectionNode.ENTER_2215",
  EXIT_2215 = "ConnectionNode.EXIT_2215",
}

const hallwayConnections: [string, string][] = [
  [
    ConnectionNode.C1108_AND_1105_TO_1100S,
    ConnectionNode.C1100S_TO_1108_AND_1105,
  ],
  [ConnectionNode.C1300S_TO_1600S, ConnectionNode.C1600S_TO_1300S],
  [ConnectionNode.C2300S_TO_2600S, ConnectionNode.C2600S_TO_2300S],
  [ConnectionNode.C2600S_TO_ARCADE, ConnectionNode.ARCADE_TO_2600S],
  [ConnectionNode.C2700S_TO_ARCADE, ConnectionNode.ARCADE_TO_2700S],
  [
    ConnectionNode.MUSIC_ENTRANCE_TO_ARCADE,
    ConnectionNode.ARCADE_TO_MUSIC_ENTRANCE,
  ],
  [
    ConnectionNode.MUSIC1_TO_MUSIC_LITTLE_CORNER,
    ConnectionNode.MUSIC_LITTLE_CORNER_TO_MUSIC1,
  ],
  [ConnectionNode.LOBBY_TO_2200S, ConnectionNode.C2200S_TO_LOBBY],
  [ConnectionNode.LOBBY_TO_2240, ConnectionNode.C2240_TO_LOBBY],
  [ConnectionNode.ALUMNI__HALL_TO_2200S, ConnectionNode.C2200S_TO_ALUMNI_HALL],
  [ConnectionNode.ALUMNI_HALL_TO_ARCADE, ConnectionNode.ARCADE_TO_ALUMNI_HALL],
  [ConnectionNode.C2500S_TO_ALUMNI_HALL, ConnectionNode.ALUMNI_HALL_TO_2500S],
  [ConnectionNode.C2500S_TO_2600S, ConnectionNode.C2600S_TO_2500S],
  [
    ConnectionNode.C2600S_TO_2600S_LITTLE_HALLWAY,
    ConnectionNode.C2600S_LITTLE_HALLWAY_TO_2600S,
  ],
  [
    ConnectionNode.C3500S_CORNER_TO_3500S,
    ConnectionNode.C3500S_TO_3500S_CORNER,
  ],
  [
    ConnectionNode.C2500S_CORNER_TO_2500S,
    ConnectionNode.C2500S_TO_2500S_CORNER,
  ],
  [ConnectionNode.ENTER_2216, ConnectionNode.EXIT_2216],
  [ConnectionNode.ENTER_2215, ConnectionNode.EXIT_2215],
];

const hallways: Hallway[] = [
  // 1100s
  new Hallway([
    new Room("1106", BACK),
    new Room("1107", RIGHT),
    new Fork(
      LEFT,
      ConnectionNode.C1100S_TO_1108_AND_1105,
      "the 1108 and 1105 hallway"
    ),
    new Room("1109", RIGHT),
    new Room("1110"),
    new Room("1111", RIGHT),
    new Room("1113", RIGHT),
    new Stairs(LEFT, StairNode.F1, "2010"),
  ]),

  // 1108 and 1105
  new Hallway([
    new Fork(BACK, ConnectionNode.C1108_AND_1105_TO_1100S, "the latter 1100s"),
    new Room("1108", RIGHT),
    new Room("1105", LEFT),
    new Turn(LEFT),
    // fork to the wacky confusing cafeteria part goes here
  ]),

  // 1300s
  new Hallway([
    new Stairs(LEFT, StairNode.A1, "2018"),
    new Room("1314"),
    new Room("1315", RIGHT),
    new Room("1312"),
    new Room("1313", RIGHT),
    new Room("1311", RIGHT),
    new Turn(LEFT),
    new Room("1310", RIGHT),
    new Room("1309", RIGHT),
    new Turn(RIGHT),
    new Fork(LEFT, ConnectionNode.C1300S_TO_1600S, "the 1600s"),
    new Stairs(LEFT, StairNode.B1, "2025"),
    new Room("1305", RIGHT),
    new Room("1303", RIGHT),
    new Room("1304", LEFT),
    new Room("1301", RIGHT),
    new Room("1300"),
  ]),

  // 2nd floor main building (2100s, 2200s, 2300s)
  new Hallway([
    new Stairs(LEFT, StairNode.A2, "2018"),
    new Room("2310"),
    new Room("2311", RIGHT),
    new Room("2308"),
    new Room("2309", RIGHT),
    new Room("2307", RIGHT),
    new Turn(LEFT),
    new Room("2306", RIGHT),
    new Turn(RIGHT),
    new Fork(LEFT, ConnectionNode.C2300S_TO_2600S, "the 2600s"),
    new Stairs(LEFT, StairNode.B2, "2025"),
    new Room("2302", RIGHT),
    new Room("Auditorium", LEFT, {
      prefix: "the",
      aliases: ["2500", "Westheimer Auditorium"],
    }),
    new Room("2301", RIGHT),
    new Room("2205", RIGHT),
    new Stairs(LEFT, StairNode.C2, "2024"),
    new Fork(LEFT, ConnectionNode.C2200S_TO_ALUMNI_HALL, "the Alumni Hall"),
    new Room("2204", LEFT, { aliases: ["Principal's Office"] }),
    new Room("2203", RIGHT, { aliases: ["Counseling Office"] }),
    new Room("2202"),
    new Room("2201", RIGHT, { aliases: ["Registrar"] }),
    new Fork(LEFT, ConnectionNode.LOBBY_TO_2240, "the entrance area"),
    new Fork(RIGHT, ConnectionNode.LOBBY_TO_2200S, "the 2200s"),
    new Room("2210", LEFT, { aliases: ["Conference Room"] }),
    new Room("2209", RIGHT, {
      aliases: ["10-11 Administration Office", "10th and 11th Grade Office"],
    }),
    new Stairs(LEFT, StairNode.D2, "2015"),
    new Room("2101", RIGHT),
    new Room("Junior High Gym", LEFT, {
      prefix: "the",
      aliases: ["2402", "Junior Gymnasium"],
    }),
    new Room("2103", RIGHT),
    new Room("2105", RIGHT),
    new Turn(RIGHT),
    new Room("2109", RIGHT),
    new Room("2112"),
    new Room("2110", RIGHT),
    new Turn(LEFT),
    new Room("2111", RIGHT),
    new Room("2114"),
    new Room("2113", RIGHT),
    new Room("2115", RIGHT),
    new Stairs(LEFT, StairNode.F2, "2010"),
  ]),

  // entrance area
  new Hallway([
    new Fork(BACK, ConnectionNode.C2240_TO_LOBBY, "the lobby"),
    new Room("2200", LEFT, { aliases: ["Main Office"] }),
  ]),

  // administrative center
  new Hallway([
    new Fork(BACK, ConnectionNode.C2200S_TO_LOBBY, "the lobby"),
    new Room("2207", RIGHT, {
      aliases: ["7-9 Administration Offices", "7th, 8th, and 9th Grade Office"],
    }),
    new Room("2229"),
    new Room("2212", LEFT, { aliases: ["Medical Room", "Nurse"] }),
    new Room("2214"),
    new Room("2211", RIGHT),
    new Room("2216", LEFT, { nodeId: ConnectionNode.ENTER_2216 }),
    new Room("2215", RIGHT, {
      nodeId: ConnectionNode.ENTER_2215,
      aliases: ["Alumni Foundation", "Alumni Office"],
    }),
    new Room("2218"),
  ]),

  // inside 2216
  new SimpleHallway(ConnectionNode.EXIT_2216, [new Room("2222")], "room 2216"),

  // inside 2215
  new SimpleHallway(
    ConnectionNode.EXIT_2215,
    [new Room("2219"), new Room("2221")],
    "room 2215"
  ),

  // 3rd floor main building (3100s, 3200s, 3300s)
  new Hallway([
    new Stairs(LEFT, StairNode.A3, "2018"),
    new Room("3314", LEFT),
    new Room("3315", RIGHT),
    new Room("3312", LEFT),
    new Room("3313", RIGHT),
    new Room("3311", RIGHT),
    new Turn(LEFT),
    new Room("3310", RIGHT), // these 2 rooms sometimes give weird directions
    new Room("3309", RIGHT), //
    new Turn(RIGHT),
    new Stairs(LEFT, StairNode.B3, "2025", 2),
    new Room("3305", RIGHT),
    new Room("3302", LEFT),
    new Room("3303", RIGHT),
    new Room("3301", RIGHT, { aliases: ["Writing Center"] }),
    new Stairs(LEFT, StairNode.C3, "2024"),
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
      aliases: ["Computer Lab - Library", "Library Computer Lab"],
    }),
    new Stairs(LEFT, StairNode.D3, "2015", 3),
    new Room("3102", LEFT),
    new Room("3101", RIGHT),
    new Room("3104", LEFT),
    new Room("3103", RIGHT),
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
    new Stairs(LEFT, StairNode.F3, "2010"),
  ]),

  // 1st floor modern languages wing (1600s)
  new Hallway([
    new Fork(BACK, ConnectionNode.C1600S_TO_1300S, "the 1300s"),
    new Turn(LEFT),
    new Room("1601"),
    new Room("1602"),
    new Turn(RIGHT),
    new (class extends Room {
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
    new Stairs(LEFT, StairNode.SCIENCE_A1, undefined, 4),
  ]),

  // 2nd floor modern languages wing (2600s)
  new Hallway([
    new Fork(BACK, ConnectionNode.C2600S_TO_2300S, "the 2300s"),
    new Turn(LEFT),
    new Room("2604", RIGHT),
    new Room("2601"),
    new Room("2602"),
    new Turn(RIGHT),
    new Room("2603"),
    new Room("2605"),
    new Fork(
      RIGHT,
      ConnectionNode.C2600S_TO_2600S_LITTLE_HALLWAY,
      "the little hallway"
    ),
    new Room("2607"),
    new Room("2609"),
    new Room("2611"),
    new Fork(FRONT, ConnectionNode.C2600S_TO_ARCADE, "the arcade"),
  ]),

  // little corner in the 2600s (go through here to get to the 2500s behind the auditorium)
  new Hallway([
    new Fork(BACK, ConnectionNode.C2600S_LITTLE_HALLWAY_TO_2600S, "the 2600s"),
    // There are a few stairs right here
    new (class extends Room {
      onPass(forwardOrBackward: -1 | 1, prevRoom: Room) {
        return `Go ${forwardOrBackward === -1 ? "up" : "down"} the 3 steps\n`;
      }
    })(),
    new Fork(LEFT, ConnectionNode.C2600S_TO_2500S, "the door"),
  ]),

  // arcade
  new (class extends Hallway {
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
                "the Senior High Gym is straight ahead. Walk inside\n"
              );
            case ALUMNI:
              return "turn right, go to the end of the arcade, walk up the ramp, turn right, and go through the doors\n";
            default:
              return "";
          }
        case SCIENCE:
          switch (to) {
            case LANGUAGES:
              return "go straight and a bit to the right to get to the 2600s, the modern languages wing\n";
            case MUSIC:
              return (
                "turn right, then walk down to the end of the arcade and turn right\n" +
                "walk down the hallway, and turn right when you get to the doors\n" +
                "after walking through the doors, "
              );
            case GYM:
              return "turn right when you leave the science wing\nWalk forward and turn right again, then walk down to the end of the narrow hallway\n";
            case ALUMNI:
              return "turn left\ngo to the end of the arcade, walk up the ramp, turn right, and go through the doors\n";
            default:
              return "";
          }
        case MUSIC:
          switch (to) {
            case SCIENCE:
              return (
                "turn left after walking through the doors, then walk down the hallway\n" +
                "when you get to the end of the hallway, turn left into the arcade, then walk down the arcade and turn left into the science wing\n"
              );
            case LANGUAGES:
              return (
                "turn left after walking through the doors, then walk down the hallway\n" +
                "when you get to the end of the hallway, turn left into the arcade, then walk down the arcade and turn right into the modern foreign languages wing\n"
              );
            case GYM:
              return "turn right after walking through the doors, then walk forward until you get to the gym\n";
            case ALUMNI:
              return (
                "turn left after walking through the doors, then walk down the hallway\n" +
                "go to the end of the arcade, walk up the ramp, turn right, and go through the doors\n"
              );
            default:
              return "";
          }
        case GYM:
          (() => {
            const str =
              "exit the gym and walk out via the narrow hallway on the right\n";
            switch (to) {
              case SCIENCE:
                return `${str}Walk until the narrow hallway empties into the Arcade\nTurn left, walk a little bit, and turn left again to get to the science wing\n`;
              case LANGUAGES:
                return `${str}Walk until the narrow hallway empties into the Arcade\nGo straight and a bit to the left; walk forward into the language wing\n`;
              case MUSIC:
                return `${str}After entering the narrow hallway, immediately turn left into the double doors labeled "Music Lyceum"\n`;
              case ALUMNI:
                return `${str}Go to the end of the arcade, walk up the ramp, turn right, and go through the doors\n`;
              default:
                return "";
            }
          })();
          return "";
        case ALUMNI:
          switch (to) {
            case SCIENCE:
              return "turn left\nwalk down the ramp, walk through the arcade, and turn right into the 2700s (science wing)\n";
            case LANGUAGES:
              return "turn left\nwalk down the ramp, walk through the arcade, and turn left into the 2600s (modern foreign languages wing)\n";
            case MUSIC:
              return (
                "turn left\nwalk down the ramp, and walk through to the end of the arcade\n" +
                "turn right and through the long narrow hallway\n" +
                'turn right when you get to the doors labeled "Music Lyceum" and enter the doors\n'
              );
            case GYM:
              return (
                "turn left\nwalk down the ramp, and walk through to the end of the arcade\n" +
                "turn right and through the long narrow hallway\n" +
                "the Senior High Gym is straight ahead. Walk inside\n"
              );
            default:
              return "";
          }
        default:
          return "";
      }
    }
  })([
    // The directions that we use here don't matter since we
    // override the instructions for the arcade anyway.
    new Fork(FRONT, ConnectionNode.ARCADE_TO_ALUMNI_HALL, "Alumni Hall"),
    new Fork(FRONT, ConnectionNode.ARCADE_TO_2600S, "the 2600s"),
    new Fork(FRONT, ConnectionNode.ARCADE_TO_2700S, "the 2700s"),
    new Fork(
      FRONT,
      ConnectionNode.ARCADE_TO_MUSIC_ENTRANCE,
      "the music lyceum"
    ),
    new Room("Senior High Gym", FRONT, {
      prefix: "the",
      aliases: ["2800", "2801", "High School Gymnasium"],
    }),
  ]),

  // alumni hall
  new Hallway([
    new Fork(BACK, ConnectionNode.ALUMNI__HALL_TO_2200S, "the 2200s"),
    new Fork(LEFT, ConnectionNode.ALUMNI_HALL_TO_2500S, "the narrow hallway"),
    new Fork(FRONT, ConnectionNode.ALUMNI_HALL_TO_ARCADE, "the arcade"),
  ]),

  // 2500s (2nd floor Performing Arts Center, behind the auditorium)
  new Hallway([
    new Fork(BACK, ConnectionNode.C2500S_TO_ALUMNI_HALL, "Alumni Hall"),
    new Room("2503", RIGHT, {
      aliases: ["Black Box Theatre", "Black Box Theater", "Theater"],
    }),
    new Room("2505", RIGHT, { aliases: ["Scene Shop"] }),
    new Fork(
      RIGHT,
      ConnectionNode.C2500S_TO_2500S_CORNER,
      "the corner with the stairs"
    ),
    new Room("2510", RIGHT),
    new Fork(LEFT, ConnectionNode.C2500S_TO_2600S, "the door"),
    new Stairs(FRONT, StairNode.ARTS_B2),
  ]),

  // 2500s stair corner
  new Hallway([
    new Fork(
      BACK,
      ConnectionNode.C2500S_CORNER_TO_2500S,
      "the main 2500s hallway"
    ),
    new Stairs(RIGHT, StairNode.ARTS_A2),
  ]),

  // performingArtsCenter3
  new Hallway([
    new Fork(
      RIGHT,
      ConnectionNode.C3500S_TO_3500S_CORNER,
      "the corner with the stairs"
    ),
    new Room("3505", RIGHT),
    new Stairs(FRONT, StairNode.ARTS_B3),
  ]),

  // 3500s (3rd floor Performing Arts Center, behind the auditorium)
  new Hallway([
    new Fork(
      BACK,
      ConnectionNode.C3500S_CORNER_TO_3500S,
      "the main 3500s hallway"
    ),
    new Stairs(RIGHT, StairNode.ARTS_A3),
    new Room("3503", LEFT),
    new Room("3504", FRONT),
  ]),

  // 2nd floor science wing (2700s)
  new Hallway([
    new (class extends Fork {
      onLeave() {
        return "";
      }
    })(BACK, ConnectionNode.C2700S_TO_ARCADE, "the arcade"),
    new Stairs(LEFT, StairNode.SCIENCE_A2),
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
    new Stairs(LEFT, StairNode.SCIENCE_A3),
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
    new Stairs(BACK, StairNode.MUSIC_ENTRANCE_TO_1),
    new Fork(
      RIGHT,
      ConnectionNode.MUSIC_ENTRANCE_TO_ARCADE,
      "the long narrow hallway"
    ),
    new Stairs(FRONT, StairNode.MUSIC_ENTRANCE_TO_2),
  ]),

  // music lyceum 1st floor (1800s)
  new Hallway([
    new Stairs(BACK, StairNode.MUSIC_1_TO_ENTRANCE),
    new Room("1852", RIGHT),
    new Turn(LEFT),
    new Turn(LEFT),
    new Room("1853", RIGHT),
    new Room("1850", RIGHT, { aliases: ["Band (1850)"] }),
    new Room("1857", RIGHT),
    new Room("1851", RIGHT),
    new Fork(
      RIGHT,
      ConnectionNode.MUSIC1_TO_MUSIC_LITTLE_CORNER,
      "the little corner"
    ),
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
      BACK,
      ConnectionNode.MUSIC_LITTLE_CORNER_TO_MUSIC1,
      "the music hallway"
    ),
    new Room("1842"),
    new Room("1849", RIGHT),
    new Room("1846", RIGHT),
    new Room("1845", FRONT, { aliases: ["Band (1845)"] }),
  ]),

  // 2nd floor music wing (2800s)
  new Hallway([
    new Stairs(LEFT, StairNode.MUSIC_2_TO_ENTRANCE),
    new Room("2855"),
    new Room("2853"),
    new Room("2851"),
    new Room("2849"),
    new Room("2852", RIGHT, {
      aliases: ["Schott Recital Hall", "Recital Hall"],
    }),
    new Room("2847"),
    new Room("2857", RIGHT),
    new Room("2848", RIGHT, { aliases: ["Strings"] }),
    new Turn(LEFT),
    new Room("2846", RIGHT),
    new Room("2844", RIGHT),
    new Room("2842", RIGHT),
    new Room("2843"),
    new Room("2840", RIGHT, { aliases: ["Choir"] }),
  ]),
];

export default new Building(hallways, hallwayConnections, stairConnections);
