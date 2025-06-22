import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  stock: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  categoryId: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  farmerShopId: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  discountedPrice?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercentage?: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isDiscountActive?: boolean;

  @IsDateString()
  @IsOptional()
  discountStart?: string;

  @IsDateString()
  @IsOptional()
  discountEnd?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
