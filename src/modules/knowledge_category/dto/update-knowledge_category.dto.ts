import { IsString, IsOptional } from 'class-validator';

export class UpdateKnowledgeCategoryDto {

    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

}
