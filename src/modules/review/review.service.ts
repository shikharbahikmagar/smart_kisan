import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}


  async create(createReviewDto: CreateReviewDto): Promise<Review> {


    const newReview = this.reviewRepository.create(createReviewDto);
    
    const review = await this.reviewRepository.save(newReview);

    if(!review) {
      throw new Error('Failed to create review');
    }


    return review;
  }

  async findAll(productId?: number): Promise<Review[]> {

    if (productId) {
      return this.reviewRepository.find({ where: { productId } });
    }


    const reviews = await this.reviewRepository.find();

    

    return reviews;
  }


  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
