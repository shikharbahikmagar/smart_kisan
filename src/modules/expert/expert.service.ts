import { Injectable } from '@nestjs/common';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expert } from './entities/expert.entity';

@Injectable()
export class ExpertService {
  constructor(
    @InjectRepository(Expert)
    private readonly expertRepository: Repository<Expert>,
  ) {}

  //update profile of expert
  async updateProfile(data: UpdateExpertDto, userId: number) {
    const expert = await this.expertRepository.findOne({
      where: {
        userId: userId,
      },
      relations: ['user'],
    });

    // console.log("adfkaskdfsdlfl", userId);

    if (!expert) {
      const newExpert = this.expertRepository.create({
        userId: userId,
        bio: data.bio || '',
        expertise: data.expertise || '',
        qualification: data.qualification || '',
        experience_years: data?.experience_years || 0,
        availability: data.availability || false,
      });

      const createdExpert = await this.expertRepository.save(newExpert);

      if (!createdExpert) {
        throw new Error('Failed to create expert profile');
      }

      // console.log(createdExpert);

      return createdExpert;
    }

    // Update the expert profile with the provided data
    expert.bio = data.bio || expert.bio;
    expert.expertise = data.expertise || expert.expertise;
    expert.qualification = data.qualification || expert.qualification;
    expert.experience_years =
      data?.experience_years || expert?.experience_years;
    expert.availability = data.availability || expert.availability;

    // Save the updated expert profile
    const updatedExpert = await this.expertRepository.save(expert);

    if (!updatedExpert) {
      throw new Error('Failed to update expert profile');
    }

    // console.log("fetch from service:", updatedExpert);

    return updatedExpert;
  }

  async create() {
    return 'This action adds a new expert';
  }

  findAll() {
    return `This action returns all expert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expert`;
  }

  update(id: number) {
    return `This action updates a #${id} expert`;
  }

  remove(id: number) {
    return `This action removes a #${id} expert`;
  }
}
