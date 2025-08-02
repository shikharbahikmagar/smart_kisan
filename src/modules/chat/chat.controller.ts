// src/chat/chat.controller.ts
import { Controller, Get, Param, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../../common/decorators/user.decorator';
import { authPayload } from '../auth/jwt.strategy';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @IsPublic()
  @Get(':room')
  getMessages(@Param('room') room: string) {
    return this.chatService.getMessages(room);
  }


  //get all unique chat rooms accorging to logged in user
   @Roles(UserRole.FARMER, UserRole.EXPERT)
  @UseGuards(RolesGuard)
  @Get('fetch/rooms')
  async getRooms(@User() user: authPayload) {
    const userId = user.userId;

    const userRole = user.role;

    // console.log(`Fetching rooms for userId: ${userId}, role: ${userRole}`);

    const rooms = await this.chatService.getRooms(userId, userRole);

    return {
      message: 'Rooms fetched successfully',
      rooms: rooms.map((row) => row.room), // Extracting room names from the result
    }
  }

  //get unique farmers name image and id according to logged in expert and according to room
}
