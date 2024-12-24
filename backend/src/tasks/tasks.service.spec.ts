import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockUser: User = {
    id: 'test-user-id',
    email: 'test@example.com',
    password: 'password',
    tasks: [],
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.TODO,
      };

      const task = {
        id: '1',
        ...createTaskDto,
        userId: mockUser.id,
        user: mockUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'create').mockReturnValue(task as Task);
      jest.spyOn(repository, 'save').mockResolvedValue(task as Task);

      const result = await service.create(createTaskDto, mockUser);
      expect(result).toEqual(task);
      expect(repository.create).toHaveBeenCalledWith({
        ...createTaskDto,
        user: mockUser,
      });
      expect(repository.save).toHaveBeenCalledWith(task);
    });
  });
});