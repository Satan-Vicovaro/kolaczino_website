-- CreateTable
CREATE TABLE "SessionData" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "ipAddress" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);
