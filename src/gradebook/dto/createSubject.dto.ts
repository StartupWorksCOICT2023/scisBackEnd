import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class createSubjectDto{

    @IsNotEmpty()
    @IsString()
    name : string

    @IsOptional()
    @IsString()
    TeacherId : string

    @IsNotEmpty()
    @IsString()
    ClassLevelId : string

    
}
