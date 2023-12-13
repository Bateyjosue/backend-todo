import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { TASKSTATUS, TaskDto } from './dto';
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
  // async addTask(task: TaskDto) {
  //   const categoryData = await this.db.getData('/db/category/data/');
  //   const newTask = {
  //     id: uuidv4(),
  //     ...task,
  //     status: TASKSTATUS.OPEN,
  //   };
  //   const hasCategory = categoryData.find(
  //     (category) => category.id === newTask.categoryId,
  //   );

  //   if (!hasCategory) {
  //     throw new ForbiddenException('Invalid Category');
  //   }

  //   try {
  //     await this.db.push('/db/task/data[]', newTask);
  //     return {
  //       status: 201,
  //       message: 'Task added successfully',
  //       statusText: 'created',
  //     };
  //   } catch (err) {
  //     throw new ForbiddenException(err);
  //   }
  // }

  // async deleteTask(id) {
  //   const tasks: TaskDto[] = await this.db.getData('/db/task/data/');

  //   const index = tasks.findIndex((task) => task.id === id.id);
  //   return await this.db.delete(`/db/task/data[${index}]`);
  // }
}
