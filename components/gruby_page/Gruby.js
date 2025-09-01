import { Box, Container, Text } from "@radix-ui/themes";
import React from "react";

export default function Gruby() {
  return (
    <Container size="4" align="center" content="center" >
      <Box align="center" content="center">
        <Box className="h-screen" style={{ backgroundColor: "var(--gray-3)" }}>
          <Text as="div" size="9">Gruby appreciation site</Text>
        </Box>
      </Box>
    </Container>
  )
}

