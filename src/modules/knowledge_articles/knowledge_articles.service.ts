import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKnowledgeArticleDto } from './dto/create-knowledge_article.dto';
import { UpdateKnowledgeArticleDto } from './dto/update-knowledge_article.dto';
import { KnowledgeArticle } from './entities/knowledge_article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class KnowledgeArticlesService {

  constructor(
    @InjectRepository(KnowledgeArticle)
    private readonly knowledgeArticleRepository: Repository<KnowledgeArticle>,
  ) {}


  async create(data: CreateKnowledgeArticleDto) {
    
    const knowledgeArticle = this.knowledgeArticleRepository.create(data);
   
    const newKnowledgeArticle =  await this.knowledgeArticleRepository.save(knowledgeArticle);

    return newKnowledgeArticle;
  }

  async findAll() {

    const knowledgeArticles = await this.knowledgeArticleRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return knowledgeArticles;
    
  }

  async findOne(id: number) {
    

    const knowledgeArticle = await this.knowledgeArticleRepository.findOne({
      where: { id },
    });

    if (!knowledgeArticle) {
      throw new NotFoundException(`Knowledge Article not found`);
    }

    const recentArticle = await this.knowledgeArticleRepository.find({
      where: { id: Not(id),
  
       }, // Exclude the current article
      order: {
        createdAt: 'DESC',
      },
      take: 3, // Limit to 3 related articles
    });



    return {
      knowledgeArticle,
      recentArticle,
    };
  }

  async update(id: number, data: UpdateKnowledgeArticleDto) {

    // Find the article first
    const knowledgeArticle = await this.knowledgeArticleRepository.findOne({
      where: { id },
    });

    if (!knowledgeArticle) {
      throw new NotFoundException(`Knowledge Article not found`);
    }

   //assign object properties to the article
    Object.assign(knowledgeArticle, data);

    // Save the updated article
    await this.knowledgeArticleRepository.save(knowledgeArticle);
  
    return knowledgeArticle;

  }

  async remove(id: number) {

    const knowledgeArticle = await this.knowledgeArticleRepository.findOne({
      where: { id },
    });

    if (!knowledgeArticle) {
      throw new Error(`Knowledge Article with ID ${id} not found`);
    }

    await this.knowledgeArticleRepository.remove(knowledgeArticle);

    return {
      message: `Knowledge Article with ID ${id} has been deleted successfully`,
    };


  }
}
