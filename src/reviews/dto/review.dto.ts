import { IsString } from 'class-validator';

export class ReviewDto {
  @IsString()
  description: string;
}
