import { Module } from '@nestjs/common';
import { KnowledgeArticlesService } from './knowledge_articles.service';
import { KnowledgeArticlesController } from './knowledge_articles.controller';
import { KnowledgeArticle } from './entities/knowledge_article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {KnowledgeCategory} from '../knowledge_category/entities/knowledge_category.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KnowledgeArticle, KnowledgeCategory]),
    CloudinaryModule, // Assuming CloudinaryService is a provider that needs to be imported
    
  ],
  controllers: [KnowledgeArticlesController],
  providers: [KnowledgeArticlesService],
  exports: [KnowledgeArticlesService],
})
export class KnowledgeArticlesModule {}
