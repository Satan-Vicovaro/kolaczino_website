"use client"
import ErrorCard from "@/components/infoCards/ErrorCard";
import ServerCard from "@/components/infoCards/ServerCard";
import { Box, Button, Card, Container, Flex, Text, Strong } from "@radix-ui/themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CountdownClock from "@/components/CountdownClock";
import HeartButton from "@/components/gruby_page/heartButton";
import NextPhotoButton from "@/components/gruby_page/NextPhotoButton";

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

      setNextPhotoDate(Date.parse(data.nextPhotoIn));
      setPhotoUrl(url.toString());
      setCurPhotoId(data.id);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error("Error parsing the data: ", error);
      setPhotoUrl(null);
      setCurPhotoId(null);
      setLikeCount(null);
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
      const res = await fetch("/api/session");
      const data = await res.json();
      setSessionTime(Date.parse(data.expiryDate));
    } catch (error) {
      console.error(error);
    }
  }

  function handleOnNextPageTimeUp() {
    setIsNextPhotoButtonDisabled(false);
    // setNextPhotoDate(null);
    getCookieExpireTime()
  }


  const [photoUrl, setPhotoUrl] = useState(null);
  const [error, setError] = useState(false);
  const [curPhotoId, setCurPhotoId] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [serverInfo, setServerInfo] = useState(null);
  const [sessionTime, setSessionTime] = useState(null);
  const [nextPhotoDate, setNextPhotoDate] = useState(null);
  const [isNextPhotoButtonDisabled, setIsNextPhotoButtonDisabled] = useState(false);

  return (
    <Container size="4" align="center" content="center" >
      <Box align="center" content="center">
        <Box className="h-max rounded-xl" style={{ backgroundColor: "var(--gray-2)" }}>
          <div>
            <Text as="div" size="9" className="m-10 p-10">Gruby appreciation site</Text>
          </div>
          <Card className="m-10">
            <Text as="div" size="6" className="m-10 p-10">
              Deep dive into wonderfull world of <Strong> unlimited </Strong> Gruby's  photos (well, actually☝️🤓 only one image per day).
              Feel free to leave a like to a Gruby's photo, for every like he gets one more scoop of food! (you don't want to starve him, do you 😿)
            </Text>
          </Card>
          <div className="w-4/5 border border-white rounded-xl">
            <div className="w-3/4 h-150 content-center align-middle">
              {photoUrl && <Image src={photoUrl} alt="Gruby photo" width="400" height="500" />}
            </div>
            <div className="w-4/5 h-20 bg-black rounded-xl shadow-md flex items-center justify-between px-6">
              <NextPhotoButton onClick={
                async () => {
                  await handleOnClickGetImg();
                  await getCookieExpireTime();
                  setIsNextPhotoButtonDisabled(true);
                }
              }
                disabled={isNextPhotoButtonDisabled}
              >
                {nextPhotoDate && <CountdownClock duration={(nextPhotoDate - Date.now())} onTimeUp={() => handleOnNextPageTimeUp()} />}

              </NextPhotoButton>

              <HeartButton onClick={() => handleOnClickGiveLike()} >
                {sessionTime &&
                  <CountdownClock width="50px" height="50px" duration={(sessionTime - Date.now())} />
                }
              </HeartButton>

              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white text-sm">
                {(likeCount !== null) && <div> {likeCount} </div>}
              </div>
            </div>
            {/* {sessionTime && <CountdownClock duration={(sessionTime - Date.now())} />} */}
            {error && <ErrorCard> {error}</ErrorCard>}
            {serverInfo && <ServerCard> {serverInfo} </ServerCard>}
          </div>
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
