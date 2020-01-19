import walnut from "@/walnut";

test("walnut is a valid Building", () => {
  expect(walnut.validity.valid).toBe(true);
});
