/*
  Warnings:

  - You are about to drop the `_SubjectTeacher` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[TeacheruserId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TeacherId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SubjectTeacher" DROP CONSTRAINT "_SubjectTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectTeacher" DROP CONSTRAINT "_SubjectTeacher_B_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "TeacherId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_SubjectTeacher";

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_TeacheruserId_key" ON "Teacher"("TeacheruserId");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "Teacher"("TeacheruserId") ON DELETE RESTRICT ON UPDATE CASCADE;
