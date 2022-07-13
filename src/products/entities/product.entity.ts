import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { Size } from 'src/size/entities/size.entities';

@Entity()
export class Product {
  //estamos creando nuestras entidades
  @PrimaryGeneratedColumn() //los id se hacen de esta forma para que se autogeneren las id
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[]; // un producto puede tener varias reviews y creame un array de review
  //si dice de uno a muchos sabemos q va a ser un array y que el nombre lleva s al final

  @JoinTable()
  @ManyToMany(() => Size, (size) => size.products)
  sizes: Size[];
}
