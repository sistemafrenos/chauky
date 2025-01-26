// src/products/products.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, Product as ProductModel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all Products' })
  @ApiResponse({ status: 200, description: 'Returns all Products'})
  @Get()
  async getAllProducts(): Promise<ProductModel[]> {
    return this.productsService.products({});
  }

  @ApiOperation({ summary: 'Get a Producto by ID' })
  @ApiResponse({ status: 200, description: 'Returns a Producto by ID' })
  @ApiParam({ name: 'id', description: 'Producto ID' })
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductModel | null> {
    return this.productsService.product({ id: Number(id) });
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created' })
  @ApiBody({ type: CreateProductDto })
  @Post()
  async createProduct(@Body() productData: CreateProductDto): Promise<ProductModel> {
    return this.productsService.createProduct(productData);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated'})
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: UpdateProductDto,
  ): Promise<ProductModel> {
    return this.productsService.updateProduct({
      where: { id: Number(id) },
      data: productData,
    });
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.deleteProduct({ id: Number(id) });
  }
}