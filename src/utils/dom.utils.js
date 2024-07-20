export function renderGameboard(gameboard) {
  const gameboardElem = document.createElement("div");
  gameboardElem.classList.add("gameboard");

  for (let y = 0; y < gameboard.height; y++) {
    const row = document.createElement("div");
    row.classList.add("row");
    gameboardElem.appendChild(row);

    for (let x = 0; x < gameboard.width; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      row.appendChild(cell);
    }
  }

  document.getElementById("root").appendChild(gameboardElem);
}
