const cellSize = { value: 2, unit: "rem" };
const headerOffset = 1;

export function renderGameboard(
  gameboard,
  { renderShips = false, renderMarkers = true } = {}
) {
  const container = document.createElement("div");
  container.classList.add("board-container");

  const content = document.createElement("div");
  content.classList.add("board-content");
  container.appendChild(content);

  // add column headers
  const headers = document.createElement("div");
  headers.classList.add("board-headers");
  content.appendChild(headers);

  const headerRow = document.createElement("div");
  headerRow.classList.add("board-row");
  headers.appendChild(headerRow);

  // add empty first header
  const emptyHeader = document.createElement("div");
  emptyHeader.classList.add("board-header");
  headerRow.appendChild(emptyHeader);

  for (let i = 0; i < gameboard.width; i++) {
    // create column header
    const header = document.createElement("div");
    header.classList.add("board-header");
    header.textContent = `${i + 1}`;
    headerRow.appendChild(header);
  }
  // end of column headers

  // add rows
  for (let y = 0; y < gameboard.height; y++) {
    const row = document.createElement("div");
    row.classList.add("board-row");
    content.appendChild(row);

    // add row header
    const header = document.createElement("div");
    header.classList.add("board-header");
    header.textContent = String.fromCharCode(65 + y);
    row.appendChild(header);

    // add cells
    for (let x = 0; x < gameboard.width; x++) {
      const cell = document.createElement("div");
      cell.classList.add("board-cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      row.appendChild(cell);
    }
  }
  // end of rows

  // add ships
  if (renderShips) {
    gameboard.ships.forEach((ship) => ship && renderShip(container, ship));
  }
  // end of ships

  // add markers
  if (renderMarkers) {
    gameboard.hits.forEach(([x, y]) =>
      renderMarker(container, { type: "hit", x, y })
    );
    gameboard.misses.forEach(([x, y]) =>
      renderMarker(container, { type: "miss", x, y })
    );
  }
  // end of markers

  document.getElementById("root").appendChild(container);
}

function renderShip(boardContainer, { id, instance, origin, horizontal }) {
  const container = document.createElement("div");
  container.classList.add("ship-container");

  // set position
  container.style.top =
    (origin[1] + headerOffset) * cellSize.value + cellSize.unit;
  container.style.left =
    (origin[0] + headerOffset) * cellSize.value + cellSize.unit;

  // set size
  if (horizontal) {
    container.style.width = instance.length * cellSize.value + cellSize.unit;
    container.style.height = cellSize.value + cellSize.unit;
  } else {
    container.style.width = cellSize.value + cellSize.unit;
    container.style.height = instance.length * cellSize.value + cellSize.unit;
  }

  const ship = document.createElement("div");
  ship.classList.add(
    "ship",
    `ship--${horizontal ? "horizontal" : "vertical"}`,
    `ship--size-${instance.length}`
  );
  ship.dataset.id = id;
  container.appendChild(ship);

  if (instance.isSunk()) {
    ship.classList.add("ship--sunk");
  }

  // add ship to board
  boardContainer.querySelector(".board-content").appendChild(container);

  // add empty markers
  const emptyCoordinates = [];
  for (let i = 0; i < instance.length; i++) {
    if (horizontal) {
      emptyCoordinates.push([origin[0] + i, origin[1]]);
    } else {
      emptyCoordinates.push([origin[0], origin[1] + i]);
    }
  }
  emptyCoordinates.forEach(([x, y]) =>
    renderMarker(boardContainer, { type: "empty", x, y })
  );
  // end of empty markers
}

function renderMarker(boardContainer, { type, x, y }) {
  const container = document.createElement("div");
  container.classList.add("marker-container");

  // set position
  container.style.top = (y + headerOffset) * cellSize.value + cellSize.unit;
  container.style.left = (x + headerOffset) * cellSize.value + cellSize.unit;

  const marker = document.createElement("div");
  marker.classList.add("marker", `marker--${type}`);
  container.appendChild(marker);

  // add marker to board
  boardContainer.querySelector(".board-content").appendChild(container);
}
