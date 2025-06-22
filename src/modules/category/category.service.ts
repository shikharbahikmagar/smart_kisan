import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    console.log('Creating category with data:', data);

    const newCategory = this.categoryRepository.create(data);

    const category = await this.categoryRepository.save(newCategory);

    return category;
  }

  async getAllCategories() {
    
    // Get all categories from the database
    const categories = await this.categoryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
      },
    });

    return categories;

  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    await this.categoryRepository.remove(category);
    
    return {
      message: `Category deleted successfully`,
    };

  }
}
