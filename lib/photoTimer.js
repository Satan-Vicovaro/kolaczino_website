import cron from "node-cron";
// import { sharedState } from "./sharedState"
import { getTotalPhotoCount, removeExpiredCookies, resetUserLikes, switchActivePhoto } from "./query";


async function cronFunction() {
  try {
    // some weird thing is happening to this function where the requests are send from user to server
    // it seems like it does not have impact on correct cronFunction but this function
    // is called multiple due to getNextPhotoDate() propably
    if (!Array.isArray(allAvailablePhotoIndexes)) {
      return;
    }
    const range = allAvailablePhotoIndexes.length;
    if (range === 0) {
      //reseting the array
      allAvailablePhotoIndexes = Array.from({ length: totalPhotoCount }, (_, i) => (i + 1));
    }

    const indexToPhoto = Math.floor(Math.random() * range);
    const dbPhotoIndex = allAvailablePhotoIndexes[indexToPhoto];
    allAvailablePhotoIndexes.splice(indexToPhoto, 1);

    console.log("Active photo index: ", dbPhotoIndex);

    await resetUserLikes();
    await switchActivePhoto(dbPhotoIndex);
  } catch (error) {
    console.error(error);
    console.error("type of allAvailablePhotoIndexes: ", typeof (allAvailablePhotoIndexes));
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

// this function is causing problems lol
export function getNextPhotoDate() {
  return switchPhotoTask.getNextRun();
}


let stared = false;
let totalPhotoCount = 0;
let switchPhotoTask = cron.schedule("0 12 * * *", cronFunction, { noOverlap: true, name: "nextPhoto" });
let allAvailablePhotoIndexes = NaN;
export async function startCronJob() {
  if (stared) return;

  stared = true;

  try {
    totalPhotoCount = await getTotalPhotoCount();
    console.log("There are currently: ", totalPhotoCount, " photos in the db");
    allAvailablePhotoIndexes = Array.from({ length: totalPhotoCount }, (_, i) => (i + 1));
    console.log("Available indexes: ", allAvailablePhotoIndexes.toString());

  } catch (error) {
    console.error("Could not get totalPhotoCount\nError: Cron job did not start");
    return;
  }

  switchPhotoTask.start();
  switchPhotoTask.execute();
  cron.schedule("* */5 * * *", removeCookies, { noOverlap: true, name: "removeCookies" });
}

