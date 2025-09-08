"use client"
import { Box, Button, Container, Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";

export default function Gruby() {

  async function getImg() {
    setError(null);
    setPhotoUrl(null);

    const res = await fetch("/gruby/api");
    if (!res.ok) {
      console.error("Error fetching data at gruby.api");
      setError(true);
      return;
    }

    const json = res.json();
    setData(json);
  }

  function handleOnClick() {
    getImg();
  }

  const [photoUrl, setPhotoUrl] = useState(null);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);


  return (
    <Container size="4" align="center" content="center" >
      <Box align="center" content="center">
        <Box className="h-screen" style={{ backgroundColor: "var(--gray-3)" }}>
          <Text as="div" size="9">Gruby appreciation site</Text>
          <div className="h-72 border-2"> Place holder</div>
          <Button onClick={() => handleOnClick()}> Click me </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Box>
      </Box>
    </Container>
  )
}

