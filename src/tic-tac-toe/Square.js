import React from "react";  
import { useState } from "react";

function Square({value, onSquareClick, cordinates}) {

  function handleClick() {
    console.log("clicked: " + {value});
  }

  return (
    <button
      onClick={onSquareClick}
      className="square"
    > 
      {value}
    </button>
  );
}

export default Square;
