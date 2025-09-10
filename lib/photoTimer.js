import cron from "node-cron";
import { sharedState } from "./sharedState"
import { prisma } from "./prisma";


async function cronFunction() {
  sharedState.counter = 1 + (sharedState.counter) % 4;
  // console.log("Cron: ", sharedState.counter);

  const removeActive = await prisma.photo.updateMany({
    data: { active: false }
  })
  const updatedPhoto = await prisma.photo.update({
    where: { id: sharedState.counter },
    data: { active: true }
  })
}

let stared = false;

export function startCronJob() {
  if (stared) return;

  stared = true;

  cron.schedule("*/1 * * * * *", cronFunction);
}

