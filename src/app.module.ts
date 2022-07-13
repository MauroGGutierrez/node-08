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
import { ReviewsModule } from './reviews/reviews.module';
import { SizeModule } from './size/size.module';

@Module({
  imports: [
    ProductsModule,
    TagsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestdb',
      retryDelay: 3000,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ReviewsModule,
    SizeModule,
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
