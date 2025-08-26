import { heightPropDefs } from "@radix-ui/themes/dist/cjs/props/height.props";
import React, { Component } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./ZoomTest.css"

const ZoomTest = () => {
  return (
    <div className="app-container">

      <TransformWrapper
        initialScale={1}
        initialPositionX={200}
        initialPositionY={200}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment >
            <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent wrapperClass="zoom-container" >
              <img src="image.jpg" alt="test" />
              <div style={{ width: "400px", height: "600px", backgroundColor: "red" }}>Example text</div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ZoomTest;
