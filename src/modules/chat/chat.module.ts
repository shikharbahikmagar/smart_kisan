import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat.entity';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService, ChatGateway], // Exporting ChatService and ChatGateway for use in other modules
})
export class ChatModule {}
