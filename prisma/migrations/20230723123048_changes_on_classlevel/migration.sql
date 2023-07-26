/*
  Warnings:

  - You are about to drop the column `name` on the `ClassLevel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[classId]` on the table `ClassLevel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classDescription` to the `ClassLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `ClassLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassLevel" DROP COLUMN "name",
ADD COLUMN     "classDescription" TEXT NOT NULL,
ADD COLUMN     "classId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ClassLevel_classId_key" ON "ClassLevel"("classId");
