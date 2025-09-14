
export async function GiveLikeToPhoto(photoId) {
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

export async function GetActivePhoto() {
  try {
    const activePhoto = await prisma.photo.findFirst({
      where: { active: true }
    })
    return activePhoto;
  } catch (error) {
    throw error;
  }
}
