import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class editSchoolDto{

    @IsNotEmpty()
    @IsString()
    schoolId : string

    @IsOptional()
    @IsString()
    name : string

    @IsOptional()
    @IsString()
    address : string

    
}