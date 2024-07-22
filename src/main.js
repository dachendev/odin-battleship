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

  // add some hit markers
  player.gameboard.receiveAttack(0, 0);
  player.gameboard.receiveAttack(1, 0);
  player.gameboard.receiveAttack(2, 0);
  player.gameboard.receiveAttack(3, 0);
  player.gameboard.receiveAttack(4, 0);

  // add some miss markers
  player.gameboard.receiveAttack(0, 5);
  player.gameboard.receiveAttack(1, 6);
  player.gameboard.receiveAttack(2, 7);
  player.gameboard.receiveAttack(3, 8);
  player.gameboard.receiveAttack(4, 9);

  // render player gameboard
  domUtils.renderGameboard(player.gameboard, { renderShips: true });
  domUtils.renderGameboard(computer.gameboard);
}

function domLoaded() {
  setupGame();
}

document.addEventListener("DOMContentLoaded", domLoaded);
