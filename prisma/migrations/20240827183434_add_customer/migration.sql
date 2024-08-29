-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "measure_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_measure" ("created_at", "customer_code", "date", "has_confirmed", "id", "image_url", "type", "updated_at") SELECT "created_at", "customer_code", "date", "has_confirmed", "id", "image_url", "type", "updated_at" FROM "measure";
DROP TABLE "measure";
ALTER TABLE "new_measure" RENAME TO "measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
