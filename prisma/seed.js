import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

const basicData = [
  {
    name: "Gruby 1",
    description: "Gruby description 1",
    pathToImg: "/photos-private/1.jpg"
  },
  {
    name: "Gruby 2",
    description: "Gruby description 2",
    pathToImg: "/photos-private/2.jpg"
  },
  {
    name: "Gruby 3",
    description: "Gruby description 3",
    pathToImg: "/photos-private/3.jpg"
  },
  {
    name: "Gruby 4",
    description: "Gruby description 4",
    pathToImg: "/photos-private/4.jpg"
  },
]

export async function main() {
  for (const d of basicData) {
    await prisma.photo.create({ data: d })
  }
  console.log("Prisma: database loaded correctly");
}

main();
