// Players factory
let Player = (number, name) => {
  let playerName = name;
  let mark = (number === 1 ? 'X' : 'O');
  return {
    playerName,
    mark
  };
}


// Pre game setup
// Prevents form submit from refreshing the page
let players = [];

let form1 = document.querySelector("#player-1");
let form2 = document.querySelector("#player-2");
let gameSect = document.querySelector(".game");
function handleForm(event) {
  event.preventDefault();
}
form1.addEventListener('submit', handleForm);
form2.addEventListener('submit', handleForm);

const player1Name = (event) => {
  event.target.style.display = "none";
  form1.style.display = "flex";
}

const player2Name = () => {
  const player1 = Player(1, document.getElementById("name1").value);
  players[0] = player1;
  form1.style.display = "none";
  form2.style.display = "flex";
}

const gameStart = () => {
  const player2 = Player(2, document.getElementById("name2").value);
  players[1] = player2;
  form2.style.display = "none";
  gameSect.style.display = "flex";
  document.querySelector(".player").textContent = `${players[0].playerName} turn`;
}



// Game Play Module
let gamePlay = (() => {
  let turn = 1;

  // Game Board Module
  let gameBoard = (() => {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    // Checks for a winner
    const checkWin = (mark) => {
      if (
        (board[0] === mark && board[1] === mark && board[2] === mark) ||
        (board[3] === mark && board[4] === mark && board[5] === mark) ||
        (board[6] === mark && board[7] === mark && board[8] === mark) ||
        (board[0] === mark && board[3] === mark && board[6] === mark) ||
        (board[1] === mark && board[4] === mark && board[7] === mark) ||
        (board[2] === mark && board[5] === mark && board[8] === mark) ||
        (board[0] === mark && board[4] === mark && board[8] === mark) ||
        (board[6] === mark && board[4] === mark && board[2] === mark)
      ) {
        return true;
      }
    }

    // checks for a tie
    const checkTie = () => {
      let count = 0;
      for(let i = 0; i < 9; i++){
        if(board[i] != ' '){
          count++;
        }
      }
      return (count === 9 ? true : false);
    }

    // returns true if the space is free
    const checkSpace = (pos) => {
      return board[pos];
    }

    // puts a mark on the passed position
    const updateBoard = (pos, mark) => {
      board[pos] = mark;
    }

    // cleans the board
    const boardReset = () => {
      for (let i = 0; i < 9; i++) {
        board[i] = ' ';
      }
    }

    return {
      checkWin,
      checkTie,
      checkSpace,
      updateBoard,
      boardReset
    };
  })();


  // Checks for and winner and ends the game if found one
  const endGame = (mark) => {
    if (gameBoard.checkWin(mark)) {
      document.querySelector(".game-end").style.display = "flex";
      if(turn === 1){
        document.querySelector(".winner").textContent = `${players[0].playerName} wins!!!`;
      } else {
        document.querySelector(".winner").textContent = `${players[1].playerName} wins!!!`;
      }
      document.querySelector(".player").style.display = "none";
      return;
    } 
    
    if(gameBoard.checkTie()) {
      document.querySelector(".game-end").style.display = "flex";
      document.querySelector(".winner").textContent = `It's a tie...`;
      document.querySelector(".player").style.display = "none";
      return;
    }
  }

  // Changes the current turn
  const turnChange = () => {
    if (turn === 1) {
      turn = 2;
      document.querySelector(".player").textContent = `${players[1].playerName} turn`;
    } else {
      turn = 1;
      document.querySelector(".player").textContent = `${players[0].playerName} turn`;
    }
  }

  // Resets the game after finishing
  const reset = () => {
    let pos = ' ';
    gameBoard.boardReset();
    for (let i = 0; i < 9; i++) {
      pos = '.p' + (i + 1);
      document.querySelector(pos).textContent = ' ';
    }
    document.querySelector(".game-end").style.display = "none";
    document.querySelector(".player").style.display = "block";
  }


  // Updates the caller button and calls the necessary functions to complete a turn
  const turnUpdate = (pos, event, mark, color) => {
    gameBoard.updateBoard(pos, mark);
    event.target.textContent = mark;
    event.target.style.color = color;
    endGame(mark);
    turnChange();
  }


  // Plays the turn
  const playTurn = (event) => {
    let mark = turn === 1 ? players[0].mark : players[1].mark;
    let color = turn === 1 ? "#457B9D" : "#E63946";
    switch (event.target.className) {
      case "tl p1":
        if (gameBoard.checkSpace(0) != ' ') {
          break;
        }
        turnUpdate(0, event, mark, color);
        break;
      case "tm p2":
        if (gameBoard.checkSpace(1) != ' ') {
          break;
        }
        turnUpdate(1, event, mark, color);
        break;
      case "tr p3":
        if (gameBoard.checkSpace(2) != ' ') {
          break;
        }
        turnUpdate(2, event, mark, color);
        break;
      case "ml p4":
        if (gameBoard.checkSpace(3) != ' ') {
          break;
        }
        turnUpdate(3, event, mark, color);
        break;
      case "mm p5":
        if (gameBoard.checkSpace(4) != ' ') {
          break;
        }
        turnUpdate(4, event, mark, color);
        break;
      case "mr p6":
        if (gameBoard.checkSpace(5) != ' ') {
          break;
        }
        turnUpdate(5, event, mark, color);
        break;
      case "bl p7":
        if (gameBoard.checkSpace(6) != ' ') {
          break;
        }
        turnUpdate(6, event, mark, color);
        break;
      case "bm p8":
        if (gameBoard.checkSpace(7) != ' ') {
          break;
        }
        turnUpdate(7, event, mark, color);
        break;
      case "br p9":
        if (gameBoard.checkSpace(8) != ' ') {
          break;
        }
        turnUpdate(8, event, mark, color);
        break;
    }
  }

  return {
    playTurn,
    reset
  };
})();


function play(event) {
  gamePlay.playTurn(event);
}

function reset() {
  gamePlay.reset();
}
