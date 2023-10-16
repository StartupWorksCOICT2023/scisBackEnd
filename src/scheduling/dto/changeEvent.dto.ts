import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class ChangeEventDto{

  @IsInt()
  @IsNotEmpty()
  Id : number  

  @IsOptional()
  @IsString()
  Description ?: string

  @IsOptional()
  @IsString()
  StartTime ?: string

  @IsString()
  @IsOptional()
  EndTime  ?: string

  @IsString()
  @IsOptional()
  Location ?: string

  @IsString()
  @IsOptional()
  RecurrenceRule ?: string

  @IsBoolean()
  @IsOptional()
  IsAllDay ?: boolean

  @IsString()
  @IsOptional()
  Subject ?: string


}