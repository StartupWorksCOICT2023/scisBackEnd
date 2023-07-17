import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class createSubjectDto{

    @IsNotEmpty()
    @IsString()
    subjectId : string

    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsString()
    teacherId : string
    
}
