/*
  Warnings:

  - You are about to drop the column `created_at` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `measure` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customer" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_customer" ("id") SELECT "id" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
CREATE TABLE "new_measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    CONSTRAINT "measure_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_measure" ("customer_code", "date", "has_confirmed", "id", "image_url", "type") SELECT "customer_code", "date", "has_confirmed", "id", "image_url", "type" FROM "measure";
DROP TABLE "measure";
ALTER TABLE "new_measure" RENAME TO "measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
