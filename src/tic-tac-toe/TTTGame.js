import React, { useState } from "react"
import Board from "./Board"
import GameInfo from "./GameInfo"
import "./TTTGame.css"
import OptionSlider from "./OptionSlider"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Container, Section, Text } from "@radix-ui/themes"

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
    <div className="whole-content">
      <Section size={"3"}>
        <Container size={"2"} >
          <Box align="center" style={{background: "var(--gray-a2)", height:"200px"}} >
            <Text as="p" size="8"> Welcome to the n-dimensional tick-tac-toe ! </Text>
            <GameInfo scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB} dimensionNum={dimensionNum} boardSize={boardSize}/>
            <OptionSlider value={dimensionNum} setValue={setDimensionNum} max={6} min={2} />
            <OptionSlider value={boardSize} setValue={setBoardSize} max={10} min={3} />
          </Box>
        </Container>
      </Section>
      <Box className="transform-container">
        <Container size="4">
          <Box align="center">
            <Section size="8">
              <div style={{
                overflow: "hidden",
                width: "1000px", 
                height: "700px",
              }}>
                <TransformWrapper
                  minScale={0.5}
                  initialScale={1}
                  limitToBounds={false}
                >
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                      <div className="tools">
                        <button onClick={() => zoomIn()}>+</button>
                        <button onClick={() => zoomOut()}>-</button>
                        <button onClick={() => resetTransform()}>x</button>
                      </div>
                      <TransformComponent wrapperClass="board-container">
                        <Board
                          scorePlayerA={scorePlayerA}
                          scorePlayerB={scorePlayerB}

                          setScorePlayerA={setScorePlayerA}
                          setScorePlayerB={setScorePlayerB}

                          dimensionNum={dimensionNum[0]}
                          boardSize={boardSize}
                        />
                      </TransformComponent>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            </Section>

          </Box>
        </Container>
      </Box>
    </div>
  )
}
export default TTTGame
