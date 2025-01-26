// src/openapi/openapi.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../app.module';
import { Response } from 'express';
import { NestFactory } from '@nestjs/core';

@Controller('openapi')
export class OpenApiController {
  @Get()
  async getOpenApiSpec(@Res() res: Response) {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
      .setTitle('My NestJS API')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('products')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  }
}