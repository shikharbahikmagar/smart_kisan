import { Entity } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Column } from 'typeorm';

@Entity('notices')
export class Notice extends BaseEntity {


    @Column({ type: 'varchar', length: 255 })
    title: string;
    
    @Column({ type: 'text' })
    content: string;
    
    @Column({ type: 'varchar', nullable: true })
    image?: string;
    
    @Column({ type: 'boolean', default: false })
    isActive?: boolean;

}
