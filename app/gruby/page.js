"use client"
import ErrorCard from "@/components/ErrorCard";
import ErrorCardMaxW from "@/components/ErrorCardMaxW";
import InfoCard from "@/components/InfoCard";
import { Box, Button, Card, Container, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";

function Gruby() {

  async function getImg() {
    setError(null);

    const res = await fetch("/gruby/api");
    if (!res.ok) {
      const json = await res.json();
      console.error("Error fetching data at gruby.api");
      setError(json.message);
      return;
    }

    try {
      const data = await res.json();
      const url = new URL(data.path, window.location.origin);
      url.searchParams.set("id", data.id);

      if (photoUrl === url.toString()) {
        setLikeCount(data.likeCount);
        return;
      }

      setPhotoUrl(url.toString());
      setCurPhotoId(data.id);
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
        setError(`${res.statusText}, ${res.status}`);
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
        <Box className="h-max" style={{ backgroundColor: "var(--gray-3)" }}>
          <Text as="div" size="9">Gruby appreciation site</Text>
          <Box className="h-48 border-2"> Place holder</Box>

          <Box className="h-32 w-72 align-middle content-center">
            <Card size={"2"} className="align-middle content-center">
              <Flex gap={"5"} width="auto" height="auto" className="align-middle content-center">
                <Button onClick={() => handleOnClickGetImg()}> Click me </Button>
                <Button onClick={() => handleOnClickGiveLike()}> Give Like !</Button>
                {(likeCount !== null) &&
                  <InfoCard text={likeCount} />
                }
              </Flex>
              {error && <ErrorCard text={error}></ErrorCard>}
            </Card>
          </Box>
          <Box>
            <Card className={photoUrl ? "w-72 h-max" : "w-72 h-80"}>
              {photoUrl && <Image src={photoUrl} alt="Photo lol" width="300" height="300" />}
            </Card>
          </Box>
        </Box>
      </Box>
    </Container >
  )
}



export default function GrubyPage() {
  return (
    <Gruby />
  );
}
