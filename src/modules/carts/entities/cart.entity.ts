import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Column } from 'typeorm/decorator/columns/Column';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('carts')
export class Cart extends BaseEntity {

    @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
    @JoinColumn(
        {
            name: 'userId',
        }
    )
    user: User;

    @Column(
        {
            type: 'int',
            nullable: false,
        }
    )
    userId: number;


    @ManyToOne(() => Product, (product) => product.carts, { onDelete: 'CASCADE' })
    @JoinColumn(
        {
            name: 'productId',
        }
    )
    product: Product;

    @Column(
        {
            type: 'int',
            nullable: false,
        }
    )
    productId: number;


    @Column(
        {
            type: 'varchar',
            nullable: false,
        }
    )
    cartCode: string;

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
            nullable: false
        }
    )
    unitPrice: number;

    @Column(
        {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: false
        }
    )
    totalPrice: number;

    @Column(
        {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: true
        }
    )
    discountPrice: number;




}