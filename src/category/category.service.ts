import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { Category } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseRepository } from 'src/database.repository';

@Injectable()
export class CategoryService {
  path: string;
  constructor(private databaseRepository: DatabaseRepository) {
    this.path = 'category';
  }
  // async getAllCategories(): Promise<Category[]> {
  //   const data: Category[] = await this.db.getData('/db/category/data/');
  //   return data;
  // }

  async findAll() {
    return await this.databaseRepository.findAll(this.path);
  }

  async addCategory(category: Category) {
    const categories = await this.findAll();
    const cat = categories.map((catego) => catego.name);
    try {
      if (cat.includes(category.name)) {
        throw new ConflictException('Category exists');
      }

      await this.databaseRepository.create(this.path, category);
      return category;
    } catch (err) {
      return err;
    }
  }

  // async deleteCategory(id: { id: string }) {
  //   const tasks = await this.db.getData('/db/task/data/');
  //   const categories = await this.db.getData('/db/category/data/');
  //   const hasCategory = tasks.find((category) => category.categoryId === id.id);
  //   if (hasCategory) {
  //     throw new ConflictException('This category has tasks attached to it');
  //   }

  //   const index = categories.findIndex(
  //     (category: { id: string; name: string }) => category.id === id.id,
  //   );
  //   this.db.delete(`/db/category/data[${index}]`);
  //   return id;
  // }
}
