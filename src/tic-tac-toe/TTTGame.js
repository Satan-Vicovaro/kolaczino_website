import React, { useState } from "react"
import Square from "./Square"
import Board from "./Board"
import GameInfo from "./GameInfo"
import "./TTTGame.css"
import OptionSlider from "./OptionSlider"

function TTTGame() {
  function UpdateScoreA(value) {
    setScorePlayerA(value);
  }

  function UpdateScoreB(value) {
    setScorePlayerB(value);
  }

  let [scorePlayerA, setScorePlayerA] = useState(0);
  let [scorePlayerB, setScorePlayerB] = useState(0);
  
  let [dimensionNum, setDimensionNum] = useState([2]);
  let [boardSize, setBoardSize] = useState([3]);

  return (
    <>
      <Board
        scorePlayerA={scorePlayerA} 
        scorePlayerB={scorePlayerB}
        
        setScorePlayerA={setScorePlayerA}
        setScorePlayerB={setScorePlayerB}

        dimensionNum={dimensionNum[0]}
        boardSize={boardSize}
      />
      
      <GameInfo scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB} dimensionNum={dimensionNum} />  
      <OptionSlider value={dimensionNum} setValue={setDimensionNum} max={6} min={1} />
    </>
    ) 
}
export default TTTGame
