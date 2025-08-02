import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
  ) {}

  async create(data: CreateStoryDto) {

    const existingStory = await this.storyRepository.findOne({
      where: { farmerId: data.farmerId },
    });

    if (existingStory) {
      throw new Error('Story for this farmer already exists');
    }

    // Create a new story entity

    const newStory = this.storyRepository.create(data);

    // Save the story to the database
    const story = await this.storyRepository.save(newStory);

    return story;
  }

  async findAll() {
    
    const stories = await this.storyRepository.find({
      order: {
        createdAt: 'DESC', // Order by creation date, most recent first
      },
      //select only first name last and image of farmer
      relations: ['farmer'], // Assuming 'farmer' is a relation in the Story entity
      select: {
        farmer: {
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
      
    });

    return stories;

  }

  async getMyStory(farmerId: number) {
    const story = await this.storyRepository.findOne({
      where: { farmerId },
      order: {
        createdAt: 'DESC', // Order by creation date, most recent first
      }
      
    });

    return story;
  }

  //update story
  async updateStory(data: UpdateStoryDto) {
    const story = await this.storyRepository.findOne({
      where: { farmerId: data.farmerId },
    });
    if (!story) {
      throw new Error('Story not found');
    } 

    // Update the story with the new data
    Object.assign(story, data);
    await this.storyRepository.save(story);

    return story;
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
