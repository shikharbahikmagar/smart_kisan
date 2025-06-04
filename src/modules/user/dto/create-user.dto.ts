import { Optional } from '@nestjs/common';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '../enum/user-role.enum';


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

    @IsOptional()
    @IsEnum(UserRole, {
        message: 'Role must be of FARMER, ADMIN, EXPERT or USER'

    })
    role: UserRole;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    avatar?: string | null;

    @IsBoolean()
    @IsOptional()
    @Transform(({value}) => value === 'true' || value === true)
    isVerified?: boolean;

    @IsBoolean()
    @IsOptional()
    @Transform(({value}) => value === 'true' || value === true)
    isAdmin?: boolean;

    
}
