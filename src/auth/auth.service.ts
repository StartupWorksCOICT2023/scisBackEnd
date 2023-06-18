import { Body, Controller, Injectable, ForbiddenException, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt/dist";
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor (private prisma: PrismaService,
      private jwt: JwtService,
      private config: ConfigService,
      ){}
    
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
    // const pwMatches = await argon.verify(
    //   scisuser.password,
    //   dto.password,
    // );

    // Current usage is 
    const pwMatches = scisuser.password
    
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Password Credentials incorrect',
      );
      return this.signToken(scisuser.scisuserid, scisuser.id);
  }



 
  // CROSSCHECK THIS  this
  async signToken(
    scisuserid: string,
    id: number,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: scisuserid,
      id,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '120m', //time to expireis 120 minutes
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}