import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Product, (product) => product.reviews) // la clave foranya (FK)seria lo que tenemos aqui product.reviews esto viene de product.entity cuando creamos el array de reviews
  product: Product; // cuando dice de mucho a uno ya sabemos que va a ser singular y ya no un array
}
