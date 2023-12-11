import { IsNotEmpty } from 'class-validator';

export enum TASKSTATUS {
  OPEN,
  IN_PROGRESS,
  DONE,
}

export class TaskDto {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  status: TASKSTATUS;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  categoryId: string;
}
