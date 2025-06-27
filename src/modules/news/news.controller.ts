import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/public.decorator';


@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService,
              private readonly cloudinaryService: CloudinaryService) {}



  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async create(@Body() data: CreateNewsDto, @UploadedFile() file: Express.Multer.File) {

    const imageUrl = file ? await this.cloudinaryService.uploadNewsImage(file) : null;  


    const news = await this.newsService.create({...data, imageUrl: imageUrl } as CreateNewsDto);

    return {
      message: 'News created successfully',
      data: {
        id: news.id,
        title: news.title,
        publishedAt: news.publishedAt,
      }
    }
  }

  @IsPublic()
  @Get()
  async findAll() {

    const news = await this.newsService.findAll();
    return {
      message: 'News retrieved successfully',
      data: news.map((item: News) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        newsCategory: item.category ? item.category.title : null,
        publishedAt: item.publishedAt,
        image: item.imageUrl,
      })),
    };
    
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {

    const news = await this.newsService.findOne(+id);
    if (!news) {
      return {
        message: 'News not found',
      };
    }
    return {
      message: 'News retrieved successfully',
      data: {
        id: news.id,
        title: news.title,
        content: news.content,
        newCategory: news.category ? news.category.title : null,
        newsCategory: news.category ? news.category.title : null,
        publishedAt: news.publishedAt,
        image: news.imageUrl,
      },
    };
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    
   await this.newsService.remove(+id);

    return {
      message: 'News deleted successfully',
    };
  }
}
