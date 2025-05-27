import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmerShopDto } from './create-farmer-shop.dto';

export class UpdateFarmerShopDto extends PartialType(CreateFarmerShopDto) {}
