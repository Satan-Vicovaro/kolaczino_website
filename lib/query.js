'use server'
import { use } from "react";
import { prisma } from "./prisma";

const MAX_LIKES_FROM_ONE_IP_ADDRESS = 5;

export async function giveLikeToPhoto(photoId) {
  try {
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
  } catch (error) {
    throw error;
  }
}

export async function getActivePhoto() {
  try {
    const activePhoto = await prisma.photo.findFirst({
      where: { active: true }
    })
    return activePhoto;
  } catch (error) {
    throw error;
  }
}


export async function addSessionToStorage(sessionId, IpAddress) {
  try {
    await prisma.sessionData.create({
      data: {
        sessionId: sessionId,
        ipAddress: IpAddress,
        expiresAt: new Date(Date.now() + 60 * 1000),
      }
    });
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}

export async function canUserLikePhoto(sessionId) {
  try {
    console.log("Can Like Photo");
    const user = await prisma.sessionData.findFirst({
      where: { sessionId: sessionId }
    })

    console.log("User: ", user);
    if (user === null) {
      console.warn(`No user with id: ${sessionId}`);
      return false;
    }
    const ipAddressUsage = await prisma.sessionData.count({
      where: { ipAddress: user.ipAddress }
    })
    console.log("ip usage: ", ipAddressUsage);

    if (ipAddressUsage >= MAX_LIKES_FROM_ONE_IP_ADDRESS) {
      console.warn(`Too much likes from one ip addr: ${ipAddressUsage}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking if user can like a photo: ", error);
    throw error;
  }
}
