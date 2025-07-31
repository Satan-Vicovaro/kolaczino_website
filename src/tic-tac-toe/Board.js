import React, { useState } from "react";
import Square from "./Square";
import { screen } from "@testing-library/dom";
import { wait } from "@testing-library/user-event/dist/utils";
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
  
  function getSquare(position) {
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
    let result = Array();
    let firstDimension = Array();
    generateCombinations(firstDimension, Array(),dimensionsNum,1);
    result = result.concat(firstDimension);

    for(let i = 2; i < dimensionsNum; i++) {
      let dimensionResult = Array();
      generateCombinations(dimensionResult,Array(),dimensionsNum,i);
      let revertedDimension = structuredClone(dimensionResult);
      revertedDimension.forEach((array, index) => {
        for(let i = 0; i < array.length; i++) {
          if (array[i] === 1) {
            array[i] = -1;
            break;
          }
        }
      } )
      dimensionResult = dimensionResult.concat(revertedDimension);
      result = result.concat(dimensionResult);
    }

    // last dimension
    for(let i = 0; i < dimensionsNum; i++) {
      let lastDimension = Array(dimensionsNum).fill(1);
      lastDimension[i] = -1;
      result.push(lastDimension);
    }

    return result;
  }

  function slowChange() {

  } 
    
  function checkLoop(direction) {
    
    let currentPoint = Array(dimensionsNum).fill(0);
    currentPoint = currentPoint.map((val, i) =>
      direction[i] === -1 ? size - 1 : val
    );
    
    const indexesToIncrease = [];
    direction.forEach((val, i) => {
      if(val === 1) {
       indexesToIncrease.push({index: i, mode:'I'}); // increase that index
      }
      else if(val === -1) {
       indexesToIncrease.push({index: i, mode:'D'}); // decrease that index (size - i)
      } 
    });

    
    let lineIsFull = true;
    for (let i = 0; i < size; i++) {
      if(getSquare(currentPoint)=== null) {
        lineIsFull = false;
        break;
      }
      indexesToIncrease.forEach((val) => {
        if(val.mode === 'I') {
          currentPoint[val.index] += 1;
          return;
        }
        if(val.mode === 'D') {
          currentPoint[val.index] -= 1;
        }
      });
    }  
  }
  
  function decideWinner() {
    let allPosibilites = generatePosibilitesToCheck(dimensionsNum,size);
    console.log(allPosibilites);
    for(let i = 0; i < allPosibilites.length; i++) {
      let direction = allPosibilites[i];
      checkLoop(direction); 
    }  
  }

  // game data 
  const size = 5;
  const dimensionsNum = 3;
  decideWinner();

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
