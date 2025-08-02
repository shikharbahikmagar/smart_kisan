import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KnowledgeCategoryService } from './knowledge_category.service';
import { CreateKnowledgeCategoryDto } from './dto/create-knowledge_category.dto';
import { UpdateKnowledgeCategoryDto } from './dto/update-knowledge_category.dto';
import { KnowledgeCategory } from './entities/knowledge_category.entity';
import { UseGuards } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/common/decorators/user.decorator';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';


@Controller('knowledge-category')
export class KnowledgeCategoryController {
  constructor(private readonly knowledgeCategoryService: KnowledgeCategoryService
    , private readonly cloudinaryService: CloudinaryService
  ) {}


  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async create(@Body() data: CreateKnowledgeCategoryDto, @UploadedFile() file: Express.Multer.File) {

    if (!file) {

      throw new Error('Image file is required');

    }
      
      const imageUrl = file ? await this.cloudinaryService.uploadKnowledgeCategoryImage(file) : '';
    

      const newCategory = await this.knowledgeCategoryService.create({...data, imageUrl: imageUrl});


      return {
        message: 'Knowledge Category created successfully',
        data: {
          id: newCategory.id,
          name: newCategory.name,
        }
      }

  }

  @IsPublic()
  @Get()
  async findAll() {
    
      const categories = await this.knowledgeCategoryService.findAll();

      return{
        message: 'Knowledge Categories fetched successfully',
        data: categories.map((category: KnowledgeCategory) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          image: category.imageUrl,
        }))
      }

  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {

    // console.log(`Fetching knowledge category with ID: ${id}`);

    const category = await this.knowledgeCategoryService.getCategoryDetail(+id);
    if (!category) {
      throw new Error('Knowledge Category not found');
    }

    return {
      message: 'Knowledge Category fetched successfully',
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.imageUrl,
      }
    }
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post(':id/edit')
  async update(@Param('id') id: string, @Body() data: UpdateKnowledgeCategoryDto, @UploadedFile() file: Express.Multer.File) {

    let imageUrl = '';
    if (file) {
      imageUrl = await this.cloudinaryService.uploadKnowledgeCategoryImage(file);

      data.imageUrl = imageUrl;
    }

    const updatedCategory =  await this.knowledgeCategoryService.update(+id, {...data});
    return {
      message: 'Knowledge Category updated successfully',
      data: {
        id: updatedCategory.id,
        name: updatedCategory.name,
      }
    }
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id/remove')
  async remove(@Param('id') id: string) {
    
      await this.knowledgeCategoryService.remove(+id);

      return {
        message: 'Knowledge Category deleted successfully',
      }

  }
}
