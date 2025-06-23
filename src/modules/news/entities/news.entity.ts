import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Column } from 'typeorm';
import { NewsCategory } from '../../news_category/entities/news_category.entity';


@Entity('news')
export class News extends BaseEntity {

    @Column({ type: 'varchar', length: 255 })
    title: string;
    
    @Column({ type: 'text' })
    content: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    imageUrl?: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publishedAt: Date;
    
    @Column({ type: 'boolean', default: false })
    isActive: boolean;

    @Column({ type: 'int', nullable: true })
    categoryId?: number; // Assuming a foreign key to a news category entity, adjust as

    @ManyToOne(() => NewsCategory, (category) => category.news, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category: NewsCategory; // Establishing a many-to-one relationship with NewsCategory entity



    

}
