import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private category: CategoryService) {}

  // @Post()
  // addCategory(@Body() category: Category) {
  //   return this.category.addCategory(category);
  // }

  // @Delete(':id')
  // deleteCategory(@Param() id: { id: string }) {
  //   return this.category.deleteCategory(id);
  // }

  @Get()
  findAll() {
    return this.category.findAll();
  }

  @Get(':id')
  findById(@Param() id: { id: string }) {
    return this.category.findOne(id.id);
  }

  @Post()
  create(@Body() category: Category) {
    return this.category.addCategory(category);
  }

  @Delete(':id')
  deleteCategory(@Param() id: { id: string }) {
    return this.category.deleteCategory(id.id);
  }
}
