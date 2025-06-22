import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Column } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  icon?: string | null;


  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
