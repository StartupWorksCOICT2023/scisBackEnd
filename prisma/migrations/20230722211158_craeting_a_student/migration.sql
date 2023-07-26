/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `studentsschoolId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_schoolId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "schoolId",
ADD COLUMN     "studentsschoolId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentsschoolId_fkey" FOREIGN KEY ("studentsschoolId") REFERENCES "School"("schoolId") ON DELETE RESTRICT ON UPDATE CASCADE;
