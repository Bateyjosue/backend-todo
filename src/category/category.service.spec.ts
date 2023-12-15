import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { DatabaseRepository } from '../database.repository';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { TaskService } from '../task/task.service';
import { TASK_STATUS } from '../task/dto/task.dto';

describe('CategoryService', () => {
  let service: CategoryService;

  const mock = {
    findAll: jest.fn((dto) => dto),
    create: jest.fn().mockImplementation((dto) => dto),
    delete: jest.fn(),
  };

  const mockTack = {
    findAll: jest.fn().mockImplementation((dto) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        TaskService,
        {
          provide: DatabaseRepository,
          useValue: mock,
        },
        {
          provide: TaskService,
          useValue: mockTack,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Category', () => {
    it('should create', async () => {
      mock.findAll.mockReturnValue([]);
      expect(
        await service.addCategory({
          id: uuidv4(),
          name: 'Morning Routine',
        }),
      ).toEqual({
        id: expect.any(String),
        name: 'Morning Routine',
      });
    });
  });

  describe('Find All', () => {
    it('should get all categrories', async () => {
      mock.findAll.mockReturnValue([]);
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('raised a not found on delete Category ', () => {
    mockTack.findAll.mockReturnValue([]);
    it('should raise an not found exception', async () => {
      expect(service.deleteCategory('2')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  // describe('Delete Category on id ', () => {
  //   const cat = {
  //     id: '1',
  //     name: 'category 1',
  //   };

  //   const tasks = [
  //     {
  //       id: uuidv4(),
  //       title: 'Make breakfast',
  //       description: 'make breakfast',
  //       status: TASK_STATUS.OPEN,
  //       categoryId: '1',
  //     },
  //   ];

  //   mock.delete.mockReturnValue(cat.id);
  //   it('should delete category', async () => {
  //     expect(await service.deleteCategory(cat.id)).toBe('1');
  //   });

  //   it('should raise conflict category', async () => {
  //     mockTack.findAll.mockReturnValue(tasks);

  //     expect(await service.deleteCategory(cat.id)).toBe('1');
  //   });
  // });

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
