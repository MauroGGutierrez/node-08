import { IsInt, IsString, IsArray } from 'class-validator';

export class ProductDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  stock: number;
  @IsString({ each: true })
  @IsArray()
  sizes: string[];
}
