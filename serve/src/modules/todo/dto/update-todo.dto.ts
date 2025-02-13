import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TodoStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

export class UpdateTodoDto {
  @ApiProperty({ example: 'Complete project documentation', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Write detailed documentation for the project.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-03-01', required: false })
  @IsOptional()
  @IsDate()
  due_date?: Date;

  @ApiProperty({ example: 'high', required: false })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiProperty({ example: TodoStatus.PENDING, required: false })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  assigned_to?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  created_by?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  team_id?: number;
}
