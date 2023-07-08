/*
  Warnings:

  - Added the required column `phone1` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "address" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "dob" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "isActive" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "phone1" TEXT NOT NULL,
ADD COLUMN     "phone2" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "secondname" TEXT,
ALTER COLUMN "firstName" SET NOT NULL;

-- CreateTable
CREATE TABLE "_Teachersprofile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Studentsprofile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_parentsprofile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Teachersprofile_AB_unique" ON "_Teachersprofile"("A", "B");

-- CreateIndex
CREATE INDEX "_Teachersprofile_B_index" ON "_Teachersprofile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Studentsprofile_AB_unique" ON "_Studentsprofile"("A", "B");

-- CreateIndex
CREATE INDEX "_Studentsprofile_B_index" ON "_Studentsprofile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_parentsprofile_AB_unique" ON "_parentsprofile"("A", "B");

-- CreateIndex
CREATE INDEX "_parentsprofile_B_index" ON "_parentsprofile"("B");

-- AddForeignKey
ALTER TABLE "_Teachersprofile" ADD CONSTRAINT "_Teachersprofile_A_fkey" FOREIGN KEY ("A") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Teachersprofile" ADD CONSTRAINT "_Teachersprofile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Studentsprofile" ADD CONSTRAINT "_Studentsprofile_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Studentsprofile" ADD CONSTRAINT "_Studentsprofile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_parentsprofile" ADD CONSTRAINT "_parentsprofile_A_fkey" FOREIGN KEY ("A") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_parentsprofile" ADD CONSTRAINT "_parentsprofile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
