import { BaseEntity } from '../../../database/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('experts')
export class Expert extends BaseEntity {
  @OneToOne(() => User, (user) => user.expertProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  expertise: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  qualification: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  experience_years?: number;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  availability?: boolean;
}
