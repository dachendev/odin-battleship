import Ship from "./lib/Ship";
import Gameboard from "./lib/Gameboard";
import Player from "./lib/Player";
import * as domUtils from "./dom-utils";

// create players
const player1 = new Player();
const player2 = new Player();

function setupGame() {
  // populate gameboard for player 1
  player1.gameboard.placeShip(new Ship(5), 0, 0);
  player1.gameboard.placeShip(new Ship(4), 1, 0);
  player1.gameboard.placeShip(new Ship(3), 2, 0);
  player1.gameboard.placeShip(new Ship(3), 3, 0);
  player1.gameboard.placeShip(new Ship(2), 4, 0);

  // populate gameboard for player 2
  player2.gameboard.placeShip(new Ship(5), 0, 0);
  player2.gameboard.placeShip(new Ship(4), 1, 0);
  player2.gameboard.placeShip(new Ship(3), 2, 0);
  player2.gameboard.placeShip(new Ship(3), 3, 0);
  player2.gameboard.placeShip(new Ship(2), 4, 0);

  // render gameboards
  domUtils.renderGameboard(player1.gameboard);
  domUtils.renderGameboard(player2.gameboard);
}

setupGame();
