"use client"
import BackgroundCard from "@/components/infoCards/BackgourndCard";
import ErrorCard from "@/components/infoCards/ErrorCard";
import InfoCard from "@/components/infoCards/InfoCard";
import ServerCard from "@/components/infoCards/ServerCard";
import { Box, Button, Card, Container, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";

function Gruby() {

  async function getImg() {
    setError(null);

    try {
      const res = await fetch("/gruby/api");
      if (!res.ok) {
        const json = await res.json();
        console.error("Error fetching data at gruby.api");
        setError(json.message);
        return;
      }

      const data = await res.json();
      const url = new URL(data.path, window.location.origin);
      url.searchParams.set("id", data.id);

      if (photoUrl === url.toString()) {
        setLikeCount(data.likeCount);
        return;
      }

      setPhotoUrl(url.toString());
      setCurPhotoId(data.id);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error("Error parsing the data: ", error);
      setPhotoUrl(null);
      setCurPhotoId(null);
      likeCount(null);
    }
  }

  async function handleOnClickGetImg() {
    await getImg();
  }

  async function giveLike() {

    setServerInfo(null);

    if (curPhotoId === null) {
      return;
    }
    try {
      setError(null);
      const res = await fetch("/gruby/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ giveLike: 1, photoId: curPhotoId }),
      })
      const jsonResponse = await res.json();

      if (!res.ok) {
        console.error("Error fetching data at giveLike gruby.api");
        setError(jsonResponse.message);
        return;
      }

      if (jsonResponse.message === "ok") {
        setServerInfo("Photo liked succesfully");
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error("error giving a like", error);
      setError(error);
    }
  }

  function handleOnClickGiveLike() {
    giveLike();
  }

  async function getCookieExpireTime() {
    try {
      setServerInfo(null);

    } catch (error) {
      console.error(error);

    }
  }

  const [photoUrl, setPhotoUrl] = useState(null);
  const [error, setError] = useState(false);
  const [curPhotoId, setCurPhotoId] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [serverInfo, setServerInfo] = useState(null);

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
                {(likeCount !== null) && <InfoCard> {likeCount} </InfoCard>}
              </Flex>
              {error && <ErrorCard> {error}</ErrorCard>}
              {serverInfo && <ServerCard> {serverInfo} </ServerCard>}
            </Card>
          </Box>
          <div>
            <BackgroundCard width="70%" height="600px">
              {photoUrl && <Image src={photoUrl} alt="Gruby photo" width="400" height="500" />}
            </BackgroundCard>
          </div>
          <Button onClick={() => handlePost()}></Button>
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
