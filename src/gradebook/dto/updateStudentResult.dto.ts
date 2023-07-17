import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class updateStudentResultDto{

    @IsNotEmpty()
    @IsNumber()
    currentTestMarks : number

    @IsNotEmpty()
    @IsNumber()
    newTestMarks : number

    @IsNotEmpty()
    @IsString()
    testId : string

    @IsNotEmpty()
    @IsString()
    studentId : string
    
}