import { Controller, Injectable, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    //creating an endpoint
    @Post('signin')
    signin() {
       return this.authService.signin()
    }
}