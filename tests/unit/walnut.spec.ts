import walnut from "@/walnut";

test("walnut is a valid Building", () => {
  expect(walnut.validity).toEqual(
    expect.objectContaining({
      valid: true,
    })
  );
});
