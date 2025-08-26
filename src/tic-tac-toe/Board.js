import React from "react";
import { useState, useEffect} from "react";
import Square from "./Square";

function Board({scorePlayerA, scorePlayerB, setScorePlayerA, setScorePlayerB, dimensionNum ,boardSize,}) {
  function handleSquareClick(i) {
    //square is already taken 
    // if (squares[i]) {
    //   return;
    // }

    setScorePlayerA(scorePlayerA);
    setScorePlayerB(scorePlayerB);
    
    const nextSquares = squares.slice();
    
    if (xIsNext) {
      nextSquares[i].value = "X";
    } else {
      nextSquares[i].value = "O";
    }

    decideWinner();
    
    setXIsNext(!xIsNext)
    
    setSquares(nextSquares);
  }

  function handleSquareMouseEnter(squareNumber) {
    let position = getPostion(squareNumber);
    let neighbourhood = getPointNeighbourhood(position, neighbourhoodDirections, size);
    neighbourhood = neighbourhood.map(element => getSquareIndex(element));

    const nextSquares = squares.slice();

    for (let i = 0; i < neighbourhood.length; i++) {
      let squareToChange = neighbourhood[i];
      nextSquares[squareToChange].hovered = true;
    }

    setSquares(nextSquares);
  }

  function handleSquareMouseLeave(i) {
    const nextSquares = squares.slice();
    for(let i = 0; i < squares.length; i++) {
      nextSquares[i].hovered = false;
    }
    setSquares(nextSquares);
  }

  // index into (x,y,z,...)
  function getPostion(square) {
    return convertBase(square, size, dimensionsNum);
  }

  
  // (x,y,z,...) into index
  function getSquareIndex(position) {
    let index = 0;
    // square position is eg. index = x + n^2y + n^3z + ...
    for (let i = 0; i < position.length; i++) {
      index += position[i] * Math.pow(size,i);
    }
    return index;
  }

  // (x,y,z,...) into object
  function getSquare(position) {
    let index = 0;
    // square position is eg. index = x + n^2y + n^3z + ...
    for (let i = 0; i < position.length; i++) {
      index += position[i] * Math.pow(size,i);
    }
    return squares[index];
  }
  
  function generatePosibilitesToCheck(dimensionNum) {
    let allDirections = createNeighbourhoodVector(dimensionNum);
    let middleElementIndex = Math.floor(allDirections.length/2);
    allDirections.splice(middleElementIndex,1); 
    allDirections.splice(0,allDirections.length/2)
    return allDirections;
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

    let scoreA = 0;
    let scoreB = 0;
    while (curIteration < maxIteration) {
      let lineStatus = checkDimension(startPoint.slice(), indexesToCheckDimension);
      
      if (lineStatus.filled) {
        if (lineStatus.player === "X") {
          scoreA += 1;
        } else {
          scoreB += 1;
        }
      }

      curIteration +=1;
      shiftStartPoint(startPoint, indexesToShiftStartPoint, curIteration);
    }
    
    return {scoreA, scoreB}
  }

  function checkDimension(startPoint, indexesToCheckDimension) {
    let player = getSquare(startPoint).value;
    // if (player === null || player === undefined) {
    //     return {filled: false, player:null}
    // }
    if (!(player ==="X" || player ==="O")) {
      return {filled: false, player:null}
    }
    for (let i = 0; i < size; i++) {
      if (getSquare(startPoint).value !== player) {
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

    let totalScoreA = 0;
    let totalScoreB = 0;
    for (let i = 0; i < allPosibilites.length; i++) {
      let direction = allPosibilites[i];
      const {scoreA, scoreB} = checkLoop(direction);
      totalScoreA += scoreA;
      totalScoreB += scoreB;
    }  
    setScorePlayerA(totalScoreA);
    setScorePlayerB(totalScoreB);
  }



  // converts unsigned integer into different base
  function convertBase(number, base, dimensionsNum) {
    let result = Array(dimensionsNum).fill(0);
    if (number <= 0) {
      return result;
    }
    let i = 0;
    while(number != 0) {
      result[i] = number % base;
      number = Math.floor(number / base);
      i += 1;
    }
    // result.reverse();
    return result;
  }
  
  function createNeighbourhoodVector(dimensionsNum) {
    let i = 0;
    let iterations = Math.pow(3, dimensionsNum);
    let vector = Array(iterations);
    while (i < iterations) {
      let direction = convertBase(i,3,dimensionsNum); 
      // to conver it into range -1, 0, 1
      vector[i] = direction.map(element => element - 1);
      i += 1;
    }
    return vector;
  }


  function getPointNeighbourhood(position, neighbourhood, boardSize) {
    let result = Array(0);
    for (let i = 0; i < neighbourhood.length; i++) {
      let direction = neighbourhood[i];

      let neighbour = Array();
      let neighbourExist = true;
      for (let j = 0; j < direction.length; j++) {
        if (position[j] + direction[j] < 0 || position[j] + direction[j] > boardSize - 1) {
          neighbourExist = false;
          break;
        }
        neighbour.push(position[j] + direction[j]);
      }

      if (neighbourExist) {
        result.push(neighbour);
      }
    }
    return result;
  }

  

  // Recursive function to group into nested grids
  function buildGrid(items, depth) {
    if (depth === 1) {
      // Base case: last dimension → just render row of squares
      return (
        <GridHorizontal columns={size}>
          {items.map((square, idx) => (
            <Square
              key={square.id}
              value={square.value}
              onSquareClick={() => handleSquareClick(square.id)}
              onSquareMouseEnter={() => handleSquareMouseEnter(square.id)}
              onSquareMouseLeave={() => handleSquareMouseLeave(square.id)}
              style={{
                 backgroundColor: square.hovered ? "deepskyblue" : "lightblue",
                 color: square.hovered ? "white" : "black",
              }}
            />
          ))}
        </GridHorizontal>
      );
    }

    // Group items into chunks of size^(depth-1)
    const chunkSize = Math.pow(size, depth - 1);
    const groups = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      groups.push(items.slice(i, i + chunkSize));
    }

    if (depth === 2 || depth === 3) {
      return (
       <GridVertical rows={size} gap="10px">
          {groups.map((group, idx) => (
            <div key={idx}>{buildGrid(group, depth - 1)}</div>
          ))}
        </GridVertical>
      );
    }
  
    if ((depth) % 2 === 0) {
      return (
        <GridHorizontal columns={size} gap="10px">
          {groups.map((group, idx) => (
            <div key={idx}>{buildGrid(group, depth - 1)}</div>
          ))}
        </GridHorizontal>
      );
    } else {
      return (
        <GridVertical rows={size} gap="10px">
          {groups.map((group, idx) => (
            <div key={idx}>{buildGrid(group, depth - 1)}</div>
          ))}
        </GridVertical>
      );
    }
  }
  
  function GridVertical({rows, gap = "2px", children }) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, auto)`,
          gap,
          border:"1px solid black",
        }}
      >
        {children}
      </div>
    );
  }

  function GridHorizontal({ columns, gap = "2px", children }) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, auto)`,
          gap,
          border:"1px solid black",
        }}
      >
        {children}
      </div>
    );
  }

  //--------------- game data --------------- 
  const size = boardSize;
  const dimensionsNum = dimensionNum;
  
  const squareCount = Math.pow(size,dimensionsNum);
  
  const [squares, setSquares] = useState(Array.from({length: squareCount}, (_,i) => ({
    id: i,
    value: "",
    hovered:false,
  })));

  useEffect(() => {
    setSquares(prev =>
      Array.from({ length: squareCount }, (_, i) =>
        prev[i] ? prev[i] : { id: i, value: "", hovered: false }
      )
    );
  }, [squareCount]);
  
  const [xIsNext, setXIsNext] = useState(true);
  const neighbourhoodDirections = createNeighbourhoodVector(dimensionsNum);

  return <div
    style={{
      width: "75%",            // take 80% of viewport width
      margin: "0 auto",        // center horizontally
      display: "flex",         // use flexbox for inner alignment
      justifyContent: "center",// center inner content horizontally
      alignItems: "center",    // center inner content vertically
      minHeight: "100vh",      // make it fill screen height
      border: "1px solid black"
    }}>
    {buildGrid(squares, dimensionsNum)}</div>;

}

export default Board;
