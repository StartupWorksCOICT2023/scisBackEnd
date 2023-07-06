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
    const { scisuserid, password } = dto;
    // find the user by scisuserid
    const scisuser = await this.prisma.scisUser.findUnique({
      where: {
        scisuserid: scisuserid,
      },
      include: { roles: true },
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


      // call the sign token to get the tokens.
      const tokens = await this.signToken(scisuser.scisuserid, scisuser.id);

      // combine our tokens with our user
      return {
        ...tokens,
       user: scisuser,
  };
  }



 
  // CROSSCHECK THIS  this
  async signToken(
    scisuserid: string,
    id: number,
  ): Promise<{ access_token: string, refresh_token: string }> {
    const payload = {
      sub: scisuserid,
      id,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '10m', //time to expireis 4 minutes
        secret: secret,
      },
    );

    //refresh token

    const refresh = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '7d', //time to expireis 4 minutes
        secret: secret,  //the secret word passed in .env file
      },
    );


    // create a refresh token here 
      // debugging
    console.log(`access token: ${token}`)
    console.log(`refresh token: ${refresh}`)

    return {
      access_token: token,
      refresh_token: refresh
    };
  }

  
  // CROSSCHECK THIS  this
  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
  const secret = this.config.get('JWT_SECRET');

  // Verify the refresh token
  const decoded = await this.jwt.verifyAsync(refreshToken, { secret });

  // Extract the necessary payload information
  const scisuserid = decoded.sub;
  const id = decoded.id;

  const payload = {
    sub: scisuserid,
    id,
  };

  // Generate a new access token
  const token = await this.jwt.signAsync(payload, {
    expiresIn: '10m', // Time to expire is 4 minutes
    secret: secret,
  });



  // debugging
  console.log(token)

  return {
    access_token: token,
  };
}


// logout operations

@Post('logout')     //auth/logout
async logout() {
  // You can perform any necessary operations here to invalidate the user's tokens
  // For example, you can remove the tokens from the database or add them to a blacklist
  // This depends on your specific implementation and requirements

  // Return a response indicating a successful logout
  return {
    message: 'Logout successful',
  };
}


@Post('changepassword')     //auth/logout
async changePassword() {
  // You can perform any necessary operations here to invalidate the user's tokens
  // For example, you can remove the tokens from the database or add them to a blacklist
  // This depends on your specific implementation and requirements

  // Return a response indicating a successful logout
  return {
    message: 'Logout successful',
  };
}


}