import React, { useState } from "react"
import Board from "./Board"
import GameInfo from "./GameInfo"
import "./TTTGame.css"
import OptionSlider from "./OptionSlider"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Button, Container, Section, Text, Flex, Menubar } from "@radix-ui/themes"
import { Toolbar } from "radix-ui";
import { MinusIcon, PlusIcon, ResetIcon, ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";
import ZoomMenubar from "./ZoomMenubar"

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
    <Box className="whole-content">
      <Section size={"3"}>
        <Container size={"2"}>
          <Box align="center"  style={{background: "var(--gray-a2)",borderRadius: "var(--radius-3)" , display:"block", padding:"10px"}}>
            <Text as="p" size="8"> Welcome to the n-dimensional tik-tac-toe !</Text>
            <Section size="1"/>
            <GameInfo scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB}
                      dimensionNum={dimensionNum} setDimensionNum={setDimensionNum}
                      setBoardSize={setBoardSize} boardSize={boardSize}
            />
            <Section size="1"/>
          </Box>
        </Container>
      </Section>
      <Container size="4" align="center" style={{ border: "1px solid blue" }}>
         <Box align="center"> {/*center aligment */}
          <Flex align="center" style={{
            border: "1px solid yellow",
            display: "block",
            overflow: "hidden",
            width: "1000px",
            height: "1000px",
          }}>
            <TransformWrapper
              minScale={0.5}
              initialScale={1}
              limitToBounds={false}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <Box>
                  <Box style={{
                    background: "var(--gray-a2)",
                    display: "inline-flex",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "var(--radius-3)"
                  }}>
                    <Toolbar.Root>
                      <Toolbar.Button onClick={() => zoomIn()}> <ZoomInIcon /> </Toolbar.Button>
                      <Toolbar.Button onClick={() => zoomOut()}> <ZoomOutIcon /> </Toolbar.Button>
                      <Toolbar.Button onClick={() => resetTransform()}> <ResetIcon /> </Toolbar.Button>
                    </Toolbar.Root>
                  </Box>
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
                </Box>
              )}
            </TransformWrapper>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
export default TTTGame
