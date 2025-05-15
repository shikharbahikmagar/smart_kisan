import { Optional } from '@nestjs/common';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    contactNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    avatar?: string;

    @IsBoolean()
    @Transform(({value}) => value === 'false' || value === false)
    @Transform(({value}) => value === 'true' || value === true)
    isVerified?: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({value}) => value === 'false' || value === false)
    @Transform(({value}) => value === 'true' || value === true)
    isAdmin: boolean;

    
}
