const Module = (() => {
  let gameBoard = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  };

  const displayController = (gameBoard) => {
    const container = document.querySelector('.container');
    for (cell in gameBoard) {
      const box = document.createElement('div');
      box.setAttribute('class', 'box');
      box.setAttribute('id', `box${cell}`);
      box.textContent = gameBoard[cell];
      container.appendChild(box);
    }
  }

  const Player = (playerName, sign) => {
    return {
      playerName: playerName,
      sign: sign,
    };
  };
  
  const player1 = Player('Player1','X');
  const player2 = Player('Player2','O');

  let currentPlayer = player1;
  
  const playerMove = (box,i) => {
    if (box.textContent == '') {
      box.textContent = currentPlayer.sign;
      gameBoard[i] = currentPlayer.sign;
      console.log(currentPlayer);
      currentPlayer = currentPlayer == player1 ? player2 : player1;
      console.log(currentPlayer);
      checker();
    }
  };

  function compare (a,b,c) {
    return (gameBoard[a] == gameBoard[b] && gameBoard[a] == gameBoard[c] && gameBoard[a] != '');
  };

  function tieChecker() {
    for (i = 1; i<= 9 ; i++) {
      if (gameBoard[i] == '') {
        return false;
      }
    };
    return true;
  }

  function checker() {
    if (compare(1,2,3) || compare(4,5,6) || compare(7,8,9) 
    || compare(1,4,7) || compare(2,5,8) || compare(3,6,9)
    || compare(1,5,9) || compare(3,5,7)) {
      if (currentPlayer == player1) {
        alert('Player 2 won')
      } else {
        alert('Player 1 won')
      };
      for (i = 1; i <= 9; i++){
        gameBoard[i] = '';
      }
    } else if (tieChecker()) {
      alert('Tie');
      for (i = 1; i <= 9; i++){
        gameBoard[i] = '';
      }
    }
  }
  return {
    displayController: displayController(gameBoard),
    playerMove: playerMove,
  }
})();

Module.displayController;

const boxes = document.querySelectorAll('.box');

boxes.forEach(box => box.addEventListener('click', () => {
  boxIndex = parseInt(box.id.charAt(box.id.length-1));
  Module.playerMove(box,boxIndex);
  console.log(boxIndex);
}));