/*
  Warnings:

  - You are about to drop the column `classDescription` on the `ClassLevel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClassLevel" DROP COLUMN "classDescription",
ADD COLUMN     "stream" TEXT,
ALTER COLUMN "combination" DROP NOT NULL;
