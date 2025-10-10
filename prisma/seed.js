const { PrismaClient } = require('../prisma/generated/prisma');
const prisma = new PrismaClient();

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
  {
    name: "Gruby 5",
    description: "Gruby description 5",
    pathToImg: "/photos-private/5.jpg"
  },
  {
    name: "Gruby 6",
    description: "Gruby description 6",
    pathToImg: "/photos-private/6.jpg"
  },
  {
    name: "Gruby 7",
    description: "Gruby description 7",
    pathToImg: "/photos-private/7.jpg"
  },
  {
    name: "Gruby 8",
    description: "Gruby description 8",
    pathToImg: "/photos-private/8.jpg"
  },
  {
    name: "Gruby 9",
    description: "Gruby description 9",
    pathToImg: "/photos-private/9.jpg"
  },
  {
    name: "Gruby 10",
    description: "Gruby description 10",
    pathToImg: "/photos-private/10.jpg"
  },
  {
    name: "Gruby 11",
    description: "Gruby description 11",
    pathToImg: "/photos-private/11.jpg"
  },
  {
    name: "Gruby 12",
    description: "Gruby description 12",
    pathToImg: "/photos-private/12.jpg"
  },
  {
    name: "Gruby 13",
    description: "Gruby description 13",
    pathToImg: "/photos-private/13.jpg"
  },
  {
    name: "Gruby 14",
    description: "Gruby description 14",
    pathToImg: "/photos-private/14.jpg"
  },
  {
    name: "Gruby 15",
    description: "Gruby description 15",
    pathToImg: "/photos-private/15.jpg"
  },
  {
    name: "Gruby 16",
    description: "Gruby description 16",
    pathToImg: "/photos-private/16.jpg"
  },
  {
    name: "Gruby 17",
    description: "Gruby description 17",
    pathToImg: "/photos-private/17.jpg"
  },
  {
    name: "Gruby 18",
    description: "Gruby description 18",
    pathToImg: "/photos-private/18.jpg"
  },
  {
    name: "Gruby 19",
    description: "Gruby description 19",
    pathToImg: "/photos-private/19.jpg"
  },
  {
    name: "Gruby 20",
    description: "Gruby description 20",
    pathToImg: "/photos-private/20.jpg"
  },
  {
    name: "Gruby 21",
    description: "Gruby description 21",
    pathToImg: "/photos-private/21.jpg"
  },
  {
    name: "Gruby 22",
    description: "Gruby description 22",
    pathToImg: "/photos-private/22.jpg"
  },
  {
    name: "Gruby 23",
    description: "Gruby description 23",
    pathToImg: "/photos-private/23.jpg"
  },
  {
    name: "Gruby 24",
    description: "Gruby description 24",
    pathToImg: "/photos-private/24.jpg"
  },
  {
    name: "Gruby 25",
    description: "Gruby description 25",
    pathToImg: "/photos-private/25.jpg"
  },
  {
    name: "Gruby 26",
    description: "Gruby description 26",
    pathToImg: "/photos-private/26.jpg"
  },
  {
    name: "Gruby 27",
    description: "Gruby description 27",
    pathToImg: "/photos-private/27.jpg"
  },
  {
    name: "Gruby 28",
    description: "Gruby description 28",
    pathToImg: "/photos-private/28.jpg"
  },
  {
    name: "Gruby 29",
    description: "Gruby description 29",
    pathToImg: "/photos-private/29.jpg"
  },
  {
    name: "Gruby 30",
    description: "Gruby description 30",
    pathToImg: "/photos-private/30.jpg"
  },
  {
    name: "Gruby 31",
    description: "Gruby description 31",
    pathToImg: "/photos-private/31.jpg"
  },
  {
    name: "Gruby 32",
    description: "Gruby description 32",
    pathToImg: "/photos-private/32.jpg"
  },
  {
    name: "Gruby 33",
    description: "Gruby description 33",
    pathToImg: "/photos-private/33.jpg"
  },
  {
    name: "Gruby 34",
    description: "Gruby description 34",
    pathToImg: "/photos-private/34.jpg"
  },
  {
    name: "Gruby 35",
    description: "Gruby description 35",
    pathToImg: "/photos-private/35.jpg"
  },
  {
    name: "Gruby 36",
    description: "Gruby description 36",
    pathToImg: "/photos-private/36.jpg"
  },
  {
    name: "Gruby 37",
    description: "Gruby description 37",
    pathToImg: "/photos-private/37.jpg"
  },
  {
    name: "Gruby 38",
    description: "Gruby description 38",
    pathToImg: "/photos-private/38.jpg"
  },
]

async function main() {
  for (const d of basicData) {
    console.log("inserting: ", d);
    await prisma.photo.create({ data: d });
  }
  console.log("✅ Prisma: database loaded correctly");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
