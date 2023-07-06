import { Controller, Get, Req, Param, Patch, Delete, Post, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserProfileService } from './userprofile.service';
import { CreateUserprofileDto, EditUserprofileDto } from './dto';
import { GetUserprofile } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('userprofile')

export class UserprofileController {
  constructor(
    private UserProfileService: UserProfileService,
  ) { }

  @Get()
  getUserprofiles() {
    return this.UserProfileService.getUserprofiles()
  }

  // there is an issue here
  @Get(':id')
  getUserProfileById(
    @Param('id') scisid: string,
  ) {
    return this.UserProfileService.getUserprofileById(scisid);
  }


  @Post()
  createUserprofiles(
    @Param('id') scisid: string,
    @Body() dto: CreateUserprofileDto
  ) {
    return this.UserProfileService.createUserprofiles(
      scisid,
      dto
    )

  }

  @Patch(':id')
  editUserprofileById(
    @Param('id') scisid: string,
    @Body() dto: EditUserprofileDto
  ) {
    return this.UserProfileService.editUserprofileById(
      scisid,
      dto
    )

  }
  @Delete(':id')
  deleteUserprofileById(
    @Param('id') scisid: string,
  ) {
    return this.UserProfileService.deleteUserprofileById(
      scisid,
    )
  }
}






// import { Controller, Get, Req, Param, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express'; 
// import { scisUser } from '@prisma/client';
// import { JwtGuard } from 'src/auth/guard';
// import { GetUserprofile } from 'src/auth/decorator';
// import { PrismaService } from '../prisma/prisma.service';


// @UseGuards(JwtGuard)
// @Controller('userprofile')
// export class UserprofileController {
//   constructor(private readonly prisma: PrismaService) {}

//   @Get(':id')
//   async getUserProfile(@Param('id') id: string, @GetUserprofile() user: scisUser) {
//     try {
//       const userId = String(id);
//       console.log(userId)

//       const userProfile = await this.prisma.scisUser.findUnique({
//         where: { scisuserid : userId },
//         include: { roles: true },
//       });
//       console.log(userProfile)

//       return userProfile;
//     } catch (error) {
//       // Handle any errors
//       console.log(error)
//       throw new Error('Failed to fetch user profile');
//     }
//   }
// }