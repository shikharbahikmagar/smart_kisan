import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { News } from '../../news/entities/news.entity'; // Importing the News entity to establish a relationship
import { IsOptional } from 'class-validator';

@Entity('news_categories')
export class NewsCategory extends BaseEntity {

    
    @Column({ type: 'varchar', length: 255 })
    title: string;

    @IsOptional()
    @Column({ type: 'text' })
    image: string;

    
    @OneToMany(() => News, (news) => news.category, { cascade: true })
    news: News[]; // Establishing a one-to-many relationship with News entity
   
}
