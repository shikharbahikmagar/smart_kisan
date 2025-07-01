import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersController } from './sliders.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Slider]),
    CloudinaryModule,
  ],
  controllers: [SlidersController],
  providers: [SlidersService],
  exports: [SlidersService],
})
export class SlidersModule {}
