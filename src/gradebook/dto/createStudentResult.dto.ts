import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class createstudentResultDto{

    @IsNotEmpty()
    @IsNumber()
    testmarks : number

    @IsNotEmpty()
    @IsString()
    testId : string

    @IsNotEmpty()
    @IsString()
    studentId : string
}