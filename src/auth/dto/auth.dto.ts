import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  scisuserid: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
