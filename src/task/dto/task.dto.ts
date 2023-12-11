import { IsNotEmpty } from 'class-validator';

enum TASKSTATUS {
  OPEN,
  IN_PROGRESS,
  DONE,
}

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  status: TASKSTATUS;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  categoryId: string;
}
