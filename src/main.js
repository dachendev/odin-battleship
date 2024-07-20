import Player from "./lib/Player.js";
import Ship from "./lib/Ship.js";
import "./main.css";
import * as domUtils from "./utils/dom.utils.js";

// create player and computer
const player = new Player();
const computer = new Player();

function setupGame() {
  // populate gameboard for player
  player.gameboard.placeShip(new Ship(5), 0, 0);
  player.gameboard.placeShip(new Ship(4), 0, 1);
  player.gameboard.placeShip(new Ship(3), 0, 2);
  player.gameboard.placeShip(new Ship(3), 0, 3);
  player.gameboard.placeShip(new Ship(2), 0, 4);

  // populate gameboard for computer
  computer.gameboard.placeShip(new Ship(5), 0, 0);
  computer.gameboard.placeShip(new Ship(4), 0, 1);
  computer.gameboard.placeShip(new Ship(3), 0, 2);
  computer.gameboard.placeShip(new Ship(3), 0, 3);
  computer.gameboard.placeShip(new Ship(2), 0, 4);

  // render player gameboard
  domUtils.renderGameboard(player.gameboard, true);
  domUtils.renderGameboard(computer.gameboard);
}

function domLoaded() {
  setupGame();
}

document.addEventListener("DOMContentLoaded", domLoaded);
