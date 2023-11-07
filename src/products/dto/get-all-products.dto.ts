import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class GetAllProductsDto {
  @Transform(({ value }) => parseInt(value))
  @Max(50) // Best provided as an env variable for scalability
  @IsDefined()
  @IsNotEmpty()
  limit: number;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @IsDefined()
  @IsNotEmpty()
  page: number;
}
