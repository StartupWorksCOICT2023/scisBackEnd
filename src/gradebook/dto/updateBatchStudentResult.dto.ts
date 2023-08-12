import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class updateBatchStudentResultDto{

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