/*
  Warnings:

  - A unique constraint covering the columns `[resultEntryId]` on the table `StudentResults` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resultEntryId` to the `StudentResults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentResults" ADD COLUMN     "resultEntryId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentResults_resultEntryId_key" ON "StudentResults"("resultEntryId");
