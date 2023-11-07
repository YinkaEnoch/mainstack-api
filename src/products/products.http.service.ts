import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { NotFoundError } from '../shared/errors/not-found.error';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsHttpService {
  constructor(private readonly productsService: ProductsService) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    try {
      return await this.productsService.create(createProductDto);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll({
    limit,
    page,
  }: {
    limit: number;
    page: number;
  }): Promise<any> {
    try {
      return await this.productsService.findAll({ limit, page });
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      return await this.productsService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<any> {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async remove(id: string): Promise<any> {
    try {
      return await this.productsService.remove(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
