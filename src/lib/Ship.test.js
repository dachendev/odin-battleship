import Ship from "./Ship.js";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test("should create a ship", () => {
    expect(ship).toHaveProperty("length");
    expect(ship).toHaveProperty("hits");
  });

  test("should take hits", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
    ship.hit();
    expect(ship.hits).toBe(3);
    ship.hit();
    expect(ship.hits).toBe(3);
  });

  test("should sink", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
