import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  @IsOptional()
  userId: number;

  @IsInt()
  @IsOptional()
  productId: number;

  @IsString()
  @IsOptional()
  cartCode: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  unitPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  discountPrice?: number;
}
