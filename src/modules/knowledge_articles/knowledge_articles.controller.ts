import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KnowledgeArticlesService } from './knowledge_articles.service';
import { CreateKnowledgeArticleDto } from './dto/create-knowledge_article.dto';
import { UpdateKnowledgeArticleDto } from './dto/update-knowledge_article.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { KnowledgeArticle } from './entities/knowledge_article.entity';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/public.decorator';


@Controller('knowledge-article')
export class KnowledgeArticlesController {
  constructor(private readonly knowledgeArticlesService: KnowledgeArticlesService,
              private readonly cloudinaryService: CloudinaryService
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async create(@Body() data: CreateKnowledgeArticleDto, @UploadedFile() file: Express.Multer.File) {

    const imageUrl = file ? await this.cloudinaryService.uploadKnowledgeArticleImage(file) : '';

    const knowledgeArticle = await this.knowledgeArticlesService.create({...data, image: imageUrl} as CreateKnowledgeArticleDto);

    return {
      message: 'Knowledge Article created successfully',
      data: {
        id: knowledgeArticle.id,
        title: knowledgeArticle.title,
        publishedAt: knowledgeArticle.publishedAt,
      }
    };
  }

  @IsPublic()
  @Get()
  async findAll() {
    
    const articles = await this.knowledgeArticlesService.findAll();

    return {
      message: 'Knowledge Articles retrieved successfully',
      data: articles.map((item: KnowledgeArticle) => ({
        id: item.id,
        title: item.title,
        publishedAt: item.publishedAt,
        image: item.image,
      })),
    };
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knowledgeArticlesService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() data: UpdateKnowledgeArticleDto, @UploadedFile() file: Express.Multer.File) {

    const imageUrl = file ? await this.cloudinaryService.uploadKnowledgeArticleImage(file) : '';

    const updatedArticle = await this.knowledgeArticlesService.update(+id, {...data, image: imageUrl} as UpdateKnowledgeArticleDto);

    return {
      message: `Knowledge Article with ID ${id} has been updated successfully`,
      data: {
        id: updatedArticle.id,
        title: updatedArticle.title,
        publishedAt: updatedArticle.publishedAt,
      }
    };


  }

  @Get('/remove/:id')
  async remove(@Param('id') id: string) {
    
    await this.knowledgeArticlesService.remove(+id);

    return {
      message: `Knowledge Article with ID ${id} has been deleted successfully`,
    };

  }
}
