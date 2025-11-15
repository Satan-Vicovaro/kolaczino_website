-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SessionData" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "ipAddress" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "photoLikes" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_SessionData" ("expiresAt", "ipAddress", "sessionId") SELECT "expiresAt", "ipAddress", "sessionId" FROM "SessionData";
DROP TABLE "SessionData";
ALTER TABLE "new_SessionData" RENAME TO "SessionData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
