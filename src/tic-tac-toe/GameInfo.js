import { Text, Card, Grid } from "@radix-ui/themes";
import React from "react";

function GameInfo( {scorePlayerA, scorePlayerB, dimensionNum, boardSize} ) {

  return (
  <>
      <Grid columns="2" row="4" gap="4" width="auto">
        <Card size="1">
          <Text as="div" size="2" align="center"> Player "X" score: {scorePlayerA} </Text>
        </Card>

        <Card size="1">
          <Text as="div" size="2" align="center"> Player "O" score: {scorePlayerB} </Text>
        </Card>
        <Card size="1">
          <Text as="div" size="2" align="center"> Number of dimensions: {dimensionNum} </Text>
        </Card>
        <Card size="1">
          <Text as="div" size="2" align="center"> Board size: {boardSize} </Text>
        </Card>
      </Grid>
    </>
  )
}
export default GameInfo; 
