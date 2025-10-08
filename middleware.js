"use server"
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'

// regex for ipv4 address
const regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

function getIpAddress(request) {

  const forwardedFor = request.headers.get("x-forwarded-for");
  let ipAddress = forwardedFor?.split(",")[0];

  if (ipAddress.search("::ffff:") !== -1) {
    ipAddress = ipAddress.substring("::ffff:".length);
    console.log("Ipv4 in Ipv6: ", ipAddress);
  }

  if (!regex.test(ipAddress)) {
    console.warn("weird ip addres: ", ipAddress);
  }
  return ipAddress;
}

async function createCookie(request) {

  try {
    let response = NextResponse.next();
    const sessionId = crypto.randomUUID();

    response.cookies.set({
      name: "session",
      value: sessionId,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 15,
    })

    const ipAddress = getIpAddress(request);
    const cookieHeader = `session=${sessionId}`;

    // sending request to update database
    fetch(new URL("/api/session", request.url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-request": process.env.INTERNAL_MESSAGE_ID,
        "Cookie": cookieHeader,
      },
      body: JSON.stringify({
        ipAddress: ipAddress ?? "unknown"
      })
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}



export function middleware(request) {

  // skip middleware for API calls
  if (request.nextUrl.pathname.startsWith("/api/") && request.method === "POST") {
    console.log("Skipping middleware for api POST call");
    return NextResponse.next();
  }

  if (!request.cookies.has("session")) {
    const response = createCookie(request);
    return response;
  }
  return NextResponse.next();
}


