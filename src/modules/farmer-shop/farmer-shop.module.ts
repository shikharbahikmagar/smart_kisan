// src/modules/farmer-shop/farmer-shop.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerShop } from './entities/farmer-shop.entity';
import { FarmerShopService } from './farmer-shop.service';
import { FarmerShopController } from './farmer-shop.controller';
import { User } from '../user/entities/user.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([FarmerShop, User]), CloudinaryModule],
  controllers: [FarmerShopController],
  providers: [FarmerShopService],
  exports: [FarmerShopService],
})
export class FarmerShopModule {}
