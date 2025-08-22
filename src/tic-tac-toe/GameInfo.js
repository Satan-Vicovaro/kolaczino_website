import React from "react";

function GameInfo( {scorePlayerA, scorePlayerB, dimensionNum} ) {

  return (
  <>
    <p1> {scorePlayerA} </p1>
    <p2> {scorePlayerB} </p2>
    <p3> {dimensionNum} </p3>
    </>
  )
}
export default GameInfo; 
