import { Module } from '@nestjs/common';
import { UserprofileController } from './userprofile.controller';
import { UserProfileService } from './userprofile.service';

@Module({
  controllers: [UserprofileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
