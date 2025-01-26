// src/products/dto/update-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty()
  codigo: string;

  @ApiProperty({ required: false })
  descripcion: string;

  @ApiProperty()
  precio: number;

  @ApiProperty({ required: false })
  imagen?: string;
  
  @ApiProperty({ required: false })
  ubicacion?: string; 
}   