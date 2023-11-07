import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { NotFoundError } from '../shared/errors/not-found.error';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = new this.productModel(createProductDto);
      return newProduct.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll({ limit, page }: { limit: number; page: number }) {
    try {
      const offset = page > 1 ? limit * page : 0;

      return this.productModel
        .find()
        .select('-__v')
        .skip(offset)
        .limit(limit)
        .lean()
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productModel
        .findOne({ _id: id }, '-__v')
        .lean()
        .exec();

      if (!product) throw new NotFoundError(`Product (${id}) does not exist`);

      return product;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      // const product = await this.productModel.findById(id).exec();
      const product = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
        { new: true, select: '-__v' },
      );

      if (!product) throw new NotFoundError(`Product (${id}) does not exist`);

      return product;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    const deletedProduct = await this.productModel
      .findByIdAndRemove({ _id: id })
      .exec();

    if (!deletedProduct)
      throw new NotFoundError(`Product (${id}) does not exist`);

    return deletedProduct;
  }
}
