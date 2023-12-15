import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseRepository } from '../database.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, DatabaseRepository],
  exports: [DatabaseRepository],
})
export class CategoryModule {}
