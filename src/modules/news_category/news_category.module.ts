import { Module } from '@nestjs/common';
import { NewsCategoryService } from './news_category.service';
import { NewsCategoryController } from './news_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategory } from './entities/news_category.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([NewsCategory]),
    CloudinaryModule,
  ],
  controllers: [NewsCategoryController],
  providers: [NewsCategoryService],
  exports: [NewsCategoryService],
})
export class NewsCategoryModule {}
