import { Container, Link, Section, Text, Strong } from "@radix-ui/themes";
import React from "react";

function Footer() {

  return (
    <footer style={{ background: "var(--gray-a3)" }} >
      <Section size="1">
        <Container size="1">
          <Text size="5"> Kolaczino website 2025 </Text> <br />
          <Text size="5"> by <Strong> Kolaczino </Strong> </Text> <br />
          <Link size="5" href="https://github.com/Satan-Vicovaro/kolaczino_website"> Github repository </Link>
        </Container>
      </Section>
    </footer>
  ) 
}

export default Footer
