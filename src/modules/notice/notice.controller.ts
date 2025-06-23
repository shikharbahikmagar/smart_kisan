import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notice.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { UseGuards } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notice')
export class NoticeController {



  constructor(private readonly noticeService: NoticeService,
              private readonly cloudinaryService: CloudinaryService
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async create(@Body() data: CreateNoticeDto, @UploadedFile() file: Express.Multer.File) {

    const imageUrl = file ? await this.cloudinaryService.uploadMedia(file, 'notices') : '';

    const notice = await this.noticeService.create({
      ...data,
      image: imageUrl,
    });

    return {
      message: 'Notice created successfully',
      notice: {
        id: notice.id,
        title: notice.title,
        content: notice.content,
        image: notice.image,
        isActive: notice.isActive,
      },
    };

  }

  @IsPublic()
  @Get()
  async findAll() {
    
    const notices = await this.noticeService.findAll();
    return {
      message: 'Notices retrieved successfully',
      notices: notices.map((notice: Notice) => ({
        id: notice.id,
        title: notice.title,
        content: notice.content,
        image: notice.image,
        isActive: notice.isActive,
      })),
    };
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    
    const notice = await this.noticeService.findOne(+id);
    return {
      message: 'Notice retrieved successfully',
      notice: {
        id: notice.id,
        title: notice.title,
        content: notice.content,
        image: notice.image,
        isActive: notice.isActive,
      },
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(+id, updateNoticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(+id);
  }
}
