const gridSize = 10;

export default class Gameboard {
  constructor() {
    this.grid = new Array(gridSize)
      .fill(null)
      .map(() => new Array(gridSize).fill(null));
    this.ships = [];
    this.misses = [];
  }

  placeShip(ship, x, y, horizontal = true) {
    if (
      x < 0 ||
      x > gridSize ||
      y < 0 ||
      y > gridSize ||
      (horizontal && x + ship.length > gridSize) ||
      (!horizontal && y + ship.length > gridSize)
    ) {
      throw new Error("Invalid coordinates");
    }

    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        this.grid[y][x + i] = ship;
      } else {
        this.grid[y + i][x] = ship;
      }
    }

    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    if (x < 0 || x > gridSize || y < 0 || y > gridSize) {
      return;
    }

    const target = this.grid[y][x];
    if (target) {
      target.hit();
    } else {
      this.misses.push([x, y]);
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
