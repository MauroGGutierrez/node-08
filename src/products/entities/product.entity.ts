import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
