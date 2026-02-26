import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from 'src/modules/application/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/application/task/dto/update-task.dto';
import { TasksService } from 'src/modules/application/task/task.service';
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiTags('Tasks Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  async create(@Req() req: any, @Body() createTaskDto: CreateTaskDto) {
    const user_id = req.user?.userId;

    if (!user_id) {
      console.error('Auth Error: No user found in request');
      throw new UnauthorizedException(
        'User authentication failed. Please login again.',
      );
    }

    return this.tasksService.create(user_id, createTaskDto);
  }

  @Get('all_tasks')
  @ApiOperation({ summary: 'Get all tasks with search and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Tasks fetched successfully.',
    type: CreateTaskDto,
  })
  @ApiBody({ type: CreateTaskDto })
  findAll(
    @GetUser('id') userId: string,
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.tasksService.findAll(userId, {
      search,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task fetched successfully.',
    type: CreateTaskDto,
  })
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.tasksService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiResponse({
    status: 200,
    description: 'Update an existing task',
    type: UpdateTaskDto,
  })
  update(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, userId, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'Delete a task Successfully',
    type: UpdateTaskDto,
  })
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.tasksService.remove(id, userId);
  }
}
