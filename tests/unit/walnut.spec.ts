import walnut from "@/walnut";
import { assertValidBuilding } from "room-finder";

test("walnut is a valid Building", () => {
  assertValidBuilding(walnut);
});
