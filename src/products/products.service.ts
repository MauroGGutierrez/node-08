import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  //product services tiene una propiedad y lo que tenemos dentro de la propiedad son metodos
  private products: Product[] = [
    //si dice private es algo que nadie puede cambiar y no es publico. esto solo estara en este componente
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marco ideal para tus fotos 10x15',
    },
  ];

  getAll(): Product[] {
    return this.products;
  }
  insert(product: Product) {
    this.products = [...this.products, product]; // nueva forma de hacer un push ...this.product todo lo que tenemos aqui agregale , products que viene por paramtro
  }
}
