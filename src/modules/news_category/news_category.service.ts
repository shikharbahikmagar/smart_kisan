import { Injectable } from '@nestjs/common';
import { CreateNewsCategoryDto } from './dto/create-news_category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsCategory } from './entities/news_category.entity';

@Injectable()
export class NewsCategoryService {

  constructor(
    @InjectRepository(NewsCategory)
    private readonly newsCategoryRepository: Repository<NewsCategory>,
  ) {}


  async create(data: CreateNewsCategoryDto) {

    const newsCategory = await this.newsCategoryRepository.create(data);


    const savedNewsCategory = await this.newsCategoryRepository.save(newsCategory);

    return savedNewsCategory;
  }

  async findAll() {
    
    const newsCategories = await this.newsCategoryRepository.find({
      order: { createdAt: 'DESC' },
    });

    return newsCategories;
  }

  findOne(id: number) {
    return `This action returns a #${id} newsCategory`;
  }

  update(id: number, updateNewsCategoryDto: UpdateNewsCategoryDto) {
    return `This action updates a #${id} newsCategory`;
  }

  async remove(id: number) {
    const newsCategory = await this.newsCategoryRepository.findOne({ where: { id } });

    if (!newsCategory) {
      throw new Error('News Category not found');
    }

    await this.newsCategoryRepository.remove(newsCategory);

    return {
      message: 'News Category deleted successfully',
      data: {
        id: newsCategory.id,
        title: newsCategory.title,
      },
    };
  }
}
