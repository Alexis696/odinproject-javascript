const prompt = require("prompt-sync")({ sigint: true });

function createPlayer(name, symbol) {
  return { name, symbol };
}

function GameBoard() {
  board = {
  ["topL"] : " ",
  ["topM"] : " ",
  ["topR"] : " ",
  ["midL"] : " ",
  ["midM"] : " ",
  ["midR"] : " ",
  ["botL"] : " ",
  ["botM"] : " ",
  ["botR"] : " "
};

  const printBoardTUI = function() {
    console.log(`${board["topL"]} | ${board["topM"]} | ${board["topR"]}
---------
${board["midL"]} | ${board["midM"]} | ${board["midR"]}
---------
${board["botL"]} | ${board["botM"]} | ${board["botR"]}`);
  };

  return { board , printBoardTUI };
}

function runTUI() {
  currentBoard = new GameBoard();
  let currentPlayer = {};
  
  console.log("TIC TAC TOE");
  player1Name = prompt("Insert name for player 1: ");
  player1Symbol = prompt("Insert a character to represent player 1: ");
  player1 = createPlayer(player1Name, player1Symbol);
  
  player2Name = prompt("Insert name for player 2: ");
  player2Symbol = prompt("Insert a character to represent player 2: ");
  player2 = createPlayer(player2Name, player2Symbol);

  console.log("Players:");
  console.log(`Player 1: ${player1.name} = ${player1.symbol}`);
  console.log(`Player 2: ${player2.name} = ${player2.symbol}`);

  while (true) {
    console.log("Current Board: ");
    currentBoard.printBoardTUI();

    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    placement = prompt(`It's ${currentPlayer.name}'s turn. Type where you want your mark: `);
    currentBoard.board[placement] = currentPlayer.symbol;
    
  }
}

const gameLogic = (function() { })();

runTUI();
