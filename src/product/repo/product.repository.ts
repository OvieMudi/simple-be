import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  public async findOne(query: FilterQuery<Product>): Promise<Product> {
    return this.productModel.findOne(query);
  }

  public async find(query: FilterQuery<Product>): Promise<Product[]> {
    return this.productModel.find(query);
  }

  public async create(product: Partial<Product>): Promise<Product> {
    return this.productModel.create(product);
  }

  public async update(
    query: FilterQuery<Product>,
    product: Partial<Product>,
  ): Promise<Product> {
    return this.productModel.findOneAndUpdate(query, product, {
      new: true,
      lean: true,
    });
  }
}
