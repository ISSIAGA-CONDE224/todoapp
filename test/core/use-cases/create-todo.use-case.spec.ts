// test/core/use-cases/create-todo.use-case.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoUseCase } from '../../../src/core/use-cases/todo/create-todo.use-case';
import { ITodoRepository } from '../../../src/core/domain/repositories/todo.repository.interface';

describe('CreateTodoUseCase', () => {
  let useCase: CreateTodoUseCase;
  let mockTodoRepository: jest.Mocked<ITodoRepository>;

  beforeEach(async () => {
    mockTodoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTodoUseCase,
        {
          provide: 'ITodoRepository',
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateTodoUseCase>(CreateTodoUseCase);
  });

  it('should create a todo', async () => {
    const todoData = {
      title: 'Test Todo',
      description: 'This is a test',
      completed: false,
    };

    const expectedTodo = {
      id: 1,
      ...todoData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockTodoRepository.create.mockResolvedValue(expectedTodo);

    const result = await useCase.execute(todoData);

    expect(mockTodoRepository.create).toHaveBeenCalledWith(todoData);
    expect(result).toEqual(expectedTodo);
  });

  it('should throw an error if repository creation fails', async () => {
    const todoData = {
      title: 'Test Todo',
      description: 'This is a test',
      completed: false,
    };

    mockTodoRepository.create.mockRejectedValue(new Error('Database error'));

    await expect(useCase.execute(todoData)).rejects.toThrow('Database error');
  });
});
