import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Category {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
