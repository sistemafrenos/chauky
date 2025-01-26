import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';
import { OpenApiModule } from './openapi/openapi.module';


@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, OpenApiModule],
  controllers: [AppController, ProductsController, UsersController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
