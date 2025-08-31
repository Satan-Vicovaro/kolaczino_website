import React from "react";
import { Flex, Text, Button, Box, Container } from "@radix-ui/themes";

function MainContent() {
  return (
    <main className="MainContent">
      <Box style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}>
        <Container size="1">
          <Flex direction="column" gap="2">
            <Text>Hello from Radix Themes :)</Text>
            <Button>Let's go</Button>
          </Flex>
        </Container>
      </Box>
    </main>
  )
}

export default MainContent
