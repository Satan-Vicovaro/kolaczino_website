import { Text, Card, Grid, Strong } from "@radix-ui/themes";
import React from "react";
import OptionSlider from "./OptionSlider";
function GameInfo( {scorePlayerA, scorePlayerB, dimensionNum, setDimensionNum, boardSize, setBoardSize} ) {

  return (
  <>
      <Grid columns="2" row="4" gap="4" width="auto" height="auto">
        <OptionSlider value={dimensionNum} setValue={setDimensionNum} max={6} min={2} text="Number of dimensions"/>
        <OptionSlider value={boardSize} setValue={setBoardSize} max={10} min={3} text="Board size"/>
        
        <Card size="2">
          <Text as="div" size="4" align="center"> Player <Strong> X </Strong> score: {scorePlayerA} </Text>
        </Card>
        <Card size="2">
          <Text as="div" size="4" align="center"> Player <Strong> O </Strong> score: {scorePlayerB} </Text>
        </Card>
      </Grid>

    </>
  )
}
export default GameInfo; 
