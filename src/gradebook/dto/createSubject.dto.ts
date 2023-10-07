import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class createSubjectDto{


    @IsNotEmpty()
    @IsString()
    name : string

    @IsOptional()
    @IsString()
    teacherId : string

    @IsNotEmpty()
    @IsString()
    ClassLevelId : string
    
}
