import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserprofileDto{
  @IsString()
  firstName ?: string

  @IsString()
  lastName  ?: string

  @IsNotEmpty()
  @IsString()
  userId    : string

}