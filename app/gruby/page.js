"use client"
import { Box, Button, Container, Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";

function Gruby() {

  async function getImg() {
    setError(null);

    const res = await fetch("/gruby/api");
    if (!res.ok) {
      console.error("Error fetching data at gruby.api");
      setError(true);
      return;
    }
    try {
      const data = await res.json();
      const url = new URL(data.path, window.location.origin);
      url.searchParams.set("id", data.id);

      if (photoUrl === url.toString()) {
        return;
      }

      setPhotoUrl(url.toString());
      setCurPhotoId(data.id);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error("Error parsing the data: ", error);
      setPhotoUrl(null);
      setCurPhotoId(null);
    }
  }

  async function handleOnClickGetImg() {
    await getImg();
  }

  async function giveLike() {
    if (curPhotoId === null) {
      return;
    }
    try {
      setError(null);
      const url = new URL("/gruby/api", window.location.origin);
      url.searchParams.set("giveLike", "1");
      url.searchParams.set("photoId", curPhotoId);

      const res = await fetch(url);

      if (!res.ok) {
        console.error("Error fetching data at giveLike gruby.api");
        setError("ERROR");
        return;
      }

    } catch (error) {
      console.error("error giving a like", error);
      setError(error);
    }
  }

  function handleOnClickGiveLike() {
    giveLike();
  }

  const [photoUrl, setPhotoUrl] = useState(null);
  const [error, setError] = useState(false);
  const [curPhotoId, setCurPhotoId] = useState(null);
  const [likeCount, setLikeCount] = useState(null);

  return (
    <Container size="4" align="center" content="center" >
      <Box align="center" content="center">
        <Box className="h-screen" style={{ backgroundColor: "var(--gray-3)" }}>
          <Text as="div" size="9">Gruby appreciation site</Text>
          <div className="h-72 border-2"> Place holder</div>
          <Button onClick={() => handleOnClickGetImg()}> Click me </Button>

          <Button onClick={() => { handleOnClickGiveLike() }}> Give Like !</Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {likeCount && <p style={{ color: "yellow" }}> {likeCount} </p>}
          {photoUrl && <Image src={photoUrl} alt="Photo lol" width="300" height="300" />}
        </Box>
      </Box>
    </Container>
  )
}



export default function GrubyPage() {
  return (
    <Gruby />
  );
}
