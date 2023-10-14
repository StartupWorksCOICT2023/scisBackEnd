
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';

@Injectable()

export class SchedulingService{

    constructor( private prisma: PrismaService) {}

    getAllEvents(){
        return "all events, from the Scheduling component ";
    }

    createEvent(){
        return "create an event the Scheduling component ";
    }

    editEvent(){
        return "create an event the Scheduling component ";
    }

    deleteEvent(){
        return "create an event the Scheduling component ";
    }

}