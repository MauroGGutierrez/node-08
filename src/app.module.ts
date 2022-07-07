import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CustomersController } from './customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ProductsModule,
    TagsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'nestdb',
    }),
  ],
  controllers: [
    AppController,
    ProductsController,
    CustomersController,
    UsersController,
  ],
  providers: [AppService, ProductsService], //aqui van los servicios tambien (inyexccion de dependencias)
})
export class AppModule {}
