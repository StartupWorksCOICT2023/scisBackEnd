/*
  Warnings:

  - You are about to drop the `_ClassLevelSubjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classLevelId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClassLevelSubjects" DROP CONSTRAINT "_ClassLevelSubjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassLevelSubjects" DROP CONSTRAINT "_ClassLevelSubjects_B_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "classLevelId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ClassLevelSubjects";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classLevelId_fkey" FOREIGN KEY ("classLevelId") REFERENCES "ClassLevel"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;
