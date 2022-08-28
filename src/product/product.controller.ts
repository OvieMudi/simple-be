import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ExtractToken } from 'src/common/decorators';
import { CreateProductDTO } from './dto';
import { ProductService } from './product.service';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async getProducts(): Promise<any> {
    return this.productService.getProducts();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createProduct(
    @Body() payload: CreateProductDTO,
    @ExtractToken('userId') userId: string,
  ): Promise<any> {
    return this.productService.createProduct(userId, payload);
  }
}
