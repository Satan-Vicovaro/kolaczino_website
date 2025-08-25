import React from "react";  
import { useState } from "react";

function Square({value, onSquareClick, onSquareMouseEnter, onSquareMouseLeave, style}) {

  function handleClick() {
    console.log("clicked: " + {value});
  }

  return (
    <button
      onClick={onSquareClick}
      id = {value}
      className="square"
      onMouseEnter={onSquareMouseEnter}
      onMouseLeave={onSquareMouseLeave}
      style = {style}
    > 
      {value}
    </button>
  );
}

export default Square;
