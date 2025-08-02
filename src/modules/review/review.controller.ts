import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { User } from '../../common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { authPayload } from '../auth/jwt.strategy';


@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() data: CreateReviewDto, @User() user: authPayload) {

    data.userId = user.userId; // Assuming the CreateReviewDto has a userId field

    const newReview = await this.reviewService.create(data);
    return {
      message: 'Review created successfully',
      review: {
        id: newReview.id,
        content: newReview.content,
        rating: newReview.rating,
      },
    };
    
  }

  @IsPublic()
  @Get()
  async findAll(@Query('productId') productId?: number) {

    const reviews = await this.reviewService.findAll(productId);


    return {
      message: 'Reviews fetched successfully',
      reviews: reviews.map(review => ({
        id: review.id,
        content: review.content,
        rating: review.rating,
      })),
    };


  }


}
