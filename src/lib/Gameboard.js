function isDefined(x) {
  return x !== undefined;
}

export default class Gameboard {
  constructor(options = { width: 10, height: 10 }) {
    this._width = options.width;
    this._height = options.height;
    this.reset();
  }

  _hash(x, y) {
    return y * this._width + x;
  }

  _onBoard(x, y) {
    return x >= 0 && x < this._width && y >= 0 && y < this._height;
  }

  reset() {
    this._grid = new Array(this._width * this._height);
    this._ships = new Array(16);
    this._nextShip = 0;
    this.hits = new Set();
    this.misses = new Set();
  }

  getShip(x, y) {
    const shipIndex = this._grid[this._hash(x, y)];
    if (isDefined(shipIndex)) {
      return this._ships[shipIndex];
    }
    return null;
  }

  placeShip(ship, x, y, horizontal = true) {
    if (
      !this._onBoard(x, y) ||
      (horizontal && !this._onBoard(x + ship.length - 1, y)) ||
      (!horizontal && !this._onBoard(x, y + ship.length - 1))
    ) {
      throw new Error("Invalid coordinates");
    }

    if (this._nextShip >= this._ships.length) {
      throw new Error("Too many ships");
    }

    // add ship to gameboard
    const shipIndex = this._nextShip++;
    this._ships[shipIndex] = ship;

    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        this._grid[this._hash(x + i, y)] = shipIndex;
      } else {
        this._grid[this._hash(x, y + i)] = shipIndex;
      }
    }
  }

  receiveAttack(x, y) {
    if (!this._onBoard(x, y)) {
      return;
    }

    const target = this.getShip(x, y);
    if (target && !this.hits.has([x, y])) {
      target.hit();
      this.hits.add([x, y]);
    } else {
      this.misses.add([x, y]);
    }
  }

  allShipsSunk() {
    return this._ships.every((ship) => !ship || ship.isSunk());
  }
}
