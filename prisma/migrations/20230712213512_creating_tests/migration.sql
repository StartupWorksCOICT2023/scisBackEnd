/*
  Warnings:

  - A unique constraint covering the columns `[schoolId]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[testId]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schoolId` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_subjectId_fkey";

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "subjectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "schoolId" TEXT NOT NULL,
ADD COLUMN     "testId" TEXT NOT NULL,
ALTER COLUMN "subjectId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "grades" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gradeA" TEXT NOT NULL,
    "gradeBplus" TEXT,
    "gradeB" TEXT NOT NULL,
    "gradeC" TEXT NOT NULL,
    "gradeD" TEXT NOT NULL,
    "gradeE" TEXT,
    "gradeF" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "School_schoolId_key" ON "School"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subjectId_key" ON "Subject"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_testId_key" ON "Test"("testId");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;
