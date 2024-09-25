const prompt = require("prompt-sync")({ sigint: true });

function createPlayer(name, symbol) {
  return { name, symbol };
}

const GameBoard = (function() {
  const board = {
    ["topL"]: " ",
    ["topM"]: " ",
    ["topR"]: " ",
    ["midL"]: " ",
    ["midM"]: " ",
    ["midR"]: " ",
    ["botL"]: " ",
    ["botM"]: " ",
    ["botR"]: " ",
  };

  const printBoardTUI = function() {
    console.log(`${board["topL"]} | ${board["topM"]} | ${board["topR"]}
---------
${board["midL"]} | ${board["midM"]} | ${board["midR"]}
---------
${board["botL"]} | ${board["botM"]} | ${board["botR"]}`);
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
    ) {
      return true;
    }
    return false;
  };

  const checkTie = function() {
    return Object.values(board).every(x => x !== ' ');
  };

  return { board, printBoardTUI, checkWinner, checkTie };
})();

function runTUI() {
  let currentPlayer = {};

  console.log("TIC TAC TOE");
  player1Name = prompt("Insert name for player 1: ");
  player1Symbol = prompt("Insert a character to represent player 1: ");
  player1 = createPlayer(player1Name, player1Symbol);

  player2Name = prompt("Insert name for player 2: ");
  player2Symbol = prompt("Insert a character to represent player 2: ");
  player2 = createPlayer(player2Name, player2Symbol);

  while (true) {
    console.clear();
    console.log("Players:");
    console.log(`Player 1: ${player1.name} = ${player1.symbol}`);
    console.log(`Player 2: ${player2.name} = ${player2.symbol}`);
    console.log();
    console.log("Current Board: ");

    GameBoard.printBoardTUI();

    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    console.log();
    console.log(
      `It's ${currentPlayer.name}'s turn. Type where you want your mark: `,
    );
    placement = prompt();
    GameBoard.board[placement] = currentPlayer.symbol;

    if (GameBoard.checkWinner(currentPlayer) === true) {
      console.clear();
      console.log("Final Board: ");
      GameBoard.printBoardTUI();
      console.log();
      console.log(`${currentPlayer.name} won! Do you want to play again?`);
      break;
    }

    if(GameBoard.checkTie() === true) {
      console.clear();
      console.log("Final Board: ");
      GameBoard.printBoardTUI();
      console.log();
      console.log(`It's a tie! Do you want to play again?`);
      break;
    }
  }
}

function runGUI() {
  
}

runTUI();
