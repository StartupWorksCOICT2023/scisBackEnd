-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_TeacherId_fkey";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "TeacherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "Teacher"("TeacheruserId") ON DELETE SET NULL ON UPDATE CASCADE;
