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

  getId(id: number): Product {
    return this.products.find((item: Product) => item.id == id);
  }

  insert(body: any) {
    this.products = [
      ...this.products,
      {
        id: this.lastId() + 1,
        name: body.name,
        description: body.description,
      },
    ];
  }

  update(id: number, body: any) {
    const product: Product = {
      id,
      name: body.name,
      description: body.description,
    };
    this.products = this.products.map((item: Product) => {
      console.log(item, id, item.id == id);
      return item.id == id ? product : item;
    });
  }

  delete(id: number) {
    this.products = this.products.filter((item: Product) => item.id != id);
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }
}

// insert(product: Product) {
//   this.products = [...this.products, product]; // nueva forma de hacer un push ...this.product todo lo que tenemos aqui agregale , products que viene por paramtro
// }
