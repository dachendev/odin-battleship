import Player from "./lib/Player.js";
import Ship from "./lib/Ship.js";
import "./main.css";
import * as domUtils from "./utils/dom.utils.js";
import eventService from "./services/event.service.js";

function domLoaded() {
  let currentPlayer;
  let otherPlayer;

  function setupGame() {
    currentPlayer = new Player("Player 1");
    otherPlayer = new Player("Player 2");

    const playerOneShips = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    const playerTwoShips = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    playerOneShips.forEach((ship, index) => {
      currentPlayer.gameboard.placeShip(ship, 0, index);
    });

    playerTwoShips.forEach((ship, index) => {
      otherPlayer.gameboard.placeShip(ship, 0, index);
    });
  }

  function switchPlayers() {
    [currentPlayer, otherPlayer] = [otherPlayer, currentPlayer];
  }

  function render() {
    domUtils.renderPlayer(
      document.getElementById("current-player"),
      currentPlayer,
      true
    );
    domUtils.renderPlayer(
      document.getElementById("other-player"),
      otherPlayer,
      false
    );
  }

  eventService.subscribe("attack", (boardCell) => {
    const { gameboard, x, y } = boardCell;
    gameboard.receiveAttack(x, y);
    render();

    // wait a second, then switch players
    setTimeout(() => {
      switchPlayers();
      render();
    }, 1000);
  });

  setupGame();
  render();
}

document.addEventListener("DOMContentLoaded", domLoaded);
