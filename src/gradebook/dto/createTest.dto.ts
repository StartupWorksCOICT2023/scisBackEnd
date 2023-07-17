import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class createTestDto {
    @IsNotEmpty()
    @IsString()
    testName: string

    @IsNotEmpty()
    @IsString()
    subjectId: string

    @IsNotEmpty()
    @IsString()
    testId: string

} 