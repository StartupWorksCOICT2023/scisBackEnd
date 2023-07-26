import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class editstudentDto{

    @IsOptional()
    @IsString()
    schoolId : string

    @IsNotEmpty()
    @IsString()
    oldscisuserId : string

    @IsNotEmpty()
    @IsString()
    newscisuserId : string
    
}