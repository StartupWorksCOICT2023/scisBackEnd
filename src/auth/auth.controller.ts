import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { RefreshJwtGuard } from './guard/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('signin')  //            /auth/signin
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh') // /auth/refresh
  async refreshToken(@Body() body: { refresh: string }) {
    return this.authService.refreshToken(body.refresh);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('change-password') // /auth/change-password
  async changePassword(@Request() req, @Body() body: { currentPassword: string, newPassword: string }) {
    const userId = req.user.id; // Assuming you have a user object attached to the request by the authentication guard
    return this.authService.changePassword(userId, body.currentPassword, body.newPassword);
  }

}