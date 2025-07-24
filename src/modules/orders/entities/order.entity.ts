import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { FarmerShop } from '../../farmer-shop/entities/farmer-shop.entity';
import { OrderStatus } from '../../../constants/enum/order-status-enum';
import { PaymentMethod } from '../../../constants/enum/payment-method-enum';
import { PaymentStatus } from '../../../constants/enum/payment-status-enum';
import { OrderItem } from '../../../modules/order_items/entities/order_item.entity';


@Entity('orders')
export class Order extends BaseEntity {


    @Column(
    {
      type: 'int',
      nullable: false,
    }
    )
  userId: number;

    @Column(
        {
            type: 'varchar',
            length: 255,
            nullable: true
        }
    )
    transactionId: string;


    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    full_name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    s_address: string;


    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    s_city: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    s_province: string;


    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    s_tole: string;

    // @Column({
    //     type: 'int',
    //     nullable: false
    // })
    // qty: number;

     @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    totalPrice: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
        nullable: false
    })
    order_status: OrderStatus;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.CASH_ON_DELIVERY,
        nullable: false
    })
    paymentMethod: PaymentMethod;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
        nullable: false
    })
    paymentStatus: PaymentStatus;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
    items: OrderItem[];


    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId' })
    user: User;

    // @ManyToOne(() => Product, (product) => product.orders, { onDelete: 'CASCADE'})
    // @JoinColumn({ name: 'productId' })
    // product: Product;

    // @ManyToOne(() => FarmerShop, (farmerShop) => farmerShop.orders, { onDelete: 'CASCADE'})
    // @JoinColumn({ name: 'farmerShopId' })
    // farmerShop: FarmerShop;


    // @Column({
    //     type: 'int',
    //     nullable: false
    // })
    // userId: number;

    // @Column({
    //     type: 'int',
    //     nullable: false
    // })
    // farmerShopId: number;


    // @Column({
    //     type: 'int',
    //     nullable: false
    // })
    // productId: number;


   

    



}
