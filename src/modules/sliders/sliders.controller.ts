import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { Exception } from 'handlebars';


@Controller('slider')
export class SlidersController {
  constructor(private readonly slidersService: SlidersService,
              private readonly cloudinaryService: CloudinaryService
  ) {}


  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async create(@Body() data: CreateSliderDto, @UploadedFile() file: Express.Multer.File) {

    if(!file) {
      
      return {
        message: 'Image file is required',
        error: 'No image file provided',
      }
    }


    const imageUrl = file ? await this.cloudinaryService.uploadSliderImage(file) : '';

    const newSlider = await this.slidersService.create({...data, image: imageUrl});

    return {
      message: 'Slider created successfully',
      slider: {
        id: newSlider.id,
        title: newSlider.title,
      },
    }

  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin')
  async adminFindAll() {
    

    const sliders = await this.slidersService.adminFindAll();
    return {
      message: 'Sliders retrieved successfully',
      data: sliders.map(slider => ({
        id: slider.id,
        title: slider.title,
        description: slider.description,
        image: slider.image,
        isActive: slider.isActive,
      })),
    };

  }

  @IsPublic()
  @Get()
  async findAll() {
    

    const sliders = await this.slidersService.adminFindAll();
    return {
      message: 'Sliders retrieved successfully',
      data: sliders.map(slider => ({
        id: slider.id,
        title: slider.title,
        description: slider.description,
        image: slider.image,
        isActive: slider.isActive,
      })),
    };

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slidersService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async updateStatus(@Param('id') id: string) {

    const updatedSlider = await this.slidersService.updateStatus(+id);

    return {
      message: 'Slider status updated successfully',
      slider: {
        id: updatedSlider.id,
        title: updatedSlider.title,
        isActive: updatedSlider.isActive,
      },
    }
    
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {


    await this.slidersService.remove(+id);
    
    return {
      message: 'Slider removed successfully',
    };
  }
}
