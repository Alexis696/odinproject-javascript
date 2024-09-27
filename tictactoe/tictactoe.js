let listOfPlayers = [];

const cells = document.querySelectorAll(".cell");
const addPlayerButton = document.querySelector("#player-form");

function createPlayer(name, symbol) {
  return { name, symbol };
}

function updatePlayerList() {
  const playerTable = document.querySelector("#player-table");
  playerTable.innerHTML = '';


}

function runGUI() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
      cells[i].innerText = "X";
    });
  }

  addPlayerButton.addEventListener("submit", function(event) {
    event.preventDefault();

    const playerName = document.getElementById("player-name").value;
    const playerSymbol= document.getElementById("player-symbol").value;

    const newPlayer = createPlayer(playerName, playerSymbol);
    listOfPlayers.push(newPlayer);
    console.log(listOfPlayers);

    addPlayerButton.reset();
  });
}

runGUI();
