import React, { useState } from "react"
import Square from "./Square"
import Board from "./Board"
import GameInfo from "./GameInfo"
import "./TTTGame.css"

function TTTGame() {
  function UpdateScoreA(value) {
    setScorePlayerA(value);
  }

  function UpdateScoreB(value) {
    setScorePlayerB(value);
  }

  let [scorePlayerA, setScorePlayerA] = useState(0);
  let [scorePlayerB, setScorePlayerB] = useState(0);

  return (
    <>
      <Board
        scorePlayerA={scorePlayerA} 
        scorePlayerB={scorePlayerB}
        
        setScorePlayerA={setScorePlayerA}
        setScorePlayerB={setScorePlayerB}/>
      
      <GameInfo scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB} />  
    </>
    ) 
}
export default TTTGame
