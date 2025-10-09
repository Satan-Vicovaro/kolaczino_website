import path from "path";
import fs from "fs";
import { getActivePhoto } from "@/lib/query";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedId = searchParams.get("id");

    const photo = await getActivePhoto();
    console.log("Active photo: ", photo)

    if (requestedId != photo.id) {
      console.warn("Different ids:", requestedId, "!==", photo.id);
      return new Response("Unauthorized", { status: 403 });
    }

    const filePath = path.join(process.cwd(), "photos-private", `${requestedId}.jpg`);

    try {
      fs.accessSync(filePath);
    } catch (error) {
      return NextResponse.json({ message: "file not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new Response(fileBuffer, {
      headers: { "Content-Type": "image/jpeg" }
    })

  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 })
  }
}
