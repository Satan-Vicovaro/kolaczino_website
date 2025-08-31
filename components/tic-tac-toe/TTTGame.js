import React, { useState, useRef, useEffect } from "react"
import Board from "./Board"
import GameInfo from "./GameInfo"
import "./TTTGame.css"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Button, Container, Section, Text, Flex, Menubar } from "@radix-ui/themes"
import { Toolbar } from "radix-ui";
import { ResetIcon, ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";

function TTTGame() {
  
  function onResetButtonClick() {
    setResetBoard(true);
  }
  
  let [scorePlayerA, setScorePlayerA] = useState(0);
  let [scorePlayerB, setScorePlayerB] = useState(0);
  
  let [dimensionNum, setDimensionNum] = useState([2]);
  let [boardSize, setBoardSize] = useState([3]);
  let [disableMiddleElement, setDisableMiddleElement] = useState(false);
  let [resetBoard, setResetBoard] = useState(false);

  const [size, setSize] = useState({ width: 1000, height: 1000 });
  const movableBoardDivRef = useRef(null);
  const actualBoardDivRef = useRef(null);


  useEffect(() => {
    // resizes component if its dimensions are greater than 1000
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        let newDimensions = {width:0, height:0}
        if (entry.contentRect.width > 1000) {
          newDimensions.width = entry.contentRect.width;
        } else {
          newDimensions.width = 1000;
        }
        
        if (entry.contentRect.height > 1000) {
          newDimensions.height = entry.contentRect.height;
        } else {
          newDimensions.height = 1000;
        }
        setSize(newDimensions);
      }
    });

    if (actualBoardDivRef.current) observer.observe(actualBoardDivRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="whole-content">
      <Section size={"3"}>
        <Container size={"2"}>
          <Box align="center"  style={{background: "var(--gray-a2)", borderRadius: "var(--radius-3)" , display:"block", padding:"10px"}}>
            <Text as="p" size="8"> Welcome to the n-dimensional tik-tac-toe !</Text>
            <Section size="1"/>
            <GameInfo scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB}
                      dimensionNum={dimensionNum} setDimensionNum={setDimensionNum}
                      setBoardSize={setBoardSize} boardSize={boardSize}
                      resetButtonClick={onResetButtonClick}
                      setDisableMiddleElement={setDisableMiddleElement}
                      disableCetralElement={disableMiddleElement}              
            />
            <Section size="1" />
          </Box>
        </Container>
      </Section>
      <Container size="4" align="center"
        style={{}} //border: "1px solid blue" }}
      >
         <Box align="center"> {/*center aligment */}
          <Flex align="center" style={{
            // border: "1px solid yellow",
            display: "block",
            overflow: "hidden",
            width: "1000px",
            height: "1000px",
          }}>
            <TransformWrapper
              minScale={0.2}
              initialScale={1}
              limitToBounds={false}
              initialPositionX={0}
              initialPositionY={0}
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
                    <Toolbar.Root style={{display:"flex", gap:"10px"}}>
                      <Toolbar.Button onClick={() => zoomIn()}> <ZoomInIcon width={32} height={32} /> </Toolbar.Button>
                      <Toolbar.Button onClick={() => zoomOut()}> <ZoomOutIcon width={32} height={32} /> </Toolbar.Button>
                      <Toolbar.Button onClick={() => resetTransform()}> <ResetIcon width={32} height={32}/> </Toolbar.Button>
                    </Toolbar.Root>
                  </Box>
                  <TransformComponent  wrapperClass="board-container"> {/* this class does not support inline css? */}
                    <Box ref={movableBoardDivRef} style={{
                      width:size.width, 
                      height:size.height, 
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      background:"var(--gray-a7)"}}>
                      <Board
                        scorePlayerA={scorePlayerA}
                        scorePlayerB={scorePlayerB}

                        setScorePlayerA={setScorePlayerA}
                        setScorePlayerB={setScorePlayerB}

                        dimensionNum={dimensionNum[0]}
                        boardSize={boardSize}

                        actualBoardDivRef={actualBoardDivRef}

                        disableCenterPoint={disableMiddleElement}
                        resetBoard={resetBoard}
                        setResetBoard={setResetBoard}
                      />
                    </Box>
                  </TransformComponent>
                </Box>
              )}
            </TransformWrapper>
          </Flex>
        </Box>
      </Container>
      <Section size="1"/>
    </Box>
  )
}
export default TTTGame
