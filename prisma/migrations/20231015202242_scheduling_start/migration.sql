-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "recurrenceRule" TEXT,
    "isAllDay" BOOLEAN NOT NULL,
    "subject" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
