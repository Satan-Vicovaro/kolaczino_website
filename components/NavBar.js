import { Grid, Card, Container } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <nav className="m-5">
      <Container >
        <Card>
          <Grid columns="4" gap="3" rows="repeat(1, 64px)" width="auto">
            <Card style={{ backgroundColor: "var(--gray-3)" }} asChild>
              <Link href={"/gruby"}> Gruby </Link>
            </Card>
            <Card style={{ backgroundColor: "var(--gray-3)" }} asChild>
              <Link href={"/tic-tac-toe"}> Tic-Tac-Toe </Link>
            </Card>
            <Card style={{ backgroundColor: "var(--gray-3)" }} asChild>
              <Link href={"/about-me"}> About me</Link>
            </Card>
            <Card style={{ backgroundColor: "var(--gray-3)" }} asChild>
              <Link href={"/homestuck-mirror"}> Homestuck mirror </Link>
            </Card>
          </Grid>
        </Card>
      </Container>
    </nav >
  )
}
export default NavBar

