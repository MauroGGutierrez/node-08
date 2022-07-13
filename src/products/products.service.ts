import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from 'src/size/entities/size.entities';
import { Repository } from 'typeorm';
import { ProductPatchDto } from './dto/product-patch.dto';
import { ProductDTO } from './dto/product.dto';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Size)
    private sizesRepository: Repository<Size>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async getId(id: number): Promise<Product> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async insert(body: ProductDTO) {
    const sizes = await Promise.all(
      body.sizes.map((size) => this.selectOrCreateSize(size)),
    );
    const product = this.productsRepository.create({
      ...body,
      sizes,
    });
    await this.productsRepository.save(product);
    return product;
  }

  async update(id: number, body: ProductDTO | ProductPatchDto) {
    const productCount = await this.productsRepository.count({ where: { id } });
    if (productCount === 0) {
      throw new NotFoundException(`No se encuentra el producto ${id}`);
    }
    const sizes =
      body.sizes &&
      (await Promise.all(
        body.sizes.map((size) => this.selectOrCreateSize(size)), // el selectOrCreateSize recorre un array (solo funciona de forma async)
      ));
    const product = await this.productsRepository.preload({
      id,
      ...body,
      sizes,
    });
    return this.productsRepository.save(product);
  }

  async delete(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (product) {
      return this.productsRepository.remove(product);
    }
    throw new NotFoundException(`No se encuentra el producto ${id}`);
  }
  private async selectOrCreateSize(size: string) {
    const sizeEntity = await this.sizesRepository.findOne({ where: { size } });
    if (sizeEntity) {
      return sizeEntity;
    }
    const newSize = this.sizesRepository.create({ size });
    return this.sizesRepository.save(newSize);
  }
}
