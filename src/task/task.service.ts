import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TASK_STATUS, TaskDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseRepository } from 'src/database.repository';

@Injectable()
export class TaskService {
  private path: string;

  constructor(private databaseRepository: DatabaseRepository) {
    this.path = 'task';
  }
  async getTasks() {
    return await this.databaseRepository.findAll(this.path);
  }

  async getTask(id: { id: string }) {
    const tasks: TaskDto[] = await this.getTasks();

    const index = tasks.findIndex((task) => task.id === id.id);
    if (index == -1) {
      throw new NotFoundException('Task not found');
    }
    return await this.databaseRepository.findOne(this.path, index);
  }

  async addTask(task: TaskDto) {
    const categoryData = await this.databaseRepository.findAll('category');
    const newTask = {
      id: uuidv4(),
      ...task,
      status: TASK_STATUS.OPEN,
    };
    const hasCategory = categoryData.find(
      (category) => category.id === newTask.categoryId,
    );

    if (!hasCategory) {
      throw new ForbiddenException('Invalid Category');
    }

    try {
      await this.databaseRepository.create(this.path, newTask);
      return newTask;
    } catch (err) {
      throw new InternalServerErrorException('Error creating');
    }
  }

  async deleteTask(id) {
    const tasks: TaskDto[] = await this.databaseRepository.findAll(this.path);

    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new NotFoundException('Task not found');
    }
    await this.databaseRepository.delete(this.path, index);
    return tasks;
  }
}
