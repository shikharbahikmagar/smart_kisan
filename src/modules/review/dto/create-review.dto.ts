import { IsString, IsNotEmpty, IsInt, IsPositive, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  rating: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  userId?: number;

  @IsNotEmpty()
  productId: number;
}
