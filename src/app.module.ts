import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import {UserProfileModule} from './userprofile/userprofile.module'
import { UserprofileController } from './userprofile/userprofile.controller';
import { UserProfileService } from './userprofile/userprofile.service'

@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    UserProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [UserprofileController],
  providers: [UserProfileService],
})
export class AppModule {}
