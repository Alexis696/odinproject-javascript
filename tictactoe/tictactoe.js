let listOfPlayers = [];
const gameBoard = document.querySelector(".board");
gameBoard.style.visibility = "hidden";

const cells = document.querySelectorAll(".cell");
const addPlayerButton = document.querySelector("#player-form");

function createPlayer(name, symbol) {
  let wins = 0;
  let losses = 0;

  const getWinsLosses = () => `${wins}/${losses}`;
  const addWin = () => wins++;
  const addLoss = () => losses++;
  return { name, symbol, getWinsLosses, addWin, addLoss };
}

const displayController = (function () {
  const updatePlayerTable = function () {
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

  const clearBoard = function () {
    for (let i = 0; i < 9; i++) {
      document.querySelectorAll(".cell")[i].textContent = "";
    }
  };

  const runGame = function () {
    gameBoard.style.visibility = "visible";
    addPlayerButton.style.display = "none";

    let currentPlayer = listOfPlayers[0];

    const gameStatus = document.querySelector(".game-status");
    gameStatus.textContent = `It's ${currentPlayer.name}'s turn`;

    const restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", function () {
      clearBoard();
      restartButton.hidden = true;
      gameStatus.textContent = `It's ${currentPlayer.name}'s turn`;
    });

    cells.forEach((cell) => {
      cell.addEventListener("click", function (event) {
        const clickedCell = event.target;

        if (clickedCell.textContent !== "") {
          console.log("This cell is already filled, choose another one");
          alert("This cell is already filled, choose another one");
        } else {
          clickedCell.textContent = currentPlayer.symbol;
          if (gameLogic.checkWinner(currentPlayer)) {
            console.log(`${currentPlayer.name} won!`);
            gameLogic.addWinLossToPlayers(currentPlayer);
            updatePlayerTable();
            restartButton.hidden = false;
            gameStatus.textContent = `${currentPlayer.name} has won! Press the button to play again.`;
            //alert(`${currentPlayer.name} won!`);
            return;
          }
          if (gameLogic.checkIfTie()) {
            updatePlayerTable();
            clearBoard();
            alert("It's a tie!");
          }
          currentPlayer = gameLogic.changeCurrentPlayer(currentPlayer);
        }
        gameStatus.textContent = `It's ${currentPlayer.name}'s turn`;
      });
    });
  };

  return { updatePlayerTable, runGame };
})();

const gameLogic = (function () {
  const addPlayerToList = function () {
    const playerName = document.getElementById("player-name").value;
    const playerSymbol = document.getElementById("player-symbol").value;

    const newPlayer = createPlayer(playerName, playerSymbol);
    listOfPlayers.push(newPlayer);

    addPlayerButton.reset();
    displayController.updatePlayerTable();
  };

  addPlayerButton.addEventListener("submit", function (event) {
    event.preventDefault();

    addPlayerToList();

    if (listOfPlayers.length === 2) {
      displayController.runGame();
    }
  });

  const changeCurrentPlayer = function (currentPlayer) {
    if (currentPlayer == listOfPlayers[0]) {
      currentPlayer = listOfPlayers[1];
    } else {
      currentPlayer = listOfPlayers[0];
    }

    return currentPlayer;
  };

  const checkWinner = function (currentPlayer) {
    if (
      (currentPlayer.symbol === document.querySelector(".topL").textContent &&
        currentPlayer.symbol === document.querySelector(".topM").textContent &&
        currentPlayer.symbol === document.querySelector(".topR").textContent) ||
      (currentPlayer.symbol === document.querySelector(".midL").textContent &&
        currentPlayer.symbol === document.querySelector(".midM").textContent &&
        currentPlayer.symbol === document.querySelector(".midR").textContent) ||
      (currentPlayer.symbol === document.querySelector(".botL").textContent &&
        currentPlayer.symbol === document.querySelector(".botM").textContent &&
        currentPlayer.symbol === document.querySelector(".botR").textContent) ||
      (currentPlayer.symbol === document.querySelector(".topL").textContent &&
        currentPlayer.symbol === document.querySelector(".midL").textContent &&
        currentPlayer.symbol === document.querySelector(".botL").textContent) ||
      (currentPlayer.symbol === document.querySelector(".topM").textContent &&
        currentPlayer.symbol === document.querySelector(".midM").textContent &&
        currentPlayer.symbol === document.querySelector(".botM").textContent) ||
      (currentPlayer.symbol === document.querySelector(".topR").textContent &&
        currentPlayer.symbol === document.querySelector(".midR").textContent &&
        currentPlayer.symbol === document.querySelector(".botR").textContent) ||
      (currentPlayer.symbol === document.querySelector(".topL").textContent &&
        currentPlayer.symbol === document.querySelector(".midM").textContent &&
        currentPlayer.symbol === document.querySelector(".botR").textContent) ||
      (currentPlayer.symbol === document.querySelector(".botL").textContent &&
        currentPlayer.symbol === document.querySelector(".midM").textContent &&
        currentPlayer.symbol === document.querySelector(".topR").textContent)
    ) {
      return true;
    }
    return false;
  };

  const checkIfTie = function () {
    if (
      document.querySelector(".topL").textContent !== "" &&
      document.querySelector(".topM").textContent !== "" &&
      document.querySelector(".topR").textContent !== "" &&
      document.querySelector(".midL").textContent !== "" &&
      document.querySelector(".midM").textContent !== "" &&
      document.querySelector(".midR").textContent !== "" &&
      document.querySelector(".botL").textContent !== "" &&
      document.querySelector(".botM").textContent !== "" &&
      document.querySelector(".botR").textContent !== ""
    ) {
      return true;
    }
    return false;
  };

  const addWinLossToPlayers = function (currentPlayer) {
    if (currentPlayer === listOfPlayers[0]) {
      listOfPlayers[0].addWin();
      listOfPlayers[1].addLoss();
    } else if (currentPlayer === listOfPlayers[1]) {
      listOfPlayers[1].addWin();
      listOfPlayers[0].addLoss();
    }
  };

  return { changeCurrentPlayer, checkWinner, checkIfTie, addWinLossToPlayers };
})();
