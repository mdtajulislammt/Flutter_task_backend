import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from 'src/modules/application/task/task.controller';
import { TasksService } from 'src/modules/application/task/task.service';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
