import { IsString, IsOptional } from 'class-validator';

export class CreateKnowledgeCategoryDto {

    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

}
