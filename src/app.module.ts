import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { HomeModule } from './home/home.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';

@Module({
  imports: [CustomersModule, HomeModule,TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
