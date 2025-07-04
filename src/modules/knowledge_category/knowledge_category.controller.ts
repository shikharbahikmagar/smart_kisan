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
  @Post()
  async create(@Body() data: CreateKnowledgeCategoryDto, @UploadedFile() file: Express.Multer.File) {

    if (!file) {

      throw new Error('Image file is required');

    }
      
      const imageUrl = file ? await this.cloudinaryService.uploadKnowledgeCategoryImage(file) : '';
    

      const newCategory = await this.knowledgeCategoryService.create({...data, image: imageUrl});


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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knowledgeCategoryService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id/edit')
  async update(@Param('id') id: string, @Body() data: UpdateKnowledgeCategoryDto, @UploadedFile() file: Express.Multer.File) {

    if (!file) {

      throw new Error('Image file is required');

    }

    const imageUrl = file ? await this.cloudinaryService.uploadKnowledgeCategoryImage(file) : '';

    const updatedCategory =  await this.knowledgeCategoryService.update(+id, {...data, image: imageUrl});
    return {
      message: 'Knowledge Category updated successfully',
      data: {
        id: updatedCategory.id,
        name: updatedCategory.name,
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    
      await this.knowledgeCategoryService.remove(+id);

      return {
        message: 'Knowledge Category deleted successfully',
      }

  }
}
