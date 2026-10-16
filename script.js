// My object containing my 9 squares and changeSquare method
// changeSquare checks if a square is empty or not

const GameBoardObject = {
  gameboard: ["", "", "", "", "", "", "", "", ""],

  changeSquare: function (index, marker) {
    if (this.gameboard[index] === "") {
      this.gameboard[index] = marker;

      return true;
    } else {
      return false;
    }
  },
};

// factory function to make new players
function createPlayer(name, marker) {
  return { name, marker };
}

// manually creating 2 players

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

// winning combination arrays
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameController = {
  currentPlayer: player1,

  playRound: function (index) {
    if (this.gameState == "playing") {
    } else {
      return false;
    }

    let move = GameBoardObject.changeSquare(index, this.currentPlayer.marker);

    if (move === true) {
      this.gameState = this.detectWinner();

      if (this.currentPlayer === player1) {
        this.currentPlayer = player2;
      } else {
        this.currentPlayer = player1;
      }
    } else {
      return false;
    }
  },

  checkWinner: function () {
    for (const combination of winningCombinations) {
      const square0 = combination[0];
      const square1 = combination[1];
      const square2 = combination[2];

      const gameboardsquare0 = GameBoardObject.gameboard[square0];
      const gameboardsquare1 = GameBoardObject.gameboard[square1];
      const gameboardsquare2 = GameBoardObject.gameboard[square2];

      if (
        gameboardsquare0 !== "" &&
        gameboardsquare0 === gameboardsquare1 &&
        gameboardsquare1 === gameboardsquare2
      ) {
        return gameboardsquare0;
      }
    }
    return null;
  },

  isBoardFull: function () {
    const ifFull = (currentSquare) => currentSquare !== "";
    return GameBoardObject.gameboard.every(ifFull);
  },

  detectWinner: function () {
    const didMoveWin = this.checkWinner();
    if (didMoveWin !== null) {
      return didMoveWin;
    } else {
      const boardIsFull = this.isBoardFull();
      if (boardIsFull) {
        return "draw";
      } else {
        return "playing";
      }
    }
  },

  gameState: "playing",
};
