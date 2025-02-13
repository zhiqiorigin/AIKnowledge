import { IsNotEmpty, IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TodoStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

export class CreateTodoDto {
  @ApiProperty({ example: 'Complete project documentation' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Write detailed documentation for the project.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-03-01' })
  @IsDate()
  due_date?: Date;

  @ApiProperty({ example: 'high', required: false })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiProperty({ example: TodoStatus.PENDING })
  @IsNotEmpty()
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  assigned_to: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  created_by: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  team_id?: number;
}