import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'prisma/generated';

export class UpdateTaskDto {
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
    description: 'Current status of the task' 
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiPropertyOptional({ example: '2026-03-05T12:00:00Z' })
  @IsDateString()
  @IsOptional()
  due_date?: string;
}