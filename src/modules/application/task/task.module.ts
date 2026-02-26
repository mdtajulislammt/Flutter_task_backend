import { Module } from '@nestjs/common';
import { TasksController } from 'src/modules/application/task/task.controller';
import { TasksService } from 'src/modules/application/task/task.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
