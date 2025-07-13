import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { FarmerShop } from '../../farmer-shop/entities/farmer-shop.entity';
import { OrderStatus } from '../../../constants/enum/order-status-enum';
import { PaymentMethod } from '../../../constants/enum/payment-method-enum';
import { PaymentStatus } from '../../../constants/enum/payment-status-enum';


@Entity('orders')
export class Order extends BaseEntity {

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

    @Column({
        type: 'int',
        nullable: false
    })
    qty: number;

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


    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Product, (product) => product.orders, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'productId' })
    product: Product;

    @ManyToOne(() => FarmerShop, (farmerShop) => farmerShop.orders, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'farmerShopId' })
    farmerShop: FarmerShop;


    @Column({
        type: 'int',
        nullable: false
    })
    userId: number;

    @Column({
        type: 'int',
        nullable: false
    })
    farmerShopId: number;


    @Column({
        type: 'int',
        nullable: false
    })
    productId: number;

   

    



}
