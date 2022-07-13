import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Review } from '../reviews/entities/review.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ReviewsController } from 'src/reviews/reviews.controller';
import { ReviewsService } from 'src/reviews/reviews.service';
import { Size } from 'src/size/entities/size.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review, Size])], // esto va concectado con autoloadentities de appmodule
  controllers: [ProductsController, ReviewsController],
  providers: [ProductsService, ReviewsService],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
