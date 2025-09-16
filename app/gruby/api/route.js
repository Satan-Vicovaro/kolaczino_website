import { prisma } from "@/lib/prisma";
import { canUserLikePhoto, getActivePhoto, giveLikeToPhoto } from "@/lib/query";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


async function handleGiveLike(photoId, sessionId) {
  try {
    if (!await canUserLikePhoto(sessionId)) {
      console.log("Sending: You cannot like a photo");
      return NextResponse.json({ message: "You cannot like a photo" }, { status: 403 })
    }
    await giveLikeToPhoto(photoId);
    const data = { message: "ok" };
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error(error);
  }
}

async function handleGetPhotoUrl() {
  try {
    let properId = { id: 1 };

    const activePhoto = await getActivePhoto();
    if (!activePhoto) {
      console.warn("No photo is active, photo id is set to 1");
    } else {
      console.log("Requesting photo:", activePhoto);
    }

    properId = activePhoto;

    const data = { id: properId.id, path: '/images-private/api' };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
    })
  } catch (error) {
    console.error(error);
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const giveLike = searchParams.get("giveLike");
  const photoId = searchParams.get("photoId");

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (giveLike && photoId) {
    return handleGiveLike(photoId, sessionId);
  }

  return handleGetPhotoUrl();
}

// export async function POST(req) {
//   const body = await req.JSON();
//   const returnResponse = null;
//   if (body.message === "give photo") {
//     returnVal = getPicture();
//   }
//   return returnResponse;
// }

