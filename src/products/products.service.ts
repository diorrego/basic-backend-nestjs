import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dtos/create-products.dto';
import { UpdateProductDto } from './dtos/update-products.dto';
import { ProductI } from './interfaces/products.interface';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('products') private readonly productModel: Model<ProductI>,
  ) {}

  async getProducts(): Promise<ProductI[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`No se encontró el id ${id}`);
    }
    return product;
  }

  async createProduct(productDto: CreateProductDto) {
    const newProduct = new this.productModel(productDto);
    return await newProduct.save();
  }

  async updateProduct(id: string, productDto: UpdateProductDto) {
    const updateProduct = await this.productModel.findByIdAndUpdate(
      id,
      productDto,
      { new: true },
    );
    if (!updateProduct) {
      throw new NotFoundException(`No se encontró el id ${id}`);
    }
    return await updateProduct.save();
  }

  async deleteProduct(id: string) {
    const deleteProduct = await this.productModel.findByIdAndDelete(id);
    if (!deleteProduct) {
      throw new NotFoundException(`No se encontró el id ${id}`);
    }
    return deleteProduct;
  }
}
