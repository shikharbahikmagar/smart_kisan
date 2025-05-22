import { IsString, IsNotEmpty } from "class-validator";

export class EmailVerifyDto {

    @IsNotEmpty()
    @IsString()
    token: string;
}