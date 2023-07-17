/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_teacherId_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "teacherId";

-- CreateTable
CREATE TABLE "_SubjectTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectTeacher_AB_unique" ON "_SubjectTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectTeacher_B_index" ON "_SubjectTeacher"("B");

-- AddForeignKey
ALTER TABLE "_SubjectTeacher" ADD CONSTRAINT "_SubjectTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectTeacher" ADD CONSTRAINT "_SubjectTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
