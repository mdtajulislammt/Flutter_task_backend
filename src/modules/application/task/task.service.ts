import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTaskDto,
  UpdateTaskDto,
} from 'src/modules/application/task/dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTaskDto) {
    console.log('user id', userId, dto);
    const task = await this.prisma.task.create({
      data: {
        ...dto,
        user_id: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${task.id} not found`);
    return {
      message: 'Task created successfully',
      success: true,
      data: task,
    };
  }

  async findAll(userId: string) {
    return this.prisma.task.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, user_id: userId },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    await this.findOne(id, userId); // Ownership validation
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.task.delete({ where: { id } });
  }
}
