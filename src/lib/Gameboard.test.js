import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

describe("Gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("should create a gameboard", () => {
    expect(gameboard).toHaveProperty("misses");
  });

  /**
   * integration tests
   */

  test("should place ships horizontally", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, true);
    for (let i = 0; i < ship.length; i++) {
      expect(gameboard.getShip(i, 0)).toEqual({
        ship,
        x: 0,
        y: 0,
        horizontal: true,
      });
    }
  });

  test("should place ships vertically", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, false);
    for (let i = 0; i < ship.length; i++) {
      expect(gameboard.getShip(0, i)).toEqual({
        ship,
        x: 0,
        y: 0,
        horizontal: false,
      });
    }
  });

  test("should not place ships out of bounds", () => {
    const ship = new Ship(3);
    expect(() => gameboard.placeShip(ship, -1, 0)).toThrow();
    expect(() => gameboard.placeShip(ship, 10, 0)).toThrow();
    expect(() => gameboard.placeShip(ship, 0, -1)).toThrow();
    expect(() => gameboard.placeShip(ship, 0, 10)).toThrow();
  });

  test("should not place ships partially off the board", () => {
    const ship = new Ship(3);
    expect(() => gameboard.placeShip(ship, 9, 0, true)).toThrow();
    expect(() => gameboard.placeShip(ship, 0, 9, false)).toThrow();
  });

  test("should not place ships on top of other ships", () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    gameboard.placeShip(ship1, 0, 0);
    expect(() => gameboard.placeShip(ship2, 0, 0)).toThrow();
  });

  test("should keep track of hits", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.hits.has([0, 0])).toBe(true);
  });

  test("should keep track of misses", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.misses.has([0, 0])).toBe(true);
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
