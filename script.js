const gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];
  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    } else {
      return false;
    }
  };

  const reset = () => {
    board.fill("");
  };

  return { getBoard, placeMarker, reset };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const gameController = (function () {
  let player1 = createPlayer("Player 1", "X");
  let player2 = createPlayer("Player 2", "O");

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

  let currentPlayer = player1;
  let gameState = "playing";
  let winner = null;

  const checkWinner = () => {
    const board = gameboard.getBoard();
    for (const combination of winningCombinations) {
      const square0 = combination[0];
      const square1 = combination[1];
      const square2 = combination[2];

      const gameboardsquare0 = board[square0];
      const gameboardsquare1 = board[square1];
      const gameboardsquare2 = board[square2];

      if (
        gameboardsquare0 !== "" &&
        gameboardsquare0 === gameboardsquare1 &&
        gameboardsquare1 === gameboardsquare2
      ) {
        return gameboardsquare0;
      }
    }
    return null;
  };

  const isBoardFull = () => {
    const ifFull = (currentSquare) => currentSquare !== "";
    return gameboard.getBoard().every(ifFull);
  };

  const detectWinner = () => {
    const didMoveWin = checkWinner();
    if (didMoveWin !== null) {
      return "win";
    } else {
      const boardIsFull = isBoardFull();
      if (boardIsFull) {
        return "draw";
      } else {
        return "playing";
      }
    }
  };

  const playRound = (index) => {
    if (gameState !== "playing") {
      return false;
    }

    const move = gameboard.placeMarker(index, currentPlayer.marker);

    if (move === true) {
      gameState = detectWinner();

      if (gameState === "win") {
        winner = currentPlayer;
      }

      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    } else {
      return false;
    }
    return true;
  };

  const getCurrentPlayer = () => currentPlayer;
  const getGameState = () => gameState;
  const getWinner = () => winner;

  const reset = () => {
    currentPlayer = player1;
    gameState = "playing";
    gameboard.reset();
    winner = null;
  };

  const setPlayers = (name1, name2) => {
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    reset();
  };

  return {
    setPlayers,
    playRound,
    getCurrentPlayer,
    getGameState,
    getWinner,
    reset,
  };
})();

const displayController = (function () {
  const container = document.querySelector("#container");
  const textBox = document.getElementById("game_status");
  const restartButton = document.getElementById("restart-button");
  const player1Input = document.getElementById("player1-name");
  const player2Input = document.getElementById("player2-name");
  const startButton = document.getElementById("start-button");

  const displayBoard = () => {
    const board = gameboard.getBoard();

    container.textContent = "";

    for (let index = 0; index < board.length; index++) {
      const square = document.createElement("div");
      square.textContent = board[index];
      square.dataset.number = index;
      square.classList.add("square");
      container.appendChild(square);
      square.addEventListener("click", (event) => {
        const indexOfClickedSquare = Number(event.target.dataset.number);
        gameController.playRound(indexOfClickedSquare);
        render();
      });
    }
  };

  const displayGameStatus = () => {
    if (gameController.getGameState() === "playing") {
      textBox.textContent = `${gameController.getCurrentPlayer().name}'s turn`;
    } else if (gameController.getGameState() === "win") {
      textBox.textContent = `${gameController.getWinner().name} wins!`;
    } else {
      textBox.textContent = `It's a draw!`;
    }
  };

  const render = () => {
    displayBoard();
    displayGameStatus();
  };

  restartButton.addEventListener("click", () => {
    gameController.reset();
    render();
  });

  startButton.addEventListener("click", () => {
    const name1 = player1Input.value.trim() || "Player 1";
    const name2 = player2Input.value.trim() || "Player 2";
    gameController.setPlayers(name1, name2);
    render();
  });

  return {
    render,
  };
})();

displayController.render();
