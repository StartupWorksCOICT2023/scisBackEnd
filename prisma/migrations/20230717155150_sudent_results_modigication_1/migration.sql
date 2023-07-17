/*
  Warnings:

  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentUserId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentUserId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudentResults" DROP CONSTRAINT "StudentResults_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentResults" DROP CONSTRAINT "StudentResults_testId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "studentUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentResults" ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ALTER COLUMN "testId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentUserId_key" ON "Student"("studentUserId");

-- AddForeignKey
ALTER TABLE "StudentResults" ADD CONSTRAINT "StudentResults_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentResults" ADD CONSTRAINT "StudentResults_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("testId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "scisUser"("scisuserid") ON DELETE RESTRICT ON UPDATE CASCADE;
