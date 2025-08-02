import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

@Entity('reviews')
export class Review extends BaseEntity {


    @Column({
        type: 'text',
        nullable: false,
    })
    content: string;

    @Column({
    type: 'int',
        nullable: false,
    })
    rating: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    userId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    productId: number;

    // Relationships to product
    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product;

    //relationship to user
    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

}
