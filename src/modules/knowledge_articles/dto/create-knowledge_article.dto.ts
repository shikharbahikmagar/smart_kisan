import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateKnowledgeArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsNotEmpty()
  categoryId: number;

  // publishedAt is optional and usually set automatically,
  // but if you want to allow custom dates, include this:
  @IsOptional()
  publishedAt?: Date;
}
