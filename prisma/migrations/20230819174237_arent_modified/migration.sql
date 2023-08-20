/*
  Warnings:

  - You are about to drop the column `name` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Parent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentUserId]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentUserId` to the `Parent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_userId_fkey";

-- DropIndex
DROP INDEX "Parent_userId_key";

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "parentUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Parent_parentUserId_key" ON "Parent"("parentUserId");

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_parentUserId_fkey" FOREIGN KEY ("parentUserId") REFERENCES "scisUser"("scisuserid") ON DELETE RESTRICT ON UPDATE CASCADE;
