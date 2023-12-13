import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DatabaseRepository } from 'src/database.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, DatabaseRepository],
})
export class TaskModule {}
