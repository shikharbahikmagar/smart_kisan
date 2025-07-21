import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Column } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { FarmerShop } from '../../farmer-shop/entities/farmer-shop.entity';
import { Cart } from '../../carts/entities/cart.entity';
import { Order } from '../../orders/entities/order.entity';
import { OrderItem } from '../../../modules/order_items/entities/order_item.entity';


@Entity('products')
export class Product  extends BaseEntity{

    @Column(
        {
            type: 'varchar',
            length: 255,
            nullable: false
        }
    )
    name: string;

    @Column(
        {
            type: 'text',
            nullable: false
        }
    )
    description: string;
    

    @Column(
        {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: false
        }
    )
    price: number;

    @Column(
        {
            type: 'varchar',
            length: 255,
            nullable: true
        }
    )
    image: string;

    @Column(
        {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: false
        }
    )
    stock: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    farmerShopId: number;


    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    discountedPrice: number;

    @Column({ type: 'int', default: 0 })
    discountPercentage: number;

    @Column({ type: 'boolean', default: false })
    isDiscountActive: boolean;

    @Column({ type: 'timestamp', nullable: true })
    discountStart: Date;

    @Column({ type: 'timestamp', nullable: true })
    discountEnd: Date;

    @Column({ type: 'boolean', default: false })
    isFeatured: boolean;

    @Column({ type: 'boolean', default: false })
    isAvailable: boolean;


    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];


    @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
    @JoinColumn(
        {
            name: 'categoryId',
        }
    )
    category: Category;

    @Column({
        type: 'int',
        nullable: false,
    })
    categoryId: number;

    @ManyToOne(() => FarmerShop, (farmerShop) => farmerShop.products, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'farmerShopId',
    })
    farmerShop: FarmerShop;


    @OneToMany(() => Cart, (cart) => cart.product)
    carts: Cart[];

}
