import { Entity } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { FarmerShop } from '../../farmer-shop/entities/farmer-shop.entity';
import { User } from '../../user/entities/user.entity';
import { Column, ManyToOne } from 'typeorm';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Column(
    {
      type: 'int',
      nullable: false,
    }
  )
  orderId: number;

  @Column(
    {
      type: 'int',
      nullable: false,
    }
  )
  productId: number;

  @Column(
    {
      type: 'int',
      nullable: false,
    }
  )
  farmerShopId: number;



  @Column(
    {
      type: 'int',
      nullable: false,
    }
  )
  quantity: number;

  @Column(
    {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    }
  )
  price: number;

  @Column(
    {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    }
  )
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

  @ManyToOne(() => FarmerShop, (farmerShop) => farmerShop.orderItems)
  farmerShop: FarmerShop;

}
