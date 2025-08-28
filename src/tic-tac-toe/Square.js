import React from "react";  
import { useState } from "react";

function Square({value, onSquareClick, onSquareMouseEnter, onSquareMouseLeave, hovered }) {
  
  const colors = ["#F97E1B", "#1B96F9","var(--gray-a11)","#FBA35C", "#5CB4FB", "var(--gray-a8)", "black"];

  let colorIndex;
  if (hovered) {
    if (value === "X") colorIndex = 4;
    else if (value === "O") colorIndex = 3;
    else if (value === " ") colorIndex = 6;
    else colorIndex = 2;
  } else {
    if (value === "X") colorIndex = 1;
    else if (value === "O") colorIndex = 0;
    else if (value === " ") colorIndex = 6;
    else colorIndex = 5;
  }

  
  return (
    <button
      onClick={onSquareClick}
      id = {value}
      className="square"
      onMouseEnter={onSquareMouseEnter}
      onMouseLeave={onSquareMouseLeave}
      style={{
        backgroundColor: colors[colorIndex],
        color: hovered ? "white" : "black",
      }}
    > 
      {value}
    </button>
  );
}

export default Square;
