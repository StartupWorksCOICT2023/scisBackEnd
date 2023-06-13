import { Body, Controller, Injectable, ForbiddenException, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor (private prisma: PrismaService){}
    
   //creating an endpoint
   @Post('signin')
   async signin(dto: AuthDto) {
    // find the user by email
    const scisuser =
      await this.prisma.scisUser.findUnique({
        where: {
          scisuserid: dto.scisuserid,
        },
      });
    // if user does not exist throw exception
    if (!scisuser)
      throw new ForbiddenException(
        'User not found, Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      scisuser.password,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Password Credentials incorrect',
      );
    return scisuser;
  }
}