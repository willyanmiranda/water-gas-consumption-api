/*
  Warnings:

  - Added the required column `value` to the `measure` table without a default value. This is not possible if the table is not empty.

*/
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
    "value" INTEGER NOT NULL,
    CONSTRAINT "measure_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_measure" ("customer_code", "date", "has_confirmed", "id", "image_url", "type") SELECT "customer_code", "date", "has_confirmed", "id", "image_url", "type" FROM "measure";
DROP TABLE "measure";
ALTER TABLE "new_measure" RENAME TO "measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
