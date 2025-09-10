import fs from "fs";
import path from "path";
import { sharedState } from "@/lib/sharedState";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  let variable1 = { id: 1 };
  try {
    const activePhoto = await prisma.photo.findFirst({
      where: { active: true }
    })
    if (activePhoto) {
      console.log("my photo:", activePhoto);
      variable1 = activePhoto
    }
    else {
      console.log("no photo is active");
    }
  } catch (error) {
    console.error(error);
  }

  const data = { id: variable1.id, path: '/images-private/api' };
  // console.log("Gruby api:", sharedState.counter);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export async function POST(req) {
  const body = await req.json();
  const returnResponse = null;
  if (body.message === "give photo") {
    returnVal = getPicture();
  }
  return returnResponse;
}

