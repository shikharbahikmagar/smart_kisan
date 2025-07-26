import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatRole } from 'src/constants/enum/chat-role-enum';
import { ChatMessage } from './entities/chat.entity';

interface MessagePayload {
  room: string;
  message: string;
  senderId: number;
  senderRole: ChatRole;
  receiverId: number;
  receiverRole: ChatRole;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  afterInit() {
    console.log('Chat gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: { farmerId: number; expertId: number }) {
    const room = `room_farmer${data.farmerId}_expert${data.expertId}`;
    client.join(room);
    client.emit('joinedRoom', { room });
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: MessagePayload) {
    // Sanitize roles using ChatRole enum
    const senderRole: ChatRole = payload.senderRole === ChatRole.FARMER ? ChatRole.FARMER : ChatRole.EXPERT;
    const receiverRole: ChatRole = payload.receiverRole === ChatRole.FARMER ? ChatRole.FARMER : ChatRole.EXPERT;

    // console.log("Received message:", payload);

    const chatMessagePayload: Partial<ChatMessage> = {
      room: payload.room,
      message: payload.message,
      senderId: payload.senderId,
      senderRole,
      receiverId: payload.receiverId,
      receiverRole,
    };

    await this.chatService.saveMessage(chatMessagePayload);

    // Emit message to all in room
    this.server.to(payload.room).emit('message', payload);
  }
}
