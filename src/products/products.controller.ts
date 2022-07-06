import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.productsService.getId(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(@Body() body) {
    this.productsService.insert(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.productsService.delete(id);
  }
}
