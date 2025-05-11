import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


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

    @IsString()
    avatar: string;

    @IsString()
    isVerified: string;

    @IsNotEmpty()
    @IsString()
    isAdmin: string;

    
}
