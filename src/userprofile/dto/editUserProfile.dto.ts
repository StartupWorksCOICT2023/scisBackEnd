import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class EditUserprofileDto{
  // most things are optional here
  @IsString()
  @IsOptional()
  firstName ?: string

  @IsString()
  @IsOptional()
  lastName  ?: string

  //   but i do not think that this shlould be optional
  @IsNotEmpty()
  @IsString()
  userId    : string

}