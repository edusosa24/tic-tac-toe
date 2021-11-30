// Players factory
let Player = (number) => {
  let mark = (number === 1 ? 'X' : 'O');
  return {
    mark
  };
}

// Game Play Module
let gamePlay = (() => {
  let turn = 1;
  const player1 = Player(1);
  const player2 = Player(2);
  isWinner = false;

  // Game Board Module
  let gameBoard = (() => {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    const checkWin = () => {
      let mark = turn === 1 ? player1.mark : player2.mark;
      if(
        (board[0] === mark && board[1] === mark && board[2] === mark) ||
        (board[3] === mark && board[4] === mark && board[5] === mark) ||
        (board[6] === mark && board[7] === mark && board[8] === mark) ||
        (board[0] === mark && board[3] === mark && board[6] === mark) ||
        (board[1] === mark && board[4] === mark && board[7] === mark) ||
        (board[2] === mark && board[5] === mark && board[8] === mark) ||
        (board[0] === mark && board[4] === mark && board[8] === mark) ||
        (board[6] === mark && board[4] === mark && board[2] === mark) 
     ){
        isWinner = true;
        document.querySelector(".game-end").style.display = "flex";
        document.querySelector(".winner").textContent = `Player ${turn} wins!!!`;
        document.querySelector(".player").style.display = "none";
      }
    }

    const turnChange = () =>{
      if(turn === 1){
        turn = 2;
        document.querySelector(".player").textContent = "Player 2 turn";
      } else {
        turn = 1;
        document.querySelector(".player").textContent = "Player 1 turn";
      }
    }


    const updatePosition = (event) => {
      let mark = turn === 1 ? player1.mark : player2.mark;
      let color = turn === 1 ? "#457B9D" : "#E63946";
      switch (event.target.className) {
        case "tl p1":
          if(board[0] != ' '){
            break;
          }
          board[0] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
        case "tm p2":
          if(board[1] != ' '){
            break;
          }
          board[1] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
        case "tr p3":
          if(board[2] != ' '){
            break;
          }
          board[2] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
        case "ml p4":
          if(board[3] != ' '){
            break;
          }
          board[3] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
        case "mm p5":
          if(board[4] != ' '){
            break;
          }
          board[4] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
        case "mr p6":
          if(board[5] != ' '){
            break;
          }
          board[5] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
        case "bl p7":
          if(board[6] != ' '){
            break;
          }
          board[6] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
        case "bm p8":
          if(board[7] != ' '){
            break;
          }
          board[7] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
        case "br p9":
          if(board[8] != ' '){
            break;
          }
          board[8] = mark;
          event.target.textContent = mark;
          event.target.style.color = color;
          checkWin();
          turnChange();
          break;
      }
    }

    const reset = () => {
      let pos = ' ';
      for(let i = 0; i < 9; i++){
        board[i] = ' ';
        pos = '.p' + (i+1);
        document.querySelector(pos).textContent = ' ';
      }
      document.querySelector(".game-end").style.display = "none";
      document.querySelector(".player").style.display = "block";
    }

    return {
      reset,
      updatePosition
    };
  })();

  return{
    gameBoard
  };
})();

