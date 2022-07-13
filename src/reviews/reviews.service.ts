import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Review } from './entities/review.entity';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async saveReview(id: number, body: ReviewDto) {
    const product = await this.productsRepository.findOne({ where: { id } });
    console.log(product, id);
    if (product) {
      const review = this.reviewRepository.create(body);
      review.product = product;
      await this.reviewRepository.save(review);
      return review;
    }
    throw new NotFoundException(`No encontramos el producto ${id}`);
  }
}
