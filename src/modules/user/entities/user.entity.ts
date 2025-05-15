import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';

@Entity()
export class User extends BaseEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    contactNumber: string;

    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;

    @Column({ default: null})
    avatar?: string;
    
    @Column({ default: false })
    isVerified?: boolean;
    
    @Column({ default: false })
    isAdmin?: boolean;



}
