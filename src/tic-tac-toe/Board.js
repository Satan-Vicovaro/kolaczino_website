import React, { useState } from "react";
import Square from "./Square";
import { screen } from "@testing-library/dom";
import { wait } from "@testing-library/user-event/dist/utils";
function Board() {
  function handleSquareClick(i) {
    //square is already taken 
    // if (squares[i]) {
    //   return;
    // }
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
    return squares[index];
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
  
  function seperateIndexes(direction, indexesToCheckDimension, indexesToShiftStartPoint) {
    direction.forEach((val, i) => {
      if (val === 1) {
       indexesToCheckDimension.push({index: i, mode:'I'}); // increase that index
      }
      else if (val === -1) {
       indexesToCheckDimension.push({index: i, mode:'D'}); // decrease that index (size - i)
      } else if (val === 0) {
        indexesToShiftStartPoint.push(i);
      }
    });
  }

  function createStartPoint(direction) {
    let startPoint = Array(dimensionsNum).fill(0);
    startPoint = startPoint.map((val, i) =>
      direction[i] === -1 ? size - 1 : val
    );
    return startPoint
  }

  function checkLoop(direction) {
    let startPoint = createStartPoint(direction);

    const indexesToCheckDimension = [];
    const indexesToShiftStartPoint = [];
    seperateIndexes(direction, indexesToCheckDimension, indexesToShiftStartPoint);

    let curIteration = 0;
    let maxIteration = Math.pow(size, indexesToShiftStartPoint.length);

    while (curIteration < maxIteration) {
      let lineStatus = checkDimension(startPoint.slice(), indexesToCheckDimension);
      
      if (lineStatus.filled) {
        console.log(lineStatus.player);
      }

      curIteration +=1;
      shiftStartPoint(startPoint, indexesToShiftStartPoint, curIteration);
    }
  }

  function checkDimension(startPoint, indexesToCheckDimension) {
    let player = getSquare(startPoint);
    // if (player === null || player === undefined) {
    //     return {filled: false, player:null}
    // }
    if (!(player ==="X" || player ==="O")) {
      return {filled: false, player:null}
    }
    for (let i = 0; i < size; i++) {
      if (getSquare(startPoint) !== player) {
        return {filled: false, player:player}
      }

      indexesToCheckDimension.forEach((val) => {
        if (val.mode === 'I') {
          startPoint[val.index] += 1;
        } else if (val.mode === 'D') {
          startPoint[val.index] -= 1;
        }
      });
    }
    return {filled: true, player:player}
  }

  function shiftStartPoint(point, indexesToShiftStartPoint, curIteration) {
    let devisor = size;
    let newCoordinates = Array(dimensionsNum).fill(0);
    
    let i = 0;
    while(curIteration !== 0) {
      newCoordinates[i] = curIteration%devisor;
      curIteration = Math.floor(curIteration / devisor); // curIteration /= devisor xD
      i += 1;
    }
    
    for (let i = 0; i < indexesToShiftStartPoint.length; i++) {
      let index = indexesToShiftStartPoint[i];
      point[index] = newCoordinates[i];
    }
  }

  function decideWinner() {
    let allPosibilites = generatePosibilitesToCheck(dimensionsNum,size);
    //console.log(allPosibilites);
    for (let i = 0; i < allPosibilites.length; i++) {
      let direction = allPosibilites[i];
      checkLoop(direction); 
    }  
  }

  // game data 
  const size = 3;
  const dimensionsNum = 3;
  
  const squareCount = Math.pow(size,dimensionsNum);
  
  const [squares, setSquares] = useState(Array.from({length: squareCount}, (_,i) => i));
  const [xIsNext, setXIsNext] = useState(true);
  
  decideWinner();


  // square elements
  const board = Array.from({length: squareCount}, (_,index) => index);
  return <> {board.map((i) => (
    <React.Fragment>
      <Square key={i} value={squares[i]} onSquareClick={() => handleSquareClick(i)} />
      {(i + 1) % size === 0 && <br />}
    </React.Fragment>
  ))}</>;
}

export default Board
