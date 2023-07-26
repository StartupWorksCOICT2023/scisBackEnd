/*
  Warnings:

  - Added the required column `class` to the `ClassLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combination` to the `ClassLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `ClassLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `ClassLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassLevel" ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "combination" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
