import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateEventDto {
  @IsOptional()
  @IsString()
  Description?: string;

  @IsOptional()
  @IsString()
  StartTime?: string;

  @IsString()
  @IsOptional()
  EndTime?: string;

  @IsString()
  @IsOptional()
  Location?: string;

  @IsString()
  @IsOptional()
  RecurrenceRule?: string;

  @IsBoolean() // Updated to IsBoolean to match the Prisma model
  @IsOptional()
  IsAllDay?: boolean;

  @IsString()
  @IsNotEmpty()
  Subject?: string;
}
