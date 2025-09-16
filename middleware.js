import { NextResponse } from 'next/server'

function getIpAddress(request) {

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0];  //||"127.0.0.1";
  return ipAddress;
}

export async function middleware(request) {

  // skip middleware for API calls
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const cookies = request.cookies.get("session");
  // create a cookie if it is absent
  if (!cookies) {
    console.log("Creating new cookie");
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
  return NextResponse.next();
}


