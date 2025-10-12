import React from "react";
import { Slider } from "radix-ui";
import { Flex, Text, Box, Container } from "@radix-ui/themes";
import "./OptionSlider.css"

function OptionSlider({ value, setValue, max = 10, min = 0, text = "" }) {

  return (
    <>
      <Flex gap="4">
        <Text as="div" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>{text}</Text>
        <Box style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Container size="1">
            <Slider.Root className="SliderRoot" onValueChange={setValue} value={value} defaultValue={value} max={max} min={min} step={1} >
              <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
              </Slider.Track>
              <Slider.Thumb className="SliderThumb" aria-label="Volume"> {value} </Slider.Thumb>
            </Slider.Root>
          </Container>
        </Box>

      </Flex>
    </>
  )
}

export default OptionSlider;
