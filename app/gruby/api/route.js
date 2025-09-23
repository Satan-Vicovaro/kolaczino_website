import { canUserLikePhoto, getActivePhoto, getActivePhotoLikeCount, giveLikeToPhoto } from "@/lib/query";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


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
    let properId = { id: 1 };

    const activePhoto = await getActivePhoto();
    if (!activePhoto) {
      console.warn("No photo is active, photo id is set to 1");
    } else {
      console.log("Requesting photo:", activePhoto);
    }

    properId = activePhoto;

    const likeCount = await getActivePhotoLikeCount(properId.id);
    console.log("like count", likeCount)

    const data = { id: properId.id, path: '/images-private/api', likeCount: likeCount };

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

