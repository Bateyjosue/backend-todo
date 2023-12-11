import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private category: CategoryService) {}
  @Get()
  getAllCategories() {
    return this.category.getAllCategories();
  }

  @Post()
  addCategory(@Body() category: Category) {
    return this.category.addCategory(category);
  }
}
