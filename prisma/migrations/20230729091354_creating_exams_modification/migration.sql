/*
  Warnings:

  - You are about to drop the column `name` on the `Test` table. All the data in the column will be lost.
  - Added the required column `ExamClassLevel` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ExamType` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalMarks` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "name",
ADD COLUMN     "ExamClassLevel" TEXT NOT NULL,
ADD COLUMN     "ExamType" TEXT NOT NULL,
ADD COLUMN     "TotalMarks" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_ExamClassLevel_fkey" FOREIGN KEY ("ExamClassLevel") REFERENCES "ClassLevel"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;
