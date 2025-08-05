import React from "react";
import { Flex, Text, Button } from "@radix-ui/themes";

function MainContent() {
  return (
    <main className="MainContent">
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
      </Flex>
    </main>
  )
}

export default MainContent
