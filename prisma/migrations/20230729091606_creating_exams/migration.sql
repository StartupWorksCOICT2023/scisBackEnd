-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_ExamClassLevel_fkey";

-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "ExamClassLevel" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_ExamClassLevel_fkey" FOREIGN KEY ("ExamClassLevel") REFERENCES "ClassLevel"("classId") ON DELETE SET NULL ON UPDATE CASCADE;
