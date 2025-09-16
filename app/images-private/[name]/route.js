import { sharedState } from "@/lib/sharedState";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  let checkId = 1;
  try {
    checkId = activePhoto.id;
  } catch (error) {
    console.log("image route:", error);
  }
  if (id != checkId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const filePath = path.join(process.cwd(), "photos-private", `${id}.jpg`);

  try {
    fs.accessSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    return new Response(fileBuffer, {
      headers: { "Content-Type": "image/jpeg" }
    })
  } catch (error) {
    return new Response("File not found", { status: 404 });
  }
}
