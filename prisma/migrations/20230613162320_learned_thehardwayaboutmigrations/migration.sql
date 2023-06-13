/*
  Warnings:

  - You are about to drop the column `email` on the `scisUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scisuserid]` on the table `scisUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scisuserid` to the `scisUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "scisUser_email_key";

-- AlterTable
ALTER TABLE "scisUser" DROP COLUMN "email",
ADD COLUMN     "scisuserid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "scisUser_scisuserid_key" ON "scisUser"("scisuserid");
