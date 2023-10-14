import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import {UserProfileModule} from './userprofile/userprofile.module'
import { UserprofileController } from './userprofile/userprofile.controller';
import { UserProfileService } from './userprofile/userprofile.service'
// import { CatsService } from './cats/cats.service';
// import { GardebookService } from './gardebook/gardebook.service';
import { GradebookService } from './gradebook/gradebook.service';
import { GradebookController } from './gradebook/gradebook.controller';
import { SchedulingController } from './scheduling/dto/scheduling.controller';
import { SchedulingService } from './scheduling/dto/schedule.service';

@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    UserProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [UserprofileController,GradebookController, SchedulingController],
  providers: [UserProfileService, GradebookService, SchedulingService],
})
export class AppModule {}
