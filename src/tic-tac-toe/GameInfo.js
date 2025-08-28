import React, { useEffect, useState } from "react";
import { Text, Card, Grid, Strong, Button, Switch,Section} from "@radix-ui/themes";
import OptionSlider from "./OptionSlider";
import "./GameInfo.css";
import PopUpDialog from "../components/PopUpDialog";
function GameInfo( {scorePlayerA, scorePlayerB, dimensionNum, setDimensionNum,
                    boardSize, setBoardSize, resetButtonClick,
                    setDisableMiddleElement, disableCetralElement}){
  let elementCount = Math.pow(boardSize, dimensionNum);
  
  function applyButtonClick(){
    elementCount = Math.pow(localBoardSize, localDimensionNum);
    if (elementCount < 2500) {
      setDimensionNum(localDimensionNum);
      setBoardSize(localBoardSize);
      setDisableMiddleElement(localDisableCetralElement && switchEnabled);
    } else {
      setOpen(true)
    }
    if (localBoardSize !== boardSize || localDimensionNum !== dimensionNum || localDisableCetralElement !== disableCetralElement) {
      setDisableMiddleElement(localDisableCetralElement && switchEnabled);
      resetButtonClick();
    }
  }

  function handleDimensionSlider(newValue) {
    setLocalDimensionNum(newValue);
  }

  function handleBoardSizeSlider(newValue) {   
    setLocalBoardSize(newValue);
  }

  function handleCancel() {
      setLocalDimensionNum(dimensionNum);
      setLocalBoardSize(boardSize);
  }
  function handleConfirm() {
      resetButtonClick();
      setDimensionNum(localDimensionNum);
      setBoardSize(localBoardSize);
      setDisableMiddleElement(localDisableCetralElement && switchEnabled);
  }
    
  const [localBoardSize, setLocalBoardSize] = useState(boardSize);
  const [localDimensionNum, setLocalDimensionNum] = useState(dimensionNum);
  const [localDisableCetralElement,setLocalDisableCetralElement] = useState(false);
  const [open, setOpen] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  
  useEffect(() => {
    if (localBoardSize % 2 === 1) {
      setSwitchEnabled(true);
    } else {
      setSwitchEnabled(false);
    }
  }, [localBoardSize]) 
  
  return (
  <>
      <Grid columns="2" row="2" gap="4" width="auto" height="auto">
        <OptionSlider value={localDimensionNum} setValue={handleDimensionSlider} max={6} min={2} text="Number of dimensions"/>
        <OptionSlider value={localBoardSize} setValue={handleBoardSizeSlider} max={10} min={3} text="Board size"/>
        
        <Card size="2">
          <Text as="div" size="4" align="center"> Player <Strong> X </Strong> score: {scorePlayerA} </Text>
        </Card>
        <Card size="2">
          <Text as="div" size="4" align="center"> Player <Strong> O </Strong> score: {scorePlayerB} </Text>
        </Card>
        <Card size="2" style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center"}}>
          <Text as="div" size={"4"} align="center"> Disable main center point</Text>
          <Switch size={2} disabled={!switchEnabled} onCheckedChange={(checked) => {
            if (checked) {
              setLocalDisableCetralElement(true);
            } else {
              setLocalDisableCetralElement(false);
            }
          }}
          />
        </Card>
        <PopUpDialog open={open} setOpen={setOpen}
          
          description={
            <>
              This combination of board size and dimensions will cause to render{" "}
              <strong>{ Math.pow(localBoardSize, localDimensionNum)} </strong> elements.
              Do you really want to do that?
              Due to the power of ⭐JavaScript⭐ your browser / computer might explode or freeze during this process.
            </>
          }

          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      </Grid>
      <Section size="1"> </Section>
        <Grid columns="2" row="2" gap="4" width="auto" height="auto">
          <Button size="4" onClick={resetButtonClick}> Reset </Button>
          <Button size="4" onClick={applyButtonClick}> Apply </Button>
        </Grid>
    </>
  )
}
export default GameInfo; 
