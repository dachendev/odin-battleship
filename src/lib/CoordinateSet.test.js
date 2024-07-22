import CoordinateSet from "./CoordinateSet.js";

describe("CoordinateSet", () => {
  test("should create a coordinate set", () => {
    const coordinateSet = new CoordinateSet();
  });

  test("should add coordinates", () => {
    const coordinateSet = new CoordinateSet();
    coordinateSet.add([0, 0]);
    expect(coordinateSet.has([0, 0])).toBe(true);
  });

  test("should clear coordinates", () => {
    const coordinateSet = new CoordinateSet();
    coordinateSet.add([0, 0]);
    coordinateSet.clear();
    expect(coordinateSet.has([0, 0])).toBe(false);
  });
});
