import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsCategoryService } from './news_category.service';
import { CreateNewsCategoryDto } from './dto/create-news_category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news_category.dto';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';

@Controller('news-category')
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService,
              private readonly cloudinaryService: CloudinaryService
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async create(@Body() data: CreateNewsCategoryDto, @UploadedFile() file: Express.Multer.File) {

    const imageUrl = file ? await this.cloudinaryService.uploadNewsCategoryImage(file) : null;

    const newsCategory = await this.newsCategoryService.create({...data, image: imageUrl} as CreateNewsCategoryDto);


    return {
      message: 'News Category created successfully',
      data: {
        id: newsCategory.id,
        title: newsCategory.title,
        image: newsCategory.image,
      }
    };
  }

  @IsPublic()
  @Get()
  async findAll() {

    const newsCategories = await this.newsCategoryService.findAll();


    return {
      message: 'News Categories retrieved successfully',
      data: newsCategories.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
      })),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsCategoryDto: UpdateNewsCategoryDto) {
    return this.newsCategoryService.update(+id, updateNewsCategoryDto);
  }

  @Get('/remove/:id')
  async remove(@Param('id') id: string) {
    await this.newsCategoryService.remove(+id);

    return {
      message: 'News Category deleted successfully',
    };
  }
}
