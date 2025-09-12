import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


async function handleGiveLike(photoId) {

  const photo = await prisma.photo.findUnique({
    where: { id: Number(photoId) }
  });

  if (!photo) {
    return NextResponse.json(
      { error: "Photo not found" },
      { status: 404 }
    );
  }

  const photoStats = await prisma.PhotoStats.findFirst({
    where: { photoId: photo.id },
    orderBy: { usedAt: "desc" },
  });

  if (!photoStats) {
    return NextResponse.json(
      { error: "PhotoStats not found" },
      { status: 503 }
    );
  }
  console.log(photoStats);

  const curCount = photoStats.likes;
  const changedPhoto = await prisma.PhotoStats.update({
    where: { id: photoStats.id },
    data: { likes: curCount + 1 }
  })

  if (!changedPhoto) {
    return NextResponse.json(
      { error: "ChangedPhoto could not update" },
      { status: 503 }
    );
  }
  console.log(changedPhoto);

  const data = { message: "ok" };
  return new Response(JSON.stringify(data), { status: 200 })
}

async function handleGetPhotoUrl() {
  let properId = { id: 1 };
  try {
    const activePhoto = await prisma.photo.findFirst({
      where: { active: true }
    })
    if (activePhoto) {
      console.log("my photo:", activePhoto);
      properId = activePhoto
    }
    else {
      console.log("no photo is active");
    }
  } catch (error) {
    console.error(error);
  }

  const data = { id: properId.id, path: '/images-private/api' };
  // console.log("Gruby api:", sharedState.counter);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  })
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

export async function POST(req) {
  const body = await req.JSON();
  const returnResponse = null;
  if (body.message === "give photo") {
    returnVal = getPicture();
  }
  return returnResponse;
}

