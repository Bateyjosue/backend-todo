import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { Category } from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  db = new JsonDB(new Config('db', true, false));
  constructor() {}
  async getAllCategories() {
    const data = await this.db.getData('/db/category/data/');
    return data;
  }

  async addCategory(category: Category) {
    try {
      await this.db.push('/db/category/data[]', {
        id: uuidv4(),
        ...category,
      });
      return {
        status: 201,
        statusText: 'created',
        message: 'Category created successfully',
      };
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  async deleteCategory(id: { id: string }) {
    const tasks = await this.db.getData('/db/task/data/');
    const categories = await this.db.getData('/db/category/data/');
    const hasCategory = tasks.find((category) => category.categoryId === id.id);
    if (hasCategory) {
      throw new ConflictException('This category has tasks attached to it');
    }

    const index = categories.findIndex((category) => category.id === id.id);
    this.db.delete(`/db/category/data[${index}]`);
    return id;
  }
}
