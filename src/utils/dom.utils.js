export function renderGameboard(gameboard, displayShips = false) {
  const gameboardElem = document.createElement("div");
  gameboardElem.classList.add("gameboard");

  const gameboardContent = document.createElement("div");
  gameboardContent.classList.add("gameboard-content");
  gameboardElem.appendChild(gameboardContent);

  for (let y = 0; y < gameboard.height; y++) {
    const row = document.createElement("div");
    row.classList.add("row");
    gameboardContent.appendChild(row);

    for (let x = 0; x < gameboard.width; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      row.appendChild(cell);

      if (displayShips && !!gameboard.getShip(x, y)) {
        cell.classList.add("has-ship");
      }
    }
  }

  document.getElementById("root").appendChild(gameboardElem);
}
