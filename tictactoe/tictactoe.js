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

  const runGame = function() {
    gameBoard.style.visibility = "visible";
    addPlayerButton.style.display = "none";

    let currentPlayer = listOfPlayers[0];

    cells.forEach((cell) => {
      cell.addEventListener("click", function(event) {
        const clickedCell = event.target;

        if (clickedCell.textContent !== "") {
          console.log("This cell is already filled, choose another one");
        } else {
          clickedCell.textContent = currentPlayer.symbol;
          currentPlayer = gameLogic.changeCurrentPlayer(currentPlayer);
        }
      });
    });
  };

  return { updatePlayerTable, runGame };
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
      displayController.runGame();
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

  const checkWinner = function(currentPlayer) {
    if (
      (currentPlayer.symbol === board["topL"] &&
        currentPlayer.symbol === board["topM"] &&
        currentPlayer.symbol === board["topR"]) ||
      (currentPlayer.symbol === board["midL"] &&
        currentPlayer.symbol === board["midM"] &&
        currentPlayer.symbol === board["midR"]) ||
      (currentPlayer.symbol === board["botL"] &&
        currentPlayer.symbol === board["botM"] &&
        currentPlayer.symbol === board["botR"]) ||
      (currentPlayer.symbol === board["topL"] &&
        currentPlayer.symbol === board["midL"] &&
        currentPlayer.symbol === board["botL"]) ||
      (currentPlayer.symbol === board["topM"] &&
        currentPlayer.symbol === board["midM"] &&
        currentPlayer.symbol === board["botM"]) ||
      (currentPlayer.symbol === board["topR"] &&
        currentPlayer.symbol === board["midR"] &&
        currentPlayer.symbol === board["botR"]) ||
      (currentPlayer.symbol === board["topL"] &&
        currentPlayer.symbol === board["midM"] &&
        currentPlayer.symbol === board["botR"]) ||
      (currentPlayer.symbol === board["botL"] &&
        currentPlayer.symbol === board["midM"] &&
        currentPlayer.symbol === board["topR"])
    );
  };

  return { changeCurrentPlayer };
})();
