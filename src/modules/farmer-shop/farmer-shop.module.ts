import { Module } from '@nestjs/common';
import { FarmerShopService } from './farmer-shop.service';
import { FarmerShopController } from './farmer-shop.controller';

@Module({
  controllers: [FarmerShopController],
  providers: [FarmerShopService],
})
export class FarmerShopModule {}
