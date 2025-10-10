"use server"
import { prisma } from "@/lib/prisma";
import { getCookieExpireTime } from "@/lib/query";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_EXPIRE_TIME } from "@/lib/constants";

export async function GET(request) {
  console.log("Sending user its cookie expire date");

  const cookieStore = await cookies();

  if (!cookieStore) {
    console.warn("No cookie was sent");
    return NextResponse.json({ message: "No cookie was sent" }, { status: 403 });
  }
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    console.warn("No session cookie was sent");
    return NextResponse.json({ message: "No session cookie was sent" }, { status: 403 });
  }
  try {
    const expiryDate = await getCookieExpireTime(sessionId);
    console.log("Expiry date: ", expiryDate);
    return NextResponse.json({ expiryDate: expiryDate }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error getting cookie expire time" }, { status: 500 });
  }
}

export async function POST(req) {
  const internalRequest = req.headers.get("x-internal-request");
  if (!internalRequest) {
    console.warn("Somebody is sending message to internal request");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (internalRequest !== process.env.INTERNAL_MESSAGE_ID) {
    console.warn("Somebody try to get INTERNAL_MESSAGE_ID: ", req.headers.get("x-forwarded-for"), "->", internalRequest);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  console.log("New user, setting new cookie");

  const cookieStore = await cookies();
  if (!cookieStore.has("session")) {
    console.error("no session cookie was sent!");
    return NextResponse.json({ message: "no session cookie was sent" });
  }

  const { ipAddress } = await req.json();
  const sessionId = cookieStore.get("session").value;

  console.log("id:", sessionId);
  try {
    const session = await prisma.sessionData.upsert({
      where: { sessionId },
      update: { ipAddress, expiresAt: new Date(Date.now() + COOKIE_EXPIRE_TIME) },
      create: { sessionId, ipAddress, expiresAt: new Date(Date.now() + COOKIE_EXPIRE_TIME) },
    });
    return NextResponse.json(session);
  } catch (error) {
    console.error(error);
  }
}
