// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { ChatRole } from 'src/constants/enum/chat-role-enum';

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


async getRooms(userId: number, role: UserRole | ChatRole) {
  const rooms = await this.chatRepo
    .createQueryBuilder('chat')
    .select('DISTINCT chat.room', 'room')
    .where(
      `(chat."senderId" = :userId AND chat."senderRole" = CAST(:senderRole AS chat_messages_senderrole_enum))
       OR 
       (chat."receiverId" = :userId AND chat."receiverRole" = CAST(:receiverRole AS chat_messages_receiverrole_enum))`,
      {
        userId,
        senderRole: role,
        receiverRole: role,
      }
    )
    .getRawMany();


    // console.log(`Fetching rooms for userId: ${userId}, role: ${role}`, rooms);

  return rooms;
}


}
