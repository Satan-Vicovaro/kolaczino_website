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
        throw new Error(json.message);
      }

      const data = await res.json();
      // relative path url
      const url = `${data.path}?id=${data.id}`;

      setNextPhotoDate(Date.parse(data.nextPhotoIn));
      setPhotoUrl(url.toString());
      setCurPhotoId(data.id);
      setLikeCount(data.likeCount);
      setImageWidth(data.imageWidth);
      setImageHeight(data.imageHeight);
      setIsGiveLikeButtonDisabled(false);
    } catch (error) {
      setError(error.toString());
      setPhotoUrl(null);
      setCurPhotoId(null);
      setLikeCount(null);
      setIsNextPhotoButtonDisabled(false);
      setIsNextPhotoButtonClicked(false);
      setServerInfo(null);
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
    setIsNextPhotoButtonClicked(false);
    setNextPhotoDate(null);
    getCookieExpireTime();
  }

  async function handleOnLikeButtonTimeUp() {
    await fetch("/");
    await getCookieExpireTime();
    setIsGiveLikeButtonClicked(false);
    setIsGiveLikeButtonDisabled(false);
  }


  const [photoUrl, setPhotoUrl] = useState(null);
  const [error, setError] = useState(false);
  const [curPhotoId, setCurPhotoId] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [serverInfo, setServerInfo] = useState(null);
  const [sessionTime, setSessionTime] = useState(null);
  const [nextPhotoDate, setNextPhotoDate] = useState(null);
  const [isNextPhotoButtonDisabled, setIsNextPhotoButtonDisabled] = useState(false);
  const [isNextPhotoButtonClicked, setIsNextPhotoButtonClicked] = useState(false);
  const [isGiveLikeButtonClicked, setIsGiveLikeButtonClicked] = useState(false);
  const [isGiveLikeButtonDisabled, setIsGiveLikeButtonDisabled] = useState(true);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  return (
    <Container size="4" align="center" content="center" >
      <Box align="center" content="center">
        <Box className="h-max rounded-xl pb-10" style={{ backgroundColor: "black" }}>
          <p className="m-2 pt-6 text-8 md:text-7xl">Gruby appreciation site</p>
          <Card className="m-10">
            <p className="m-1 p-1 text-justify text-m md:text-2xl">
              Deep dive into wonderfull world of <Strong> unlimited </Strong> Gruby's  photos
              (well, actually☝️🤓 only one image per day).
              Feel free to leave a like to a Gruby's photo, for every like he gets one more scoop of food!
            </p>
            <p className="m-1 p-1 text-justify text-m md:text-2xl">
              (you don't want to starve him, do you 😿)
            </p>
          </Card>
          <div className="w-11/12 border bg-black border-white/20 rounded-xl">
            <div className="w-5/6 h-max content-center align-middle mt-5">
              {
                photoUrl && (imageHeight <= imageWidth) &&
                <Image className="w-100 h-auto md:w-175" blurDataURL={photoUrl}
                  placeholder="blur" src={photoUrl} alt="Gruby photo"
                  width={imageWidth} height={imageHeight}
                />
              }
              {
                photoUrl && (imageHeight > imageWidth) &&
                <Image className="h-100 w-auto md:h-175" blurDataURL={photoUrl}
                  placeholder="blur" src={photoUrl} alt="Gruby photo"
                  width={imageWidth} height={imageHeight} />
              }
            </div>
            <div className="w-1/1 p-5 bg-black rounded-xl shadow-md md:w-3/5">
              <div className="flex items-center justify-between px-6 p-5 border-1 rounded-xl border-white/20">
                <NextPhotoButton onClick={
                  async () => {
                    setServerInfo("Requesting image...");
                    setIsNextPhotoButtonDisabled(true);
                    setIsNextPhotoButtonClicked(true);
                    await handleOnClickGetImg();
                    setServerInfo(null);
                  }
                }
                  disabled={isNextPhotoButtonDisabled}
                  clicked={isNextPhotoButtonClicked}
                >
                  {nextPhotoDate && <CountdownClock duration={(nextPhotoDate - Date.now())} onTimeUp={() => handleOnNextPageTimeUp()} />}

                </NextPhotoButton>

                <HeartButton onClick={
                  async () => {
                    setIsGiveLikeButtonClicked(true);
                    setIsGiveLikeButtonDisabled(true);
                    await giveLike();
                    getCookieExpireTime();
                  }
                }
                  clicked={isGiveLikeButtonClicked}
                  disabled={isGiveLikeButtonDisabled}>
                  {sessionTime &&
                    <CountdownClock width="50px" height="50px"
                      textSize="text-m"
                      duration={(sessionTime - Date.now())}
                      onTimeUp={() => handleOnLikeButtonTimeUp()} />
                  }
                </HeartButton>

                <div className="w-14 h-14 border border-white/30 rounded-full flex items-center justify-center text-white text-2xl md:mr-8">
                  {(likeCount !== null) && <div> {likeCount} </div>}
                </div>
              </div>

              {error && <ErrorCard onCloseButtonClick={() => { setError(null) }}> {error}</ErrorCard>}
              {serverInfo && <ServerCard> {serverInfo} </ServerCard>}
            </div>
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
