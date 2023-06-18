import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport'
import { Request } from 'express';
import { scisUser } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUserprofile } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('userprofile')
export class UserprofileController {

    @Get('/id')
    getUserProfile(@GetUserprofile() user:scisUser){
        return user;
    }
}
