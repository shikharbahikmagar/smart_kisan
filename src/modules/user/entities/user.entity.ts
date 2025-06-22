import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { UserRole } from '../../../constants/enum/user-role.enum';
import { FarmerShop } from '../../farmer-shop/entities/farmer-shop.entity';
import { Expert } from '../../expert/entities/expert.entity';
import { Cart } from '../../carts/entities/cart.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  contactNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  email_verified_at?: Date | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email_verification_token?: string | null;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  email_verification_token_expires_at?: Date | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password_reset_token?: string | null;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  password_reset_token_expires_at?: Date | null;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar?: string | null;

  @Column({
    default: false,
  })
  isVerified?: boolean;

  @Column({
    default: false,
  })
  isAdmin?: boolean;

  @OneToMany(() => FarmerShop, (shop) => shop.user)
  farmerShops: FarmerShop[];

  @OneToOne(() => Expert, (expert) => expert.user)
  expertProfile: Expert;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
