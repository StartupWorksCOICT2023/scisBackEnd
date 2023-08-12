import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserprofileDto{
  @IsNotEmpty()
  @IsString()
  userId : string

  @IsNotEmpty()
  @IsString()
  SchoolId : string

  @IsNotEmpty()
  @IsString()
  roles : string

  @IsNotEmpty()
  @IsString()
  firstName : string

  @IsString()
  @IsOptional()
  lastName  ?: string

  @IsString()
  @IsOptional()
  secondname ?: string

  @IsOptional()
  @IsString()
  dob ?: string  // if a parent dob is not known

  @IsNotEmpty()
  @IsString()
  phone1 : string // for password recovery, must put his password

  @IsString()
  @IsOptional()
  phone2 ?: string

  @IsString()
  @IsOptional()
  gender ?: string

  @IsString()
  @IsOptional()
  religion ?: string

  @IsString()
  @IsOptional()
  occupation ?: string

  @IsString()
  @IsOptional()
  email ?: string

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsOptional()
  isActive?: boolean;
  
}