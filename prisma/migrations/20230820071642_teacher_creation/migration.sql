/*
  Warnings:

  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `TeacheruserId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "TeacheruserId" TEXT NOT NULL,
ALTER COLUMN "schoolId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("schoolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_TeacheruserId_fkey" FOREIGN KEY ("TeacheruserId") REFERENCES "scisUser"("scisuserid") ON DELETE RESTRICT ON UPDATE CASCADE;
