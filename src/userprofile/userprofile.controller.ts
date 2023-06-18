import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { scisUser } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUserprofile } from 'src/auth/decorator';
import { PrismaService } from '../prisma/prisma.service';


@UseGuards(JwtGuard)
@Controller('userprofile')
export class UserprofileController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/id')
  async getUserProfile(@GetUserprofile() user: scisUser) {
    try {
      const userProfile = await this.prisma.scisUser.findUnique({
        where: { id: user.id },
        include: { roles: true },
      });

      return userProfile;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to fetch user profile');
    }
  }
}