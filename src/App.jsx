import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = deriveActivePlayer(gameTurns);
  
  let gameBoard = initialGameBoard;
  for(let turn of gameTurns){
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = "";
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  let isDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' isActive={activePlayer === "X"} />
          <Player name='Player 2' symbol='O' isActive={activePlayer === "O"} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
