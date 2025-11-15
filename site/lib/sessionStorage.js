const { addSessionToStorage } = require("./query");



export function createCookie(ipAddress) {
  try {
    const sessionId = crypto.randomUUID();
    addSessionToStorage(sessionId, ipAddress);
  } catch (error) {
    console.log("Could not create cookie: ", error);
    return null;
  }
  return sessionId;
}
