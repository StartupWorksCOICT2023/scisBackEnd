
import { Injectable, ParseBoolPipe } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { CreateEventDto } from "./dto/createEvent.dto";
import { ChangeEventDto } from "./dto/changeEvent.dto";
import { error } from "node:console";

@Injectable()

export class SchedulingService {

    constructor(private prisma: PrismaService) { }

    async getAllEvents() {
        const allEvents = await this.prisma.event.findMany({
            select: {
                Id: true,
                IsAllDay: true,
                Description: true,
                StartTime: true,
                EndTime: true,
                Location: true,
                RecurrenceRule: true,
                Subject: true,
            }
        })

        return allEvents;
    }

    async createEvent( dto: CreateEventDto) {
        try {
            console.log(dto);

            //   Check if the event already exists
            const eventExists = await this.prisma.event.findFirst({
                where: {
                    StartTime: dto.StartTime,
                    EndTime: dto.EndTime,
                    Subject: dto.Subject,
                },
            });

            if (eventExists) {
                throw new Error("Event already exists");
            }

            // Create the event
            const createdEvent = await this.prisma.event.create({
                data: {
                    IsAllDay: dto.IsAllDay,
                    Description: dto.Description,
                    StartTime: dto.StartTime,
                    EndTime: dto.EndTime,
                    Location: dto.Location,
                    RecurrenceRule: dto.RecurrenceRule,
                    Subject: dto.Subject,
                },
            });

            if (createdEvent) {
                console.log(`Event created successfully: ${createdEvent}`);
                return `The event was created successfully: ${createdEvent}`;
            } else {
                throw new Error("Failed to create the event");
            }
        } catch (error) {
            console.error(`Error creating event: ${error.message}`);
            throw error;
        }
    }

    async editEvent(eventId: number, dto: ChangeEventDto) {

        try {
            console.log(`Creating event with ID ${eventId}`);
            console.log(dto);

            //   Check if the event already exists
            const eventExists = await this.prisma.event.findFirst({
                where: {
                    Id: eventId,
                },
            });

            if (!eventExists) {
                throw new Error("Event does not exists");
            }

            // Create the event
            const updatedEvent = await this.prisma.event.update({
                where: {
                    Id: eventId,
                },
                data: {
                    IsAllDay: dto.IsAllDay,
                    Description: dto.Description,
                    StartTime: dto.StartTime,
                    EndTime: dto.EndTime,
                    Location: dto.Location,
                    RecurrenceRule: dto.RecurrenceRule,
                    Subject: dto.Subject,
                },
            });

            if (updatedEvent) {
                console.log(`Event edited successfully: ${updatedEvent}`);
                return `The event was edited successfully: ${updatedEvent}`;
            } else {
                throw new Error("Failed to edit the event");
            }
        } catch (error) {
            console.error(`Error editing event: ${error.message}`);
            throw error;
        }

    }

    async deleteEvent(eventId: number) {
        try {
            console.log(`Deleting event with ID ${eventId}`);

            //   Check if the event already exists
            const eventExists = await this.prisma.event.findFirst({
                where: {
                    Id: eventId,
                },
            });

            if (!eventExists) {
                throw new Error("Event doesn't exists");
            }

            const deleteEvent = await this.prisma.event.delete({
                where: {
                    Id: eventId
                }
            })

            if (deleteEvent) {
                return `Successfully deleted event ${deleteEvent} with event id ${eventId}`
            }

        } catch (error) {
            console.error(`Error deleting event: ${error.message}`);
            throw error;
        }
    }

}