import { Module } from '@nestjs/common';
import { KnowledgeCategoryService } from './knowledge_category.service';
import { KnowledgeCategoryController } from './knowledge_category.controller';
import { KnowledgeCategory } from './entities/knowledge_category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { KnowledgeArticle } from '../knowledge_articles/entities/knowledge_article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([KnowledgeCategory, KnowledgeArticle]),
    CloudinaryModule,
  ],
  controllers: [KnowledgeCategoryController],
  providers: [KnowledgeCategoryService],
  exports: [KnowledgeCategoryService],
})
export class KnowledgeCategoryModule {}
