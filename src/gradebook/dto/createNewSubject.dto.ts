import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class createNewSubject{

    @IsNotEmpty()
    @IsString()
    name : string

    @IsOptional()
    @IsString()
    TeacherId : string

    @IsNotEmpty()
    @IsString()
    classLevelId : string

    
}
