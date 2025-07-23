import React, { useState } from "react";
import Square from "./Square";
import { screen } from "@testing-library/dom";
function Board() {
  function handleSquareClick(i) {
    //square is already taken 
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setXIsNext(!xIsNext)
    
    setSquares(nextSquares);
  }

  function decideWinner() {
    
  }

  function createNDArray(dimensionNum, length) {
    
    if (dimensionNum === 1) {
      return Array.from({length}, (_,i) => i + 1)
    }
    return Array.from({length}, () => createNDArray(dimensionNum - 1, length))
  }

  // game data 
  const size = 5;
  const dimensionsNum = 2;
  const squareCount = Math.pow(size,dimensionsNum);
  const [squares, setSquares] = useState(Array({length: squareCount}).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // square elements
  const board = Array.from({length: squareCount }, (_,index) => index + 1);
  return <> {board.map((i) => (
    <React.Fragment>
      <Square key={i} value={squares[i]} onSquareClick={() => handleSquareClick(i)} />
      {(i) % size === 0 && <br />}
    </React.Fragment>
  ))}</>;
}

export default Board
