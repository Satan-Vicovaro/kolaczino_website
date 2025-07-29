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
  
  function getSquare(position, size) {
    let index = 0;
    // square position is eg. index = x + n^2y + n^3z + ...
    for (let i = 0; i < position.length; i++) {
      index += position[i] * Math.pow(size,i);
    }
    return index;
  }
  
  function pointsToCheck(dimensionsNum, size, result) {
    
    if (size == 0) {
      return 0;
    }
    
    pointsToCheck(dimensionsNum - 1, size, result);
  }

  function generateCombinations(result, currentOption, n, k) {
    if (currentOption.length === n - k) {
      // filling remaining space with 1's
      for(let i = 0; i < k; i++) {
        currentOption.push(1);
      }
      result.push(currentOption);
      return;
    }

    if (k === 0) {
      while(currentOption.length < n) {
        currentOption.push(0);
      }
      result.push(currentOption);
      return;
    }

    currentOption.push(0);
    generateCombinations(result,currentOption.slice(),n,k);
    currentOption.pop();

    currentOption.push(1);
    generateCombinations(result,currentOption.slice(),n,k-1);
  }

  function generatePosibilitesToCheck(dimensionsNum, size) {
    let posibilites = Array();
    // dimension 1:
    for (let i = 0; i < dimensionsNum; i++) {
      let value = Array(dimensionsNum).fill(0);
      value[i] = 1;
      posibilites.push(value)
    }
    console.log(posibilites);
  }
  
  function decideWinner() {
    
  }

  // game data 
  const size = 3;
  const dimensionsNum = 8;
  let result = Array();
  generateCombinations(result,Array(),dimensionsNum,4);
  console.log(result);
  //generatePosibilitesToCheck(dimensionsNum,size);

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
