-- CreateTable
CREATE TABLE "certificates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "volunteerId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,
    "template" TEXT,
    "customFields" TEXT,
    CONSTRAINT "certificates_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "volunteers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "certificates_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "certificates_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
