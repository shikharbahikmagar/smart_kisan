import { IsString, IsNotEmpty } from 'class-validator';

export class ResetPwdDto {
 
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsString()
    new_password: string;

    @IsNotEmpty()
    @IsString()
    confirm_password: string;

}
