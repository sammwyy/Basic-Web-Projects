const msgElement = document.getElementById("message");
const cellElements = document.querySelectorAll("[position].cell");
const cells = [];

const possibleWins = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

let playerTurn = 1;
let isPlaying = true;

function setCellAtMarked(index, player) {
  const element = cellElements[index - 1];
  element.style.backgroundColor = player == 1 ? "green" : "red";
}

function clickCell(index, player) {
  for (let cell of cells) {
    if (cell.index === index) {
      return false;
    }
  }

  cells.push({
    index,
    player,
  });

  setCellAtMarked(index, player);
  return true;
}

function setWinner(player) {
  isPlaying = false;

  if (player == 1) {
    msgElement.innerHTML = "Winner: <span style='color: green'>Player 1</span>";
  } else if (player == 2) {
    msgElement.innerHTML = "Winner: <span style='color: red'>Player 2</span>";
  } else {
    msgElement.innerHTML = "<span style='color: cyan'>Draw</span>";
  }
}

function isWin(slots) {
  for (let possibleWin of possibleWins) {
    let winnerSlots = 0;
    for (let possibleWinSlot of possibleWin) {
      if (slots.includes(possibleWinSlot)) {
        winnerSlots++;
      }
    }

    if (winnerSlots == 3) {
      return true;
    } else {
      continue;
    }
  }

  return false;
}

function checkForWins() {
  const playerOneSlots = [];
  const playerTwoSlots = [];

  for (let cell of cells) {
    if (cell.player == 1) {
      playerOneSlots.push(cell.index);
    } else {
      playerTwoSlots.push(cell.index);
    }
  }

  if (isWin(playerOneSlots)) {
    setWinner(1);
  } else if (isWin(playerTwoSlots)) {
    setWinner(2);
  } else if (cells.length == 9) {
    setWinner(0);
  }
}

for (let cell of cellElements) {
  const index = cell.getAttribute("position");
  cell.addEventListener("click", () => {
    if (isPlaying) {
      if (clickCell(parseInt(index), playerTurn)) {
        if (playerTurn == 1) {
          msgElement.innerHTML =
            "<span style='color: red'>Player 2</span>'s Turn";
          playerTurn = 2;
        } else {
          msgElement.innerHTML =
            "<span style='color: green'>Player 1</span>'s Turn";
          playerTurn = 1;
        }

        checkForWins();
      }
    }
  });
}
