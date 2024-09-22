const prompt = require("prompt-sync")({ sigint: true });

function createPlayer(name, symbol) {
  return { name, symbol };
}

function GameBoard() {
  topL = " ";
  topM = " ";
  topR = " ";
  midL = " ";
  midM = " ";
  midR = " ";
  botL = " ";
  botM = " ";
  botR = " ";

  const printBoardTUI = function() {
    console.log(`${topL} | ${topM} | ${topR}
---------
${midL} | ${midM} | ${midR}
---------
${botL} | ${botM} | ${botR}`);
  };

  return { printBoardTUI };
}

function runTUI() {
  currentBoard = new GameBoard();
  currentBoard.printBoardTUI();
  
  console.log("TIC TAC TOE");
  player1Name = prompt("Insert name for player 1: ");
  player1Symbol = prompt("Insert a character to represent player 1: ");
  player1 = createPlayer(player1Name, player1Symbol);
  
  player2Name = prompt("Insert name for player 2: ");
  player2Symbol = prompt("Insert a character to represent player 2: ");
  player2 = createPlayer(player2Name, player2Symbol);
}

const gameLogic = (function() { })();

runTUI();
