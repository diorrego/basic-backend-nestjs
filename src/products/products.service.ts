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
    try {
      const products: ProductI[] = await this.productModel.find();
      return products;
    } catch (e) {
      console.log(e);
    }
  }

  async getProduct(id: string): Promise<ProductI> {
    try {
      const product: ProductI = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException(`No se encontró el id ${id}`);
      }
      return product;
    } catch (e) {
      console.log(e);
    }
  }

  async createProduct(productDto: CreateProductDto): Promise<ProductI> {
    try {
      const newProduct: ProductI = new this.productModel(productDto);
      return await newProduct.save();
    } catch (e) {
      console.log(e);
    }
  }

  async updateProduct(
    id: string,
    productDto: UpdateProductDto,
  ): Promise<ProductI> {
    try {
      const updateProduct: ProductI = await this.productModel.findByIdAndUpdate(
        id,
        productDto,
        { new: true },
      );
      if (!updateProduct) {
        throw new NotFoundException(`No se encontró el id ${id}`);
      }
      return await updateProduct.save();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProduct(id: string): Promise<ProductI> {
    try {
    } catch (e) {
      const deleteProduct: ProductI = await this.productModel.findByIdAndDelete(
        id,
      );
      if (!deleteProduct) {
        throw new NotFoundException(`No se encontró el id ${id}`);
      }
      return deleteProduct;
      console.log(e);
    }
  }
}
