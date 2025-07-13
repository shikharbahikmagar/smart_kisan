import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerShop } from '../farmer-shop/entities/farmer-shop.entity';
import { Category } from '../category/entities/category.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, FarmerShop, Category, Order]), CloudinaryModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
