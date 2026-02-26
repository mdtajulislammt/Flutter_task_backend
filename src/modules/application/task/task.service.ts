import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/application/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/application/task/dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(user_id: string, dto: CreateTaskDto) {
    if (!user_id) {
      throw new BadRequestException(
        'User identification is required to create a task.',
      );
    }

    try {
      const task = await this.prisma.task.create({
        data: {
          title: dto.title,
          description: dto.description,
          status: dto.status,
          due_date: dto.due_date ? new Date(dto.due_date) : null,
          user_id: user_id,
        },
      });

      return {
        success: true,
        statusCode: 201,
        message: 'Task created successfully',
        data: task,
      };
    } catch (error) {
      console.error('Prisma Create Error:', error.message);

      throw new BadRequestException(
        `Failed to create task: ${
          error.message.includes('Foreign key')
            ? 'Invalid User ID provided'
            : 'Invalid data format'
        }`,
      );
    }
  }

  async findAll(
    userId: string,
    query: { search?: string; page: number; limit: number },
  ) {
    const { search, page, limit } = query;

    // Pagination calculation
    const skip = (page - 1) * limit;

    // Search filter configuration
    const where: any = {
      user_id: userId,
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive', // Case-insensitive search (PostgreSQL default)
        },
      }),
    };

    // Parallel execution for better performance (High-scale SaaS strategy)
    const [tasks, total_count] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.task.count({ where }),
    ]);

    return {
      success: true,
      statusCode: 200,
      message: 'Tasks fetched successfully',
      data: tasks,
      meta: {
        total_items: total_count,
        current_page: page,
        per_page: limit,
        total_pages: Math.ceil(total_count / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, user_id: userId },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return {
      success: true,
      statusCode: 200,
      message: 'Task fetched successfully',
      data: task,
    };
  }
  async update(id: string, userId: string, dto: UpdateTaskDto) {
    // 1. Check ownership
    await this.findOne(id, userId);

    try {
      // 2. Perform Update
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: {
          ...dto,
          // String date-ke Prisma compatible Date object-e convert kora
          due_date: dto.due_date ? new Date(dto.due_date) : dto.due_date,
          user_id: userId,
        },
      });

      if (!updatedTask) {
      throw new BadRequestException(
        'Task Not update',
      );
    }

      return {
        success: true,
        statusCode: 200,
        message: 'Task updated successfully',
        data: updatedTask,
      };
    } catch (error) {
      throw new BadRequestException('Update failed. Check your data format.');
    }
  }

async remove(id: string, userId: string) {
  // 1. Ensure ownership before delete
  await this.findOne(id, userId);

  try {
    // 2. Perform Delete
    const deleted_task = await this.prisma.task.delete({ 
      where: { id } 
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Task deleted successfully',
      data: { id: deleted_task.id },
    };
  } catch (error) {
    throw new BadRequestException('Failed to delete task. It might not exist.');
  }
}
}
