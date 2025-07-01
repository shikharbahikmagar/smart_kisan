import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateSliderDto {

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsOptional()
    description: string;
    
    @IsString()
    @IsOptional()
    image?: string;
    
    @IsOptional()
    isActive?: boolean;
}
