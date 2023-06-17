// this is just a class taht specifically, just checks 
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

//   this right here is a mind fuck
  async validate(payload: {
    sub: string;
    scisuserid: string;
  }) {
    const user =
      await this.prisma.scisUser.findUnique({
        where: {
            scisuserid: payload.sub,
        },
      });
    delete user.password;
    return user;
}
}