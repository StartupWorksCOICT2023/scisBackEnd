import { Controller, Get, Req, Param, Patch, Delete, Post, UseGuards, Body, ParseIntPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { SchedulingService } from './schedule.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { ChangeEventDto } from './dto/changeEvent.dto';

@UseGuards(JwtGuard)
@Controller('schedule')

export class SchedulingController{

    constructor(
        private SchedulingService: SchedulingService,
    ) {}

    @Get()
    getAllEvents() {
      return this.SchedulingService.getAllEvents();
    }

    @Post()
    createAnEvent(
        @Body() dto: CreateEventDto
    ){
        return this.SchedulingService.createEvent(dto);
    }

    @Patch(':id')
    editAnEvent(
        @Param('id', ParseIntPipe) eventId: number,
        @Body() dto: ChangeEventDto
    ){
        return this.SchedulingService.editEvent(eventId, dto);
    }

    @Delete(':id')
    deleteAnEvent(
        @Param('id', ParseIntPipe) eventId: number
    ){
        return this.SchedulingService.deleteEvent(eventId);
    }


}