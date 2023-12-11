import { ForbiddenException, Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { TaskDto } from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  db = new JsonDB(new Config('db', true, false));
  async getTasks() {
    const tasks = await this.db.getData('/db/task/data/');

    return tasks;
  }

  async getTask(id: { id: string }) {
    const tasks: TaskDto[] = await this.db.getData('/db/task/data/');

    return tasks.find((task) => task.id === id.id);
  }
  async addTask(task: TaskDto) {
    const categoryData = await this.db.getData('/db/category/data/');
    const newTask = {
      id: uuidv4(),
      ...task,
    };
    const hasCategory = categoryData.find(
      (category) => category.id === newTask.categoryId,
    );

    if (!hasCategory) {
      throw new ForbiddenException('Invalid Category');
    }

    try {
      await this.db.push('/db/task/data[]', newTask);
      return {
        status: 201,
        message: 'Task added successfully',
        statusText: 'created',
      };
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  deleteTask(id) {
    console.log(id);
  }
}
