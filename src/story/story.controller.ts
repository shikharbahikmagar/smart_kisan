import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './entities/story.entity';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../constants/enum/user-role.enum';
import { User } from '../common/decorators/user.decorator';
import { authPayload } from 'src/modules/auth/jwt.strategy';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER) // Adjust roles as necessary
  @Post('create')
  @UseInterceptors(FileInterceptor('file')) // If you want to handle file uploads
  async create(@Body() data: CreateStoryDto, @User() user: authPayload) {

    if(user)
    {
      data.farmerId = user.userId; // Assuming the user ID is stored in the authPayloadl
    }

    const story = await this.storyService.create(data);
    return {
      message: 'Story created successfully',
      data: story,
    };
    
  }

  @IsPublic()
  @Get()
  async findAll() {
    const story = await this.storyService.findAll();
    return {
      message: 'Stories retrieved successfully',
      data: story, 
    };
  }

  //get logged in farmer's stories
  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER)
  @Get('my-story')
  async findMyStories(@User() user: authPayload) {
    const stories = await this.storyService.getMyStory(user.userId);
    return {
      message: 'My stories retrieved successfully',
      data: stories,
    };
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER)
  @Post('update')
  @UseInterceptors(FileInterceptor('file')) // If you want to handle file uploads
  async update(@Body() data: UpdateStoryDto, @User() user: authPayload) {
    if(user)
    {
      data.farmerId = user.userId; // Assuming the user ID is stored in the authPayload
    }
    const story = await this.storyService.updateStory(data);
    return {
      message: 'Story updated successfully',
      data: story,
    };
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(+id);
  }
}
