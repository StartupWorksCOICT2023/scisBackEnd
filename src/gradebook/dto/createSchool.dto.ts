import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class createSchoolDto{

    @IsNotEmpty()
    @IsString()
    schoolId : string

    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsString()
    address : string

    
}