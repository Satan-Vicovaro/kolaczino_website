import fs from "fs";
import path from "path";
import { sharedState } from "@/lib/sharedState";
import { NextResponse } from "next/server";


export async function GET() {

  const data = { id: sharedState.counter, path: '/images-private/api' };
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

