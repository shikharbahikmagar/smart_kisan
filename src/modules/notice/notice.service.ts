import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {

  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async create(data: CreateNoticeDto) {
    
    const notice = this.noticeRepository.create(data);
    
    const newNotice =  await this.noticeRepository.save(notice);

    return newNotice;


  }

  async findAll() {
    
    const notices = await this.noticeRepository.find({
      order: { createdAt: 'DESC' },
    });

    return notices;
  }

  async findOne(id: number) {
    
    const notice = await this.noticeRepository.findOne({
      where: { id },
    });

    if (!notice) {
      throw new NotFoundException(`Notice not found`);
    }

    return notice;
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto) {
    
    const notice = await this.noticeRepository.findOne({ where: { id } });

    console.log(updateNoticeDto)

    if (!notice) {
      throw new NotFoundException(`Notice not found`);
    }

    Object.assign(notice, updateNoticeDto);

    const udpatedNotice =  await this.noticeRepository.save(notice);

    return udpatedNotice;

  }

  async remove(id: number) {
    
    //delete notice completely
    const notice = await this.noticeRepository.findOne({ where: { id } });

    if (!notice) {
      throw new NotFoundException(`Notice not found`);
    }

    await this.noticeRepository.delete(id);

    return {
      message: `Notice deleted successfully`,
    };

  }
}
