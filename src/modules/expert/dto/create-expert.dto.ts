import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateExpertDto {


    @IsOptional()
    @IsString()
    bio: string;
    
    
    @IsOptional()
    @IsString()
    expertise: string;
    
    @IsOptional()
    @IsString()
    qualification?: string;
    
    @IsOptional()
    experience_years?: number;

   @IsOptional()
    availability?: boolean;

}
