import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
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
    avatar: string;
    
    @Column({ default: false })
    isVerified: boolean;
    
    @Column({ default: false })
    isAdmin: boolean;



}
