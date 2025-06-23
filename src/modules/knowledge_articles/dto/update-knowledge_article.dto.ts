import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowledgeArticleDto } from './create-knowledge_article.dto';

export class UpdateKnowledgeArticleDto extends PartialType(CreateKnowledgeArticleDto) {}
