import { Entity } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Column } from 'typeorm';

@Entity('knowledge_articles')
export class KnowledgeArticle extends BaseEntity {

    @Column({ type: 'varchar', length: 255 })
    title: string;
    
    @Column({ type: 'text' })
    content: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;
    
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publishedAt?: Date;

}
