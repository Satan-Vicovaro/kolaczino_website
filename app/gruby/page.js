"use client"
import ErrorCard from "@/components/infoCards/ErrorCard";
import ServerCard from "@/components/infoCards/ServerCard";
import { Box, Card, Container, Strong } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";
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
    if (curPhotoId === null) return;
    try {
      setError(null);
      const res = await fetch("gruby/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giveLike: 1, photoId: curPhotoId }),
      });
      const jsonResponse = await res.json();
      if (!res.ok) {
        console.error("Error fetching data at giveLike gruby.api");
        setError(jsonResponse.message);
        return;
      }
      if (jsonResponse.message === "ok") {
        setServerInfo("Photo liked successfully");
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
    <div className="hero-gradient min-h-[80vh]">
      <Container size="3" className="px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
              style={{ background: "linear-gradient(135deg, var(--orange-9), var(--orange-11))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Gruby
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "var(--gray-10)" }}>
            Dive into the wonderful world of <Strong>daily</Strong> Gruby photos.
            Leave a heart <span>&#10084;&#65039;</span> &mdash; every like earns him an extra scoop of food!
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--gray-8)" }}>
            You don&apos;t want to starve him, do you? 😿
          </p>
        </div>

        {/* Photo Card */}
        <div className="glass-card rounded-2xl overflow-hidden max-w-2xl mx-auto">
          {/* Photo Display */}
          {photoUrl && (
            <div className="flex justify-center p-4 md:p-6" style={{ background: "rgba(0,0,0,0.3)" }}>
              {imageHeight <= imageWidth ? (
                <Image
                  className="rounded-xl w-full h-auto max-w-lg"
                  blurDataURL={photoUrl}
                  placeholder="blur"
                  src={photoUrl}
                  alt="Gruby photo"
                  width={imageWidth}
                  height={imageHeight}
                />
              ) : (
                <Image
                  className="rounded-xl h-auto w-auto max-h-96 md:max-h-[500px]"
                  blurDataURL={photoUrl}
                  placeholder="blur"
                  src={photoUrl}
                  alt="Gruby photo"
                  width={imageWidth}
                  height={imageHeight}
                />
              )}
            </div>
          )}

          {/* Controls */}
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl"
                 style={{ background: "var(--gray-2)", border: "1px solid var(--gray-4)" }}>
              <NextPhotoButton
                onClick={async () => {
                  setServerInfo("Requesting image...");
                  setIsNextPhotoButtonDisabled(true);
                  setIsNextPhotoButtonClicked(true);
                  await handleOnClickGetImg();
                  setServerInfo(null);
                }}
                disabled={isNextPhotoButtonDisabled}
                clicked={isNextPhotoButtonClicked}
              >
                {nextPhotoDate && (
                  <CountdownClock
                    duration={nextPhotoDate - Date.now()}
                    onTimeUp={() => handleOnNextPageTimeUp()}
                  />
                )}
              </NextPhotoButton>

              <HeartButton
                onClick={async () => {
                  setIsGiveLikeButtonClicked(true);
                  setIsGiveLikeButtonDisabled(true);
                  await giveLike();
                  getCookieExpireTime();
                }}
                clicked={isGiveLikeButtonClicked}
                disabled={isGiveLikeButtonDisabled}
              >
                {sessionTime && (
                  <CountdownClock
                    width="50px"
                    height="50px"
                    textSize="text-m"
                    duration={sessionTime - Date.now()}
                    onTimeUp={() => handleOnLikeButtonTimeUp()}
                  />
                )}
              </HeartButton>

              {/* Like Counter */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold"
                   style={{ background: "var(--gray-4)", color: "var(--gray-12)", border: "1px solid var(--gray-6)" }}>
                {likeCount !== null && <span>{likeCount}</span>}
              </div>
            </div>

            {/* Status Messages */}
            <div className="mt-3 flex flex-col gap-2">
              {error && (
                <ErrorCard onCloseButtonClick={() => setError(null)}>
                  {error}
                </ErrorCard>
              )}
              {serverInfo && <ServerCard>{serverInfo}</ServerCard>}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function GrubyPage() {
  return <Gruby />;
}
