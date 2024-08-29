/*
  Warnings:

  - The primary key for the `measure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `measure` table. All the data in the column will be lost.
  - Added the required column `measure_datetime` to the `measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_type` to the `measure` table without a default value. This is not possible if the table is not empty.
  - The required column `measure_uuid` was added to the `measure` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_measure" (
    "measure_uuid" TEXT NOT NULL PRIMARY KEY,
    "measure_datetime" DATETIME NOT NULL,
    "measure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    CONSTRAINT "measure_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_measure" ("customer_code", "has_confirmed", "image_url", "value") SELECT "customer_code", "has_confirmed", "image_url", "value" FROM "measure";
DROP TABLE "measure";
ALTER TABLE "new_measure" RENAME TO "measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
