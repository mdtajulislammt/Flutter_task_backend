import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskPriority, TaskStatus } from 'prisma/generated';

export class CreateTaskDto {
  @ApiProperty({ example: 'Complete Flutter UI' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Finish the task details screen' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.TODO,
    description: 'Current status of the task',
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.LOW,
    description: 'Priority of the task',
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiPropertyOptional({ example: '2026-03-05T12:00:00Z' })
  @IsDateString()
  @IsOptional()
  due_date?: string;
}
