/*
  Warnings:

  - You are about to drop the `_RoleToscisUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_RoleToscisUser" DROP CONSTRAINT "_RoleToscisUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToscisUser" DROP CONSTRAINT "_RoleToscisUser_B_fkey";

-- AlterTable
ALTER TABLE "scisUser" ADD COLUMN     "roleId" TEXT;

-- DropTable
DROP TABLE "_RoleToscisUser";

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "scisUser" ADD CONSTRAINT "scisUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("name") ON DELETE SET NULL ON UPDATE CASCADE;
