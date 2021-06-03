import { Hallway } from "room-finder";

export const COVID_ONE_WAY_HALLWAY_AND_STAIRS = true;

export type StairNodeId =
  | "stair a"
  | "stair b"
  | "stair c"
  | "stair d"
  | "stair f"
  | "stair 1100s to 1.5th floor"
  | "stair science a1"
  | "stair science a3"
  | "stair science b"
  | "stair music entrance to 1"
  | "stair music entrance to 2"
  | "stair music 2 back"
  | "stair to 1800s"
  | "stair arts a"
  | "stair arts b"
  | "elevator a"
  | "elevator b"
  | "elevator science"
  | "elevator music";

export type ConnectionNodeId =
  | "1108 & 1105 to 1100s"
  | "1300s to 1600s"
  | "2300s to 2600s"
  | "2600s to arcade"
  | "2700s to arcade"
  | "2700s to 2739"
  | "music entrance to long hallway"
  | "long hallway to arcade"
  | "early 1800s to latter 1800s"
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
  | "2404 to 2100s"
  | "1300s to cafeteria"
  | "cafeteria to delivery hallway"
  | "delivery hallway to 1100s"
  | "delivery hallway to lower 1400s"
  | "1.5th floor landing to upper 1400s";

export class WalnutHallway extends Hallway<ConnectionNodeId, StairNodeId> {}
