import eventService from "../services/event.service.js";

const cellSize = { value: 2, unit: "rem" };
const headerOffset = 1;

export function renderPlayer(container, player, current = false) {
  // update player name
  container.querySelector(".player-name").textContent = current
    ? "You"
    : "Opponent";

  // render gameboard
  const gameboardContainer = container.querySelector(".board-container");
  const gameboardOptions = current
    ? { renderShips: true }
    : { targetable: true };
  gameboardContainer.innerHTML = "";
  renderGameboard(gameboardContainer, player.gameboard, gameboardOptions);
}

/**
 * @param {HTMLElement} container
 * @param {Gameboard} gameboard
 * @param {boolean} options.renderShips
 * @param {boolean} options.renderMarkers
 * @param {boolean} options.targetable
 */
function renderGameboard(container, gameboard, options = {}) {
  const { width, height, ships, hits, misses } = gameboard;
  const {
    renderShips = false,
    renderMarkers = true,
    targetable = false,
  } = options;

  const boardElem = document.createElement("div");
  boardElem.classList.add("board");

  if (targetable) {
    boardElem.classList.add("board--targetable");
  }

  // add column headers
  const headers = document.createElement("div");
  headers.classList.add("board-headers");
  boardElem.appendChild(headers);

  const headerRow = document.createElement("div");
  headerRow.classList.add("board-row");
  headers.appendChild(headerRow);

  // add empty first header
  const emptyHeader = document.createElement("div");
  emptyHeader.classList.add("board-header");
  headerRow.appendChild(emptyHeader);

  for (let i = 0; i < width; i++) {
    // create column header
    const header = document.createElement("div");
    header.classList.add("board-header");
    header.textContent = `${i + 1}`;
    headerRow.appendChild(header);
  }
  // end of column headers

  // add rows
  for (let y = 0; y < height; y++) {
    const row = document.createElement("div");
    row.classList.add("board-row");
    boardElem.appendChild(row);

    // add row header
    const header = document.createElement("div");
    header.classList.add("board-header");
    header.textContent = String.fromCharCode(65 + y);
    row.appendChild(header);

    // add cells
    for (let x = 0; x < width; x++) {
      renderBoardCell(row, { gameboard, x, y, targetable });
    }
  }
  // end of rows

  // add ships
  if (renderShips) {
    ships.forEach(
      (placedShip) => placedShip && renderPlacedShip(boardElem, placedShip)
    );
  }
  // end of ships

  // add markers
  if (renderMarkers) {
    hits.forEach(([x, y]) => renderMarker(boardElem, { type: "hit", x, y }));
    misses.forEach(([x, y]) => renderMarker(boardElem, { type: "miss", x, y }));
  }
  // end of markers

  container.appendChild(boardElem);
}

/**
 * @typedef {{ gameboard: Gameboard, x: number, y: number, targetable: boolean }} BoardCell
 * @param {HTMLElement} container
 * @param {BoardCell} boardCell
 */
function renderBoardCell(container, boardCell) {
  const { x, y, targetable } = boardCell;

  const cell = document.createElement("div");
  cell.classList.add("board-cell");
  cell.dataset.x = x;
  cell.dataset.y = y;

  if (targetable) {
    cell.onmouseover = () => {
      cell.classList.add("board-cell--target");
    };
    cell.onmouseleave = () => {
      cell.classList.remove("board-cell--target");
    };
    cell.onclick = () => {
      eventService.publish("attack", boardCell);
    };
  }

  container.appendChild(cell);
}

/**
 * @typedef {{ id: number, instance: Ship, origin: [number, number], horizontal: boolean }} PlacedShip
 * @param {HTMLElement} container
 * @param {PlacedShip} placedShip
 */
function renderPlacedShip(container, placedShip) {
  const { id, instance, origin, horizontal } = placedShip;

  const shipContainer = document.createElement("div");
  shipContainer.classList.add("ship-container");

  // set position
  shipContainer.style.top =
    (origin[1] + headerOffset) * cellSize.value + cellSize.unit;
  shipContainer.style.left =
    (origin[0] + headerOffset) * cellSize.value + cellSize.unit;

  // set size
  if (horizontal) {
    shipContainer.style.width =
      instance.length * cellSize.value + cellSize.unit;
    shipContainer.style.height = cellSize.value + cellSize.unit;
  } else {
    shipContainer.style.width = cellSize.value + cellSize.unit;
    shipContainer.style.height =
      instance.length * cellSize.value + cellSize.unit;
  }

  const shipElem = document.createElement("div");
  shipElem.classList.add(
    "ship",
    `ship--${horizontal ? "horizontal" : "vertical"}`,
    `ship--size-${instance.length}`
  );
  shipElem.dataset.id = id;
  shipContainer.appendChild(shipElem);

  if (instance.isSunk()) {
    shipElem.classList.add("ship--sunk");
  }

  // add ship to board
  container.appendChild(shipContainer);

  // add empty markers
  for (let i = 0; i < instance.length; i++) {
    let x, y;
    if (horizontal) {
      x = origin[0] + i;
      y = origin[1];
    } else {
      x = origin[0];
      y = origin[1] + i;
    }
    renderMarker(container, { type: "empty", x, y });
  }
  // end of empty markers
}

/**
 * @typedef {{ type: "empty" | "hit" | "miss", x: number, y: number }} Marker
 * @param {HTMLElement} container
 * @param {Marker} marker
 */
function renderMarker(container, marker) {
  const { type, x, y } = marker;

  const markerContainer = document.createElement("div");
  markerContainer.classList.add("marker-container");

  // set position
  markerContainer.style.top =
    (y + headerOffset) * cellSize.value + cellSize.unit;
  markerContainer.style.left =
    (x + headerOffset) * cellSize.value + cellSize.unit;

  const markerElem = document.createElement("div");
  markerElem.classList.add("marker", `marker--${type}`);
  markerContainer.appendChild(markerElem);

  // add marker to board
  container.appendChild(markerContainer);
}
