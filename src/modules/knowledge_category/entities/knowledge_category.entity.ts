import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';


@Entity('knowledge_categories')
export class KnowledgeCategory extends BaseEntity {


    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;
    
    @Column({ type: 'text', nullable: true })
    description?: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    imageUrl?: string;

    @OneToMany(() => KnowledgeCategory, (category) => category.articles)
    articles: KnowledgeCategory[];


}
