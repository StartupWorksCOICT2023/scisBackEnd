-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "schoolId" TEXT;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("schoolId") ON DELETE SET NULL ON UPDATE CASCADE;
