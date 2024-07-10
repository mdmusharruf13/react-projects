import { useEffect } from "react";
import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {value}
    </button>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [xTurn, setXTurn] = useState(true);
  const [winStatus, setWinStatus] = useState(null);

  const getWinner = () => {
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];

    for (let i = 0; i < winningPattern.length; i++) {
      const [x, y, z] = winningPattern[i];
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[index]) return;
    cpySquares[index] = xTurn ? "X" : "O";
    setSquares(cpySquares);
    setXTurn(!xTurn);
  };

  const handleRestart = () => {
    setXTurn(true);
    setSquares(Array(9).fill(""));
  };

  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setWinStatus(`This is draw ! please restart the game`);
    } else if (getWinner(squares)) {
      setWinStatus(`Winner is ${getWinner(squares)} please restart the game`);
    } else {
      setWinStatus(`Next Player is ${xTurn ? "X" : "O"} turn`);
    }
  });

  return (
    <main className="flex direction-col align-center m-100">
      <section className="flex">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </section>
      <section className="flex">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </section>
      <section className="flex">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </section>
      <section className="flex direction-col m-10 align-center">
        <p>{winStatus}</p>
        <button onClick={handleRestart} className="m-5 p-5 w-70px">
          restart
        </button>
      </section>
    </main>
  );
}

export default App;
