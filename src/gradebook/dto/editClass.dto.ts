import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber, isNotEmpty } from 'class-validator';

export class editclassDto {

    @IsNotEmpty()
    @IsString()
    year: string

    @IsOptional()
    @IsString()
    level: string

    @IsNotEmpty()
    @IsString()
    class: string

    @IsOptional()
    @IsString()
    combination: string

    @IsOptional()
    @IsString()
    stream: string

}