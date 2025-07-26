// src/chat/chat.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { IsPublic } from 'src/common/decorators/public.decorator';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @IsPublic()
  @Get(':room')
  getMessages(@Param('room') room: string) {
    return this.chatService.getMessages(room);
  }
}
