import { Injectable } from '@nestjs/common';
import { CreateKnowledgeCategoryDto } from './dto/create-knowledge_category.dto';
import { UpdateKnowledgeCategoryDto } from './dto/update-knowledge_category.dto';
import { KnowledgeCategory } from './entities/knowledge_category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KnowledgeCategoryService {

  constructor(
    @InjectRepository(KnowledgeCategory)
    private readonly knowledgeCategoryRepository: Repository<KnowledgeCategory>,
  ) {}

  async create(data: CreateKnowledgeCategoryDto) {


    const category = this.knowledgeCategoryRepository.create(data);


    const newCategory =  await this.knowledgeCategoryRepository.save(category);

    return newCategory;
    
  }

  async findAll() {
    
    const categories = await this.knowledgeCategoryRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return categories;
  
  }

  findOne(id: number) {
    return `This action returns a #${id} knowledgeCategory`;
  }


  async update(id: number, data: UpdateKnowledgeCategoryDto) {
    
    const category = await this.knowledgeCategoryRepository.findOneBy({ id });

    if (!category) {
      throw new Error(`Knowledge Category with id ${id} not found`);
    }

    Object.assign(category, data);

    const updatedCategory = await this.knowledgeCategoryRepository.save(category);

    return updatedCategory;

  }

  async remove(id: number) {
    

    const category = await this.knowledgeCategoryRepository.findOneBy({ id });

    if (!category) {
      throw new Error(`Knowledge Category not found`); 
    }

    await this.knowledgeCategoryRepository.remove(category);

    return {
      message: `Knowledge Category deleted successfully`,
    };

  }
}
