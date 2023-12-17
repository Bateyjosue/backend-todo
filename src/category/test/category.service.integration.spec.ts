import { Test } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { AppModule } from '../../app.module';
import { DatabaseRepository } from '../../database.repository';
import { NotFoundException } from '@nestjs/common';

describe('Category Integration', () => {
  let service: CategoryService;
  let database: DatabaseRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    database = moduleRef.get(DatabaseRepository);
    service = moduleRef.get(CategoryService);
  });

  describe('FindAll Categories', () => {
    it('should return all categories', async () => {
      await database.create('category', {
        id: '001',
        name: 'Morning Routine',
      });
      const category = await database.findAll('category');

      expect(await service.findAll()).toEqual(category);
    });
    it('should return the category name', async () => {
      await database.create('category', {
        id: '001',
        name: 'Morning Routine',
      });
      const category = await database.findOne('category', '001');
      const findCategory = await service.findOne(category.id);

      expect(findCategory?.name).toBe('Morning Routine');
    });
    it('should throw not found error', async () => {
      const findCategory = await service.findOne('0091');

      expect(findCategory).toBeInstanceOf(NotFoundException);
    });
  });
});
