import { IsNotEmpty, IsString } from 'class-validator';

export class Category {
  @IsNotEmpty()
  @IsString()
  name: string;

  id?: string;
}
