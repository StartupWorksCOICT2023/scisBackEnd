import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class createTestDto {
    @IsNotEmpty()
    @IsString()
    ExamType: string

    @IsString()
    @IsOptional() // Mark as optional
    ExamClassLevel?: string

    @IsNotEmpty()
    @IsString()
    TotalMarks: string

    @IsNotEmpty()
    @IsString()
    subjectId: string

    @IsNotEmpty()
    @IsString()
    testId: string

    @IsString()
    @IsOptional()
    ExamDate?:        string

    @IsString()
    @IsOptional()
    ExamStartTime?:   string

    @IsString()
    @IsOptional()
    ExamDuration?:    string


    

}
