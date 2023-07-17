/*
  Warnings:

  - You are about to drop the column `resultEntryId` on the `StudentResults` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "StudentResults_resultEntryId_key";

-- AlterTable
ALTER TABLE "StudentResults" DROP COLUMN "resultEntryId";
