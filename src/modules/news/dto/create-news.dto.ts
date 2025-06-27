import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNumber()
  @Type(() => Number) // Ensures it’s transformed to number before validation
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
