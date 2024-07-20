function isDefined(x) {
  return x !== undefined;
}

export default class Gameboard {
  constructor(options = { width: 10, height: 10 }) {
    this.width = options.width;
    this.height = options.height;
    this.reset();
  }

  _hash(x, y) {
    return y * this.width + x;
  }

  _onBoard(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  reset() {
    this._grid = new Array(this.width * this.height);
    this._ships = new Array(16);
    this._nextShip = 0;
    this.hits = new Set();
    this.misses = new Set();
  }

  canPlaceShip(ship, x, y, horizontal) {
    if (
      this._nextShip >= this._ships.length ||
      !this._onBoard(x, y) ||
      (horizontal && !this._onBoard(x + ship.length - 1, y)) ||
      (!horizontal && !this._onBoard(x, y + ship.length - 1)) ||
      !!this.getShip(x, y)
    ) {
      return false;
    }

    return true;
  }

  placeShip(ship, x, y, horizontal = true) {
    if (!this.canPlaceShip(ship, x, y, horizontal)) {
      throw new Error("Cannot place ship");
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

  getShip(x, y) {
    const shipIndex = this._grid[this._hash(x, y)];
    if (isDefined(shipIndex)) {
      return this._ships[shipIndex];
    }
    return null;
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
