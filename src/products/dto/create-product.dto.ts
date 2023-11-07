import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  category: string;

  @Transform(({ value }) => parseFloat(value))
  @IsDefined()
  @IsNotEmpty()
  price: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @IsDefined()
  @IsNotEmpty()
  quantity: number;
}
