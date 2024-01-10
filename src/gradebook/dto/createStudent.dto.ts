import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class createstudentDto{

    @IsNotEmpty()
    @IsString()
    schoolId : string

    @IsString()
    address : string

}