import { PartialType } from '@nestjs/mapped-types';
import { ProductDTO } from './product.dto';

export class ProductPatchDto extends PartialType(ProductDTO) {} // el partialType sirve para cambiar a opcional los datos que pediamos en Product DTO ,como haciamos antes era con el ?
