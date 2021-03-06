import { walnutNonAccessible, walnutAccessible } from "@/walnut";
import { assertValidBuilding, isValidBuilding } from "room-finder";

test("non-accessible walnut is a valid Building", () => {
  expect(isValidBuilding(walnutNonAccessible).connectedSections).toHaveLength(
    1
  );
  assertValidBuilding(walnutNonAccessible);
});

test("accessible walnut is a valid Building", () => {
  expect(isValidBuilding(walnutAccessible).connectedSections).toHaveLength(1);
  assertValidBuilding(walnutAccessible);
});
