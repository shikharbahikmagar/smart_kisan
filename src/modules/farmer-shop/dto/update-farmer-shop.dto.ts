import { IsOptional, IsString, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateFarmerShopDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  shopName?: string;

  @IsOptional()
  @IsString()
  shopAddress?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsEmail()
  shopEmail?: string | null;

  @IsOptional()
  @IsString()
  shopDescription?: string | null;

  @IsOptional()
  @IsString()
  shopImage?: string | null;

  @IsOptional()
  @IsString()
  citizenshipFrontImage?: string;

  @IsOptional()
  @IsString()
  citizenshipBackImage?: string;

  @IsOptional()
  @IsString()
  panNumber?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;
}
