import { getNextPhotoDate } from "@/lib/photoTimer";
import { canUserLikePhoto, getActivePhoto, getActivePhotoLikeCount, giveLikeToPhoto } from "@/lib/query";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { imageSizeFromFile } from 'image-size/fromFile'
import path from "path";


async function handleGiveLike(photoId, sessionId) {
  try {
    const result = await canUserLikePhoto(sessionId);

    if (!result.canLike) {
      console.log("Sending: You cannot like a photo");
      return NextResponse.json({ message: result.message }, { status: 403 })
    }

    await giveLikeToPhoto(sessionId, photoId);
    const data = { message: result.message };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}

async function handleGetPhotoUrl() {
  try {
    let properId;

    const activePhoto = await getActivePhoto();
    if (!activePhoto) {
      console.warn("No photo is active, photo id is set to 1");
      properId = 1;
    } else {
      // console.log("Requesting photo:", activePhoto);
    }

    properId = activePhoto.id;


    const filePath = path.join(process.cwd(), "photos-private", `${properId}.jpg`);
    const imageSize = await imageSizeFromFile(filePath);

    // console.log("width ", imageSize.width, " height ", imageSize.height);

    const likeCount = await getActivePhotoLikeCount(properId);
    console.log(`Requesting photo id: ${properId}, likeCount: ${likeCount}`)

    const nextPhotoIn = getNextPhotoDate();

    console.log("photo date:", nextPhotoIn);

    const data = {
      id: properId, path: "/images-private/api",
      likeCount: likeCount, nextPhotoIn: nextPhotoIn,
      imageWidth: imageSize.width, imageHeight: imageSize.height
    };

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal error fetching Gruby's image" }, { status: 500 });
  }
}

export async function GET() {
  return handleGetPhotoUrl();
}

export async function POST(req) {
  const body = await req.json();
  console.log("Getting POST message: ", body);

  const giveLike = body?.giveLike;
  const photoId = body?.photoId;


  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return NextResponse.json({ message: "No cookie session was send" }, { status: 401 });
  }

  if (typeof photoId === "number" && typeof giveLike === "number") {
    const response = handleGiveLike(photoId, sessionId);
    return response;
  }

  return NextResponse.json({
    message: "Data is not present od not valid",
    body: body,
  })
}

