import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';

@Injectable()
export class CategoryService {
  async getAllCategories() {
    const db = new JsonDB(new Config('db', true, false));

    const data = await db.getData('/db/category/data/');
    return data;
  }
}
