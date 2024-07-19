import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

describe("Gameboard", () => {
  let gameboard = new Gameboard();

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("should create a gameboard", () => {
    expect(gameboard).toHaveProperty("grid");
    expect(gameboard).toHaveProperty("misses");
  });

  /**
   * integration tests
   */

  test("should place ships", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0);
    for (let i = 0; i < ship.length; i++) {
      expect(gameboard.grid[0][i]).toEqual(ship);
    }
  });

  test("should place ships horizontally", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, true);
    for (let i = 0; i < ship.length; i++) {
      expect(gameboard.grid[0][i]).toEqual(ship);
    }
  });

  test("should place ships vertically", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, false);
    for (let i = 0; i < ship.length; i++) {
      expect(gameboard.grid[i][0]).toEqual(ship);
    }
  });

  test("should not place ships out of bounds", () => {
    const ship = new Ship(3);
    expect(() => gameboard.placeShip(ship, 10, 0)).toThrow();
    expect(() => gameboard.placeShip(ship, 0, 10)).toThrow();
    expect(() => gameboard.placeShip(ship, -1, 0)).toThrow();
    expect(() => gameboard.placeShip(ship, 0, -1)).toThrow();
  });

  test("should keep track of misses", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.misses).toContainEqual([0, 0]);
  });

  test("should report if all ships are sunk", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
