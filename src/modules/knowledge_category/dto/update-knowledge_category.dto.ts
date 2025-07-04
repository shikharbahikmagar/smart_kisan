import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowledgeCategoryDto } from './create-knowledge_category.dto';

export class UpdateKnowledgeCategoryDto extends PartialType(CreateKnowledgeCategoryDto) {}
