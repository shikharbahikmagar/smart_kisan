// src/chat/entities/chat-message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ChatRole } from '../../../constants/enum/chat-role-enum';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {

  @Column()
  room: string;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @Column(
    {
      type: 'enum',
      enum: ChatRole,
      }
  )
  senderRole: ChatRole;

  @Column(
    {
      type: 'enum',
      enum: ChatRole,
    }
  )
  receiverRole: ChatRole;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.sentMessages, { eager: true })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages, { eager: true })
  receiver: User;

}
