import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}


  async create(data: CreateNewsDto) {

    const news = this.newsRepository.create(data);


    return await this.newsRepository.save(news);
  }

async findAll() {
    

      const news = await this.newsRepository.find({
        order: { createdAt: 'DESC' },
      });

      return news;

  }

  async findOne(id: number) {
    

    const news = await this.newsRepository.findOne({
      where: { id, isActive: true },
    });

    if (!news) {
      throw new NotFoundException(`News not found`);
    }

    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    
    const news = await this.newsRepository.findOne({ where: { id } });

    if (!news) {
      throw new NotFoundException(`News not found`);
    }

    Object.assign(news, updateNewsDto);

    return await this.newsRepository.save(news);

  }

  async remove(id: number) {

    //delete news compeltely
    await this.newsRepository.delete(id);

    return {
      message: `News with id ${id} deleted successfully`,
    };

  }
}
