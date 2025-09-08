import fs from "fs";
import path from "path";

function getPicture() {

}

export async function GET() {

  const filePath = path.join(process.cwd(), "photos-private", "anime_babka.jpg");
  console.log(filePath);

  if (fs.accessSync(filePath)) {
    return new Response("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg"
    },
  })
}
export async function POST(req) {
  const body = await req.json();
  const returnResponse = null;
  if (body.message === "give photo") {
    returnVal = getPicture();
  }
  return returnResponse;
}

