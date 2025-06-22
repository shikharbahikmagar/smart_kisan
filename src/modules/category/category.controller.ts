import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IsPublic } from 'src/common/decorators/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('icon'))
  @Post('create')
  async createCategory(
    @Body() data: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Received file:', data);

    const iconUrl = file
      ? await this.cloudinaryService.uploadCategoryIcon(file)
      : '';

    // console.log('Creating category with data:', data, 'and iconUrl:', iconUrl);

    const category = await this.categoryService.createCategory({
      ...data,
      icon: iconUrl,
    });

    return {
      message: 'Category created successfully',
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
      },
    };
  }

  @IsPublic()
  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();

    return {
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    
    if (isNaN(+id)) {
      throw new Error('Invalid category ID');
    }

    await this.categoryService.remove(+id);

    return {
      message: 'Category removed successfully',
    };
  }
}
