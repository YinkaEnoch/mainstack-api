import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsHttpService } from './products.http.service';
import { RestHttpResponse } from '../shared/utils/rest-http-response.util';
import { GetAllProductsDto } from './dto/get-all-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsHttpService: ProductsHttpService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    const resp = await this.productsHttpService.create(createProductDto);
    return RestHttpResponse('New product created', resp);
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    queryParams: GetAllProductsDto,
  ) {
    const { limit, page } = queryParams;
    const resp = await this.productsHttpService.findAll({ limit, page });
    return RestHttpResponse('Successfully fetch products', resp);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const resp = await this.productsHttpService.findOne(id);
    return RestHttpResponse('Successfully fetch product', resp);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
    const resp = await this.productsHttpService.update(id, updateProductDto);
    return RestHttpResponse('Product successfully updated', resp);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const resp = await this.productsHttpService.remove(id);
    return RestHttpResponse('Product successfully deleted', resp);
  }
}
