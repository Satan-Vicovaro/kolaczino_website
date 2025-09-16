import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export const runtime = "nodejs";

export async function POST(req) {
  console.log("Updating database");
  const { sessionId, ipAddress } = await req.json();
  const session = await prisma.sessionData.upsert({
    where: { sessionId },
    update: { ipAddress, expiresAt: new Date(Date.now() + 60 * 1000) },
    create: { sessionId, ipAddress, expiresAt: new Date(Date.now() + 60 * 1000) },
  });
  return NextResponse.json(session);
}
