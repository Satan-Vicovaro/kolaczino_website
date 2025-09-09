import cron from "node-cron";
import { sharedState } from "./sharedState"


function cronFunction() {
  sharedState.counter = (sharedState.counter + 1) % 2;
  // console.log("cron val: ", sharedState.counter);
}

let stared = false;

export function startCronJob() {
  if (stared) return;

  stared = true;

  cron.schedule("*/1 * * * * *", cronFunction);
}

