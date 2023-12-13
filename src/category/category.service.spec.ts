import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { ForbiddenException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get All Categories', () => {
    it('get all categories', async () => {
      // const category = await service.db.getData('/db/category/data/');
      const data = await service.getAllCategories();
      expect(data.length).toBeGreaterThan(0);
    });
  });
  describe('Add New Category', () => {
    it('should add a new category', () => {
      const category = {
        id: '001',
        name: 'Evening Routine',
      };
      const newCategory = service.addCategory(category);

      expect(newCategory).resolves.toBe(category);
    });

    it('should not add a new category', () => {
      const category = {
        id: '001',
        name: '',
      };
      const newCategory = service.addCategory(category);

      expect(newCategory).resolves.toBeInstanceOf(ForbiddenException);
    });
  });

  // describe('Delete Category', () => {
  //   it('it should delete a category', () => {
  //     const id = { id: '001' };
  //     const category = service.deleteCategory(id);
  //     expect(category).resolves.toBe(id);
  //   });
  // });
});
