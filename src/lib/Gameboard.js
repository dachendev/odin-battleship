import CoordinateSet from "./CoordinateSet.js";

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
    this.ships = new Array(16);
    this._nextShip = 0;
    this.hits = new CoordinateSet();
    this.misses = new CoordinateSet();
  }

  canPlaceShip(ship, x, y, horizontal) {
    if (
      this._nextShip >= this.ships.length ||
      !this._onBoard(x, y) ||
      (horizontal && !this._onBoard(x + ship.length - 1, y)) ||
      (!horizontal && !this._onBoard(x, y + ship.length - 1)) ||
      this.hasShip(x, y)
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
    const shipId = this._nextShip++;
    this.ships[shipId] = {
      id: shipId,
      instance: ship,
      origin: [x, y],
      direction: horizontal ? "horizontal" : "vertical",
    };

    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        this._grid[this._hash(x + i, y)] = shipId;
      } else {
        this._grid[this._hash(x, y + i)] = shipId;
      }
    }
  }

  getShip(x, y) {
    const shipId = this._grid[this._hash(x, y)];
    if (isDefined(shipId)) {
      return this.ships[shipId];
    }
    return null;
  }

  hasShip(x, y) {
    return !!this.getShip(x, y);
  }

  receiveAttack(x, y) {
    if (!this._onBoard(x, y)) {
      return;
    }

    const target = this.getShip(x, y);
    if (!target) {
      this.misses.add([x, y]);
    } else {
      target.instance.hit();
      this.hits.add([x, y]);
    }
  }

  allShipsSunk() {
    return this.ships.every(({ ship }) => !ship || ship.isSunk());
  }
}
