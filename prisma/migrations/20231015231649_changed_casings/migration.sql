/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isAllDay` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `recurrenceRule` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Event` table. All the data in the column will be lost.
  - Added the required column `Description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EndTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IsAllDay` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Location` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Subject` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "description",
DROP COLUMN "endTime",
DROP COLUMN "id",
DROP COLUMN "isAllDay",
DROP COLUMN "location",
DROP COLUMN "recurrenceRule",
DROP COLUMN "startTime",
DROP COLUMN "subject",
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "EndTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD COLUMN     "IsAllDay" BOOLEAN NOT NULL,
ADD COLUMN     "Location" TEXT NOT NULL,
ADD COLUMN     "RecurrenceRule" TEXT,
ADD COLUMN     "StartTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Subject" TEXT NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("Id");
