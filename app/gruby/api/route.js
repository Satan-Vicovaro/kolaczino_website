import { prisma } from "@/lib/prisma";
import { getActivePhoto, giveLikeToPhoto } from "@/lib/query";
import { NextResponse } from "next/server";


async function handleGiveLike(photoId) {
  try {
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

  if (giveLike && photoId) {
    return handleGiveLike(photoId);
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

