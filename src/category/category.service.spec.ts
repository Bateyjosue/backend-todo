import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { DatabaseRepository } from '../database.repository';

describe('CategoryService', () => {
  let service: CategoryService;

  const mock = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: DatabaseRepository,
          useValue: mock,
        },
      ],
    })
      // .useMocker(createMock)
      .compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find All', () => {
    it('should get all categrories', async () => {
      const categories = await service.findAll();
      const result = [];
      mock.findAll.mockReturnValue(result);
      expect(categories).toEqual([]);
    });
  });

  // describe('Get All Categories', () => {
  //   it('get all categories', async () => {
  //     // const category = await service.db.getData('/db/category/data/');
  //     const data = await service.findAll();
  //     expect(data.length).toBeGreaterThan(0);
  //   });
  // });
  // describe('Add New Category', () => {
  //   it('should add a new category', () => {
  //     const category = {
  //       id: '001',
  //       name: 'Evening Routine',
  //     };
  //     const newCategory = service.addCategory(category);

  //     expect(newCategory).resolves.toBe(category);
  //   });

  //   it('should not add a new category', () => {
  //     const category = {
  //       id: '001',
  //       name: '',
  //     };
  //     const newCategory = service.addCategory(category);

  //     expect(newCategory).resolves.toBeInstanceOf(ForbiddenException);
  //   });
  // });

  // describe('Delete Category', () => {
  //   it('it should delete a category', () => {
  //     const id = { id: '001' };
  //     const category = service.deleteCategory(id);
  //     expect(category).resolves.toBe(id);
  //   });
  // });
});
