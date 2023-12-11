import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private category: CategoryService) {}
  @Get()
  getAllCategories() {
    return this.category.getAllCategories();
  }
}
