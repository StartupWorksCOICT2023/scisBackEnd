import { Controller, Get, Req, Param, Patch, Delete, Post, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { SchedulingService } from './schedule.service';

@UseGuards(JwtGuard)
@Controller('userprofile')

export class SchedulingController{

    constructor(
        private SchedulingService: SchedulingService,
    ) {}

    @Get()
    getAllEvents() {
      return this.SchedulingService.getAllEvents();
    }

    @Post(':id')
    createAnEvent(){
        return this.SchedulingService.createEvent();
    }

    @Patch(':id')
    editAnEvent(){
        return this.SchedulingService.editEvent();
    }

    @Delete(':id')
    deleteAnEvent(){
        return this.SchedulingService.deleteEvent();
    }


}