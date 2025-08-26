import React, { Component } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ZoomTest = () => {
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
            <img src="image.jpg" alt="test" />
            <div>Example text</div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};

export default ZoomTest;
