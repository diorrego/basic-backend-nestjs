import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-products.dto';
import { UpdateProductDto } from './dtos/update-products.dto';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { ProductI } from './interfaces/products.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Res() res: Response): Promise<ProductI[]> {
    const products = await this.productsService.getProducts();
    res.status(HttpStatus.OK).json({
      message: 'Products',
      products,
    });
    return products;
  }

  @Get(':id')
  async getProduct(
    @Param('id') id: 'id',
    @Res() res: Response,
  ): Promise<ProductI> {
    const product = await this.productsService.getProduct(id);
    res.status(HttpStatus.OK).json({
      message: 'Product',
      product,
    });
    return product;
  }

  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto,
    @Res() res: Response,
  ): Promise<ProductI> {
    const newProduct = await this.productsService.createProduct(productDto);
    res.status(HttpStatus.OK).json({
      message: 'New product',
      product: newProduct,
    });
    return newProduct;
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
    @Res() res: Response,
  ): Promise<ProductI> {
    const updateProduct = await this.productsService.updateProduct(
      id,
      productDto,
    );
    res.status(HttpStatus.OK).json({
      message: 'Update product',
      product: updateProduct,
    });
    return updateProduct;
  }
  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ProductI> {
    const deleteProduct = await this.productsService.deleteProduct(id);
    res.status(HttpStatus.OK).json({
      message: 'Update product',
      product: deleteProduct,
    });
    return deleteProduct;
  }
}
