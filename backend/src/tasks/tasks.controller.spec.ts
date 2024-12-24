import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockUser: User = {
    id: 'test-user-id',
    email: 'test@example.com',
    password: 'password',
    tasks: [],
  };

  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const dto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.TODO,
      };

      const expectedResult = {
        id: '1',
        ...dto,
        userId: mockUser.id,
        user: mockUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(dto, mockUser);
      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(dto, mockUser);
    });
  });
});