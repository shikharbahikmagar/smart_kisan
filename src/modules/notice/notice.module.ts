import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { Notice } from './entities/notice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notice]),
    CloudinaryModule, // Assuming CloudinaryService is a provider that needs to be imported
  ],
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [NoticeService],
})
export class NoticeModule {}
