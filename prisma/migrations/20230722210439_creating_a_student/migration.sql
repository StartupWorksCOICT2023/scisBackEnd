/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_schoolId_fkey";

-- AlterTable
ALTER TABLE "Parent" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "schoolId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("schoolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "scisUser"("scisuserid") ON DELETE SET NULL ON UPDATE CASCADE;
