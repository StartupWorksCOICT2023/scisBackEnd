import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class editTestDto {
    @IsOptional()
    @IsString()
    testName: string

    @IsNotEmpty()
    @IsString()
    testId: string

    @IsOptional()
    @IsString()
    subjectId: string
} 