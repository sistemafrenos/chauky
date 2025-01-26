// src/swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('My NestJS API')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('users')
  .build();