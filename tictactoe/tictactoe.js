const cells = document.querySelectorAll(".cell");

function createPlayer(name, symbol) {
  return { name, symbol };
}

function runGUI() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
      cells[i].innerText = "X";
    });
  }
}

runGUI();
