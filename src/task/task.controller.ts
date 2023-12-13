import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private tasksService: TaskService) {}
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTask(@Param() id: { id: string }) {
    return this.tasksService.getTask(id);
  }

  @Post()
  addTask(@Body() task: TaskDto) {
    return this.tasksService.addTask(task);
  }

  // @Delete(':id')
  // deleteTask(@Param() id: string) {
  //   return this.tasksService.deleteTask(id);
  // }
}
