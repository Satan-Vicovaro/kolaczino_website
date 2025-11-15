import { Container, Section, Text, Strong } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function Footer() {

  return (
    <footer style={{ background: "var(--gray-a2)" }} >
      <Section size="1">
        <Container size="1">
          <p className="text-center text-2xl md:text-4xl" >
            Kolaczino website 2025
          </p>

          <p className="text-center text-xl md:text-4xl" >
            by <Strong> Kolaczino </Strong>
          </p>
          <Link href="https://github.com/Satan-Vicovaro/kolaczino_website"
            className="text-orange-10 text-center"> <p>Github repository </p> </Link>
        </Container>
      </Section>
    </footer>
  )
}

export default Footer
