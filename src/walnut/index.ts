import { Building } from "room-finder";
import {
  ConnectionNodeId,
  StairNodeId,
  COVID_ONE_WAY_HALLWAY_AND_STAIRS,
} from "./shared";
import hallways from "./hallways";

const walnutAll = new Building<ConnectionNodeId, StairNodeId>(hallways, {
  oneWayStaircases: COVID_ONE_WAY_HALLWAY_AND_STAIRS
    ? {
        // "stair a": "down",
        // "stair b": "down",
        // "stair c": "up",

        // // TODO: need cafeteria to uncomment both of these next 2
        // "stair d": "down",
        // "stair f": "down",

        // TODO: top stairs, near locker room
        // "stair music entrance to 1": "down",
        // "stair music entrance to 2": "up",
        "stair music entrance to 2": "up",
        "stair music 2 back": "down",
      }
    : {},
});

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
