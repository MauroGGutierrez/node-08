import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dto';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async getId(id: number): Promise<Product> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async insert(body: ProductDTO): Promise<Product> {
    const product = this.productsRepository.create(body);
    await this.productsRepository.save(product);
    return product;
  }

  async update(id: number, body: any): Promise<Product> {
    const userProduct = {
      id,
      ...body,
    };
    const product = await this.productsRepository.preload(userProduct);
    if (product) {
      return await this.productsRepository.save(product);
    }
    throw new NotFoundException(`No se encuentra el producto ${id}`);
  }

  async delete(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (product) {
      return this.productsRepository.remove(product);
    }
    throw new NotFoundException(`No se encuentra el producto ${id}`);
  }
}
