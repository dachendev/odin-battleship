export default class CoordinateSet {
  constructor() {
    this._map = new Map();
  }

  add([x, y]) {
    if (!this._map.has(x)) {
      this._map.set(x, new Set());
    }
    this._map.get(x).add(y);
    return this;
  }

  has([x, y]) {
    return this._map.has(x) && this._map.get(x).has(y);
  }

  clear() {
    this._map = new Map();
  }
}
