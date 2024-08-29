/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `customer` table. All the data in the column will be lost.
  - The required column `customer_code` was added to the `customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customer" (
    "customer_code" TEXT NOT NULL PRIMARY KEY
);
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
CREATE TABLE "new_measure" (
    "measure_uuid" TEXT NOT NULL PRIMARY KEY,
    "measure_datetime" DATETIME NOT NULL,
    "measure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    CONSTRAINT "measure_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customer" ("customer_code") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_measure" ("customer_code", "has_confirmed", "image_url", "measure_datetime", "measure_type", "measure_uuid", "value") SELECT "customer_code", "has_confirmed", "image_url", "measure_datetime", "measure_type", "measure_uuid", "value" FROM "measure";
DROP TABLE "measure";
ALTER TABLE "new_measure" RENAME TO "measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
