import cron from "node-cron";
import { sharedState } from "./sharedState"
import { prisma } from "./prisma";
import { removeExpiredCookies, switchActivePhoto } from "./query";


async function cronFunction() {
  try {
    sharedState.counter = 1 + (sharedState.counter) % 4;
    console.log("Cron: ", sharedState.counter);
    await switchActivePhoto(sharedState.counter);
  } catch (error) {
    console.error(error);
  }
}

async function removeCookies() {
  try {
    console.log("Removing expired cookies.");
    await removeExpiredCookies();
  } catch (error) {
    console.error(error);
  }
}

export function getNextPhotoDate() {
  return switchPhotoTask.getNextRun();
}

let stared = false;
let switchPhotoTask = cron.schedule("*/5 * * * *", cronFunction, { noOverlap: true, name: "nextPhoto" });

export function startCronJob() {
  if (stared) return;

  stared = true;

  switchPhotoTask.start();
  cron.schedule("*/1 * * * *", removeCookies, { noOverlap: true, name: "removeCookies" });
}

