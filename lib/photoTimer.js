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

let stared = false;

export function startCronJob() {
  if (stared) return;

  stared = true;

  cron.schedule("*/5 * * * *", cronFunction);
  cron.schedule("*/1 * * * *", removeCookies);
}

