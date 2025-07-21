import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';
import { OrderItem } from '../../../modules/order_items/entities/order_item.entity';

@Entity('farmer_shops')
export class FarmerShop extends BaseEntity {
  @Column({
    type: 'varchar'
  })
  shopName: string;

  @Column({
    type: 'varchar',
  })
  shopAddress: string;

  @Column({
    type: 'varchar',
  })
  province: string;

  @Column({
    type: 'varchar',
  })
  city: string;

  @Column({
    type: 'varchar',
  })
  street: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  shopEmail?: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  shopDescription?: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  shopImage?: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  citizenshipFrontImage?: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  citizenshipBackImage?: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  panNumber?: string | null;

  @Column({
    default: false,
  })
  isVerified?: boolean = false;

  @Column({
    type: 'varchar',
  })
  contactNumber?: string;

  @OneToOne(() => User, (user) => user.farmerShops, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Product, (product) => product.farmerShop)
  products: Product[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.farmerShop)
  orderItems: OrderItem[];
  
}
