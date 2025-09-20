'use server'
import { use } from "react";
import { prisma } from "./prisma";

const MAX_LIKES_FROM_ONE_IP_ADDRESS = 5;
const MAX_LIKES_COUNT = 2;

export async function giveLikeToPhoto(sessionId, photoId) {
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

    const user = await prisma.sessionData.findFirst({
      where: { sessionId: sessionId }
    })
    await prisma.sessionData.update({
      where: { sessionId: sessionId },
      data: { photoLikes: user.photoLikes + 1 }
    })
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
      return { canLike: false, message: "Your 🍪 cookie 🍪 got lost in database :c" };
    }

    if (user.expiresAt < new Date()) {
      console.warn(`cookie expired: ${user.expiresAt}`)
      return { canLike: false, message: "Your 🍪 cookie 🍪 expired" };
    }

    if (user.photoLikes >= MAX_LIKES_COUNT) {
      console.warn(`User already liked: ${user.photoLikes}. Max: ${MAX_LIKES_COUNT} `)
      return { canLike: false, message: "You already liked a photo" };
    }

    const ipAddressUsage = await prisma.sessionData.count({
      where: { ipAddress: user.ipAddress }
    })
    console.log("ip usage: ", ipAddressUsage);

    if (ipAddressUsage >= MAX_LIKES_FROM_ONE_IP_ADDRESS) {
      console.warn(`Too much likes from one ip addr: ${ipAddressUsage}`);
      return { canLike: false, message: "Too much likes from this ip address amigo" };
    }

    return { canLike: true, message: "ok" };
  } catch (error) {
    console.error("Error checking if user can like a photo: ", error);
    throw error;
  }
}

export async function getActivePhotoLikeCount(photoId) {
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: Number(photoId) }
    });

    if (!photo.active) {
      throw new Error(`Photo with id ${photoId} is not active`);
    }

    const photoStats = await prisma.PhotoStats.findFirst({
      where: { photoId: photo.id },
      orderBy: { usedAt: "desc" },
    });

    return photoStats.likes;

  } catch (error) {
    throw error;
  }
}

export async function switchActivePhoto(counter) {
  try {
    // remove active photo
    await prisma.photo.updateMany({
      data: { active: false }
    })

    const updatedPhoto = await prisma.photo.update({
      where: { id: counter },
      data: { active: true }
    })

    await prisma.PhotoStats.create({
      data: {
        likes: 0,
        photoId: updatedPhoto.id
      }
    })
  } catch (error) {
    throw error;
  }
}

export async function removeExpiredCookies() {
  try {
    await prisma.sessionData.deleteMany({
      where: {
        expiresAt: {
          lt: new Date,
        }
      }
    })
  } catch (error) {
    throw error;
  }
}
