// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatRepo: Repository<ChatMessage>,
  ) {}

  saveMessage(data: Partial<ChatMessage>) {
    return this.chatRepo.save(this.chatRepo.create(data));
  }

  getMessages(room: string) {
    return this.chatRepo.find({ where: { room }, order: { createdAt: 'ASC' } });
  }
}
