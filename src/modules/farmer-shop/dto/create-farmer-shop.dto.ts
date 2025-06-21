import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateFarmerShopDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value))
  shopName: string;

  @IsNotEmpty()
  @IsString()
  shopAddress: string;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsString()
  @IsEmail()
  shopEmail?: string | null;

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

  @IsNotEmpty()
  @IsString()
  panNumber: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  //for relationship with user
}
