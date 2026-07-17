import path from "path";
import fs from "fs";
import sharp from "sharp";
import { getActivePhoto } from "@/lib/query";
import { NextResponse } from "next/server";

const CACHE_DIR = path.join(process.cwd(), "data", "image-cache");
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 75;

// Ensure cache directory exists
try { fs.mkdirSync(CACHE_DIR, { recursive: true }); } catch {}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedId = searchParams.get("id");

    const photo = await getActivePhoto();

    if (requestedId != photo.id) {
      console.warn("Different ids:", requestedId, "!==", photo.id);
      return new Response("Unauthorized", { status: 403 });
    }

    const originalPath = path.join(process.cwd(), "photos-private", `${requestedId}.jpg`);

    try {
      fs.accessSync(originalPath);
    } catch {
      return NextResponse.json({ message: "file not found" }, { status: 404 });
    }

    // Check cache first
    const cachedPath = path.join(CACHE_DIR, `${requestedId}.jpg`);
    const originalStat = fs.statSync(originalPath);

    let useCached = false;
    try {
      const cachedStat = fs.statSync(cachedPath);
      if (cachedStat.mtimeMs >= originalStat.mtimeMs) {
        useCached = true;
      }
    } catch {}

    let fileBuffer;

    if (useCached) {
      fileBuffer = fs.readFileSync(cachedPath);
    } else {
      // Resize and compress with sharp
      const image = sharp(originalPath);
      const metadata = await image.metadata();

      if (metadata.width > MAX_WIDTH) {
        fileBuffer = await image
          .rotate()
          .resize(MAX_WIDTH, null, { withoutEnlargement: true })
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toBuffer();
      } else {
        fileBuffer = await image
          .rotate()
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toBuffer();
      }

      // Write to cache (async, don't block response)
      fs.writeFile(cachedPath, fileBuffer, () => {});
    }

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("Image serving error:", error);
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
