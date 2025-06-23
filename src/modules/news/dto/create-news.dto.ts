// src/news/dto/create-news.dto.ts

import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  categoryId: number; 

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  image?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
