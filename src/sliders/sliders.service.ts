import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';

@Injectable()
export class SlidersService {

  constructor(
    @InjectRepository(Slider)
    private readonly sliderRepository: Repository<Slider>,
  ) {}

  async create(data: CreateSliderDto) {

    //make default isActive true
    data.isActive = true;

    const slider = this.sliderRepository.create(data);

    const newSlider = await this.sliderRepository.save(slider);


    return newSlider;
    
  }

  async findAll() {
    

    const sliders = await this.sliderRepository.find({
      order: { createdAt: 'DESC' },
    });

    return sliders;

  }

  findOne(id: number) {
    return `This action returns a #${id} slider`;
  }

  update(id: number, updateSliderDto: UpdateSliderDto) {
    return `This action updates a #${id} slider`;
  }

  async remove(id: number) {
    

    const existingSlider = await this.sliderRepository.findOne({ where: { id } });

    if (!existingSlider) {
      throw new NotFoundException('Slider not found');
    }


    await this.sliderRepository.remove(existingSlider);

    return {
      message: 'Slider removed successfully',
    };

  }

  async updateStatus(id: number)
  {
    const slider = await this.sliderRepository.findOne({ where: { id } });

    if (!slider) {
      throw new NotFoundException('Slider not found');
    }

    // Toggle the isActive status
    slider.isActive = !slider.isActive;

    const updatedSlider = await this.sliderRepository.save(slider);

    return updatedSlider;
  }
}
