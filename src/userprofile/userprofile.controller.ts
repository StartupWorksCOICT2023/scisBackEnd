import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport'
import { Request } from 'express';
import { scisUser } from '@prisma/client';

@Controller('userprofile')
export class UserprofileController {

    @UseGuards(AuthGuard('jwt'))
    @Get('/id')
    getUserProfile(@Req() req: Request){
        return req.user
    }
}
