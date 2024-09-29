let listOfPlayers = [];
const gameBoard = document.querySelector(".board");
gameBoard.style.visibility = "hidden";

const cells = document.querySelectorAll(".cell");
const addPlayerButton = document.querySelector("#player-form");

function createPlayer(name, symbol) {
  let wins = 0;
  let losses = 0;

  const getWinsLosses = () => `${wins}/${losses}`;
  const Win = () => wins++;
  const Lose = () => losses++;
  return { name, symbol, getWinsLosses, Win, Lose };
}

const displayController = (function() {
  const updatePlayerTable = function() {
    const playerTable = document.querySelector("#player-table tbody");
    playerTable.innerHTML = "";

    listOfPlayers.forEach((player) => {
      const row = document.createElement("tr");

      row.innerHTML = `
<td class="table-cell">${player.name}</td>
<td class="table-cell">${player.symbol}</td>
<td class="table-cell">${player.getWinsLosses()}</td>
`;

      playerTable.append(row);
    });
  };

  return { updatePlayerTable };
})();

const gameLogic = (function() {
  const addPlayerToList = function() {
    const playerName = document.getElementById("player-name").value;
    const playerSymbol = document.getElementById("player-symbol").value;

    const newPlayer = createPlayer(playerName, playerSymbol);
    listOfPlayers.push(newPlayer);

    addPlayerButton.reset();
    displayController.updatePlayerTable();
  };

  addPlayerButton.addEventListener("submit", function(event) {
    event.preventDefault();

    addPlayerToList();
    console.log(listOfPlayers.length);

    if (listOfPlayers.length === 2) {
      runGUI();
    }
  });

  const changeCurrentPlayer = function(currentPlayer) {
    if (currentPlayer == listOfPlayers[0]) {
      currentPlayer = listOfPlayers[1];
    } else {
      currentPlayer = listOfPlayers[0];
    }

    return currentPlayer;
  };

  return { changeCurrentPlayer };
})();

function runGUI() {
  gameBoard.style.visibility = "visible";
  addPlayerButton.style.display = "none";

  let isOver = false;
  let currentPlayer = listOfPlayers[0];

  cells.forEach((cell) => {
    cell.addEventListener("click", insertMark);
  });
}
