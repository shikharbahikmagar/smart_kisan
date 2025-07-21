import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from '../user/entities/user.entity';
import { FarmerShop } from '../farmer-shop/entities/farmer-shop.entity';
import { Product } from '../product/entities/product.entity';
import { Cart } from '../carts/entities/cart.entity';
import { OrderItem } from '../order_items/entities/order_item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, FarmerShop, Product, Cart, OrderItem]),
  ],

  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
