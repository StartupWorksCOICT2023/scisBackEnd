import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class editTestDto {
    @IsNotEmpty()
    @IsString()
    ExamType: string

    @IsString()
    @IsOptional() // Mark as optional
    ExamClassLevel?: string

    @IsOptional()
    @IsString()
    TotalMarks: string

    @IsOptional()
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