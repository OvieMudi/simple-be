import { Injectable } from '@nestjs/common';
import {
  ISuccessResponse,
  ResponseFormatter,
} from 'src/common/utils/ResponseFormatter';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import { ProductRepository } from './repo';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async getProductById(id: string): Promise<ISuccessResponse> {
    const product = await this.productRepository.findOne({ _id: id });
    return ResponseFormatter.success(product);
  }

  public async getProductByEmail(email: string): Promise<ISuccessResponse> {
    const product = await this.productRepository.findOne({ email });
    return ResponseFormatter.success(product);
  }

  public async getProducts(): Promise<ISuccessResponse> {
    const products = await this.productRepository.find({});
    return ResponseFormatter.success(products);
  }

  public async createProduct(
    userId: string,
    product: CreateProductDTO,
  ): Promise<ISuccessResponse> {
    const newProduct = await this.productRepository.create({
      userId,
      category: product.category,
      name: product.name,
      image: product.image,
      discountRate: product.discountRate,
      minimumQty: product.minimumQty,
    });

    return ResponseFormatter.success(newProduct);
  }

  public async updateProduct(
    id: string,
    productDto: UpdateProductDTO,
  ): Promise<ISuccessResponse> {
    const product = await this.productRepository.update(
      { _id: id },
      productDto,
    );

    return ResponseFormatter.success(product);
  }
}
