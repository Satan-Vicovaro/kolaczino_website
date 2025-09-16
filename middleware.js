import { NextResponse } from 'next/server'

// regex for ipv4 address
const regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

function getIpAddress(request) {

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0];  //||"127.0.0.1";

  if (!regex.test(ipAddress)) {
    console.warn("weird ip addres: ", ipAddress);
  }
  return ipAddress;
}

async function createCookie(request) {

  const response = NextResponse.next();
  const sessionId = crypto.randomUUID();

  response.cookies.set("session", sessionId, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60,
  })

  // sending request to update database
  try {
    const ipAddress = getIpAddress(request);
    fetch(new URL("/api/session", request.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        ipAddress: ipAddress ?? "unknown"
      })
    });
  } catch (error) {
    console.error(error);
  }
  return response;
}

export function middleware(request) {

  // skip middleware for API calls
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const cookies = request.cookies.get("session");
  // create a cookie if it is absent
  if (!cookies) {
    const response = createCookie(request);
    return response;
  }
  return NextResponse.next();
}


