import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseRepository } from '../database.repository';

@Injectable()
export class CategoryService {
  path: string;
  constructor(private readonly databaseRepository: DatabaseRepository) {
    this.path = 'category';
  }

  async findAll(): Promise<Category[]> {
    return await this.databaseRepository.findAll(this.path);
  }

  async findOne(payload) {
    const categories = await this.findAll();
    const cat = categories.findIndex((catego) => catego.id === payload);
    if (cat === -1) {
      return new NotFoundException('Category not found');
    }
    return await this.databaseRepository.findOne(this.path, cat);
  }

  async addCategory(category: Category) {
    const categories = (await this.findAll()) || [];
    const cat = categories.map((catego) => catego.name);
    try {
      if (cat.includes(category.name)) {
        throw new ConflictException('Category exists');
      }

      await this.databaseRepository.create(this.path, {
        id: uuidv4(),
        ...category,
      });
      return category;
    } catch (err) {
      return err;
    }
  }

  async deleteCategory(id) {
    const tasks = await this.databaseRepository.findAll('task');
    const categories = await this.databaseRepository.findAll(this.path);
    const hasCategory = tasks.find((category) => category.categoryId === id);

    if (hasCategory) {
      throw new ConflictException('This category has tasks attached to it');
    }

    const index = categories.findIndex(
      (category: { id: string; name: string }) => category.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Category not found');
    }
    this.databaseRepository.delete(this.path, index);
    return id;
  }
}
