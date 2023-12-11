import { Injectable } from '@nestjs/common';
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
    return await this.db.push('/db/category/data[]', {
      id: uuidv4(),
      ...category,
    });
  }
}
