import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class editSubjectDto{

    @IsNotEmpty()
    @IsString()
    subjectId : string

    @IsOptional()
    @IsString()
    name : string

    // @IsOptional()
    // @IsString()
    // teacherId : string
    
}