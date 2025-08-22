import * as React from "react";
import { Slider } from "radix-ui";
import { Flex, Text, Button, Box, Container } from "@radix-ui/themes";
import "./OptionSlider.css"

function OptionSlider( {value, setValue, max = 10, min = 0} ) {
  return (
    <>
      <Box style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}>
        <Container size="1">
          <Slider.Root className="SliderRoot" onValueChange={setValue} defaultValue={value} max={max} min={min} step={1} >
            <Slider.Track className="SliderTrack">
              <Slider.Range className="SliderRange" />
            </Slider.Track>
            <Slider.Thumb className="SliderThumb" aria-label="Volume" />
          </Slider.Root>
        </Container>
      </Box>
    </>
  )
}

export default OptionSlider;
